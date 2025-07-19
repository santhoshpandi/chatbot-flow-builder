// FlowContext.jsx
import { createContext, useContext, useCallback, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { enqueueSnackbar } from 'notistack';
import { useEdgesState, useNodesState } from '@xyflow/react'

// Context Creation
const FlowContext = createContext();


// Use Context Creation
export const useFlow = () => useContext(FlowContext);


// Context Provider Creation
export function FlowProvider({ children, nodesSelection }) {

  // ---- Nodes Data ----
  const rawNodeData = localStorage.getItem('nodes')
  const initialNodes = JSON.parse(rawNodeData) || []

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)

  // ---- Edges Data ----
  const rawEdgeData = localStorage.getItem('edges')
  const initialEdges = JSON.parse(rawEdgeData) || []

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const { selectedNode, setSelectedNode } = nodesSelection

  // Settings Panel for MessageNode
  const updateNode = (newMessage, currentNode) => {
    setNodes((nodes) => {
      const updated = nodes.map((node) =>
        node.id === currentNode.id
          ? { ...node, data: { ...node.data, message: newMessage } }
          : node
      );

      // Keep selectedNode in sync
      const updatedNode = updated.find((n) => n.id === currentNode.id);
      setSelectedNode(updatedNode);

      return updated;
    });
  };


  // Occurs in NodePanel.jsx
  const onDragStart = useCallback((event, nodeType) => {
    event.dataTransfer.setData('nodes/reactflow', JSON.stringify(nodeType));
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  // Ocuurs in FlowBuilder.jsx
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  // Occurs in FlowBuilder.jsx
  const onDrop = useCallback(
    (event, reactFlowWrapperRef) => {
      event.preventDefault();
      const data = event.dataTransfer.getData('nodes/reactflow');
      const node = JSON.parse(data)

      if (!node.type) {
        enqueueSnackbar('Problem in onDrop', { variant: 'error' })
        return
      }

      const bounds = reactFlowWrapperRef.current.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      const newNode = {
        id: nanoid(),
        type: node.type,
        position,
        data: {
          label: node.nodeLabel,
          message: 'edit me',
        },
      };

      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [setNodes]
  );


  // ---- Flow Saving Logic ----
  const handleSave = () => {
    if (nodes.length === 0) {
      enqueueSnackbar("Flow is empty", { variant: "error" });
      return;
    }

    const nodesWithNoIncomingEdges = nodes.filter((node) => {
      const hasIncomingEdge = edges.some((edge) => edge.target === node.id);
      return !hasIncomingEdge;
    });

    // ---- In case of More than one Empty Node ----
    if (nodesWithNoIncomingEdges.length > 1) {
      enqueueSnackbar("Cannot Save Flow", {
        variant: "error",
      });
      return;
    }

    enqueueSnackbar("Flow saved successfully", { variant: "success" });

    localStorage.setItem('nodes', JSON.stringify(nodes))
    localStorage.setItem('edges', JSON.stringify(edges))
    setSelectedNode(null)
  };


  return (
    <FlowContext.Provider value={{ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, onDragStart, onDrop, onDragOver, updateNode, handleSave, setSelectedNode }}>
      {children}
    </FlowContext.Provider>
  );
}
