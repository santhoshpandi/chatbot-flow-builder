// FlowContext.jsx
import { createContext, useContext, useCallback } from 'react';
import { nanoid } from 'nanoid';


// Context Creation
const FlowContext = createContext();


// Use Context Creation
export const useFlow = () => useContext(FlowContext);


// Context Provider Creation
export function FlowProvider({ children, setNodes, nodesSelection }) {

  const { selectedNode, setSelectedNode } = nodesSelection

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

      if (!node.type) return;

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

  return (
    <FlowContext.Provider value={{ onDragStart, onDrop, onDragOver, updateNode }}>
      {children}
    </FlowContext.Provider>
  );
}
