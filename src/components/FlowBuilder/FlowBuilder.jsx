import '@xyflow/react/dist/style.css';
import { Background, Controls, MiniMap, ReactFlow, useNodesState, useEdgesState, addEdge, MarkerType } from '@xyflow/react';
import { useCallback, useRef } from 'react';
import { useFlow } from '../../contexts/FlowContext';

import { nodeTypes } from './nodes';
import { enqueueSnackbar } from 'notistack';
import { nanoid } from 'nanoid';

export default function FlowBuilder({ setSelectedNode }) {

  const reactFlowWrapper = useRef(null);
  const { onDrop, onDragOver } = useFlow();

  // Obtaining Necessary data from Context API
  const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange } = useFlow()

  const handleDrop = (e) => onDrop(e, reactFlowWrapper);


  // ---- Handling only one Edge out from Source Handle ----
  const MAX_SOURCE_EDGES = 1;

  const onConnect = useCallback(
    (connection) =>
      setEdges((currentEdges) => {
        // Counts Edges from Source Handle
        const outgoingCount = currentEdges.filter(
          (e) =>
            e.source === connection.source &&
            e.sourceHandle === connection.sourceHandle
        ).length;

        // Reject the Edge Creation when more than one Target
        if (outgoingCount >= MAX_SOURCE_EDGES) {
          enqueueSnackbar('Only one Edge is Allowed for Source', { variant: 'warning' })
          return currentEdges;
        }

        // If it has no Edge from its Source, New Edge will be Created
        const edge = {
          ...connection,
          animated: false,
          id: nanoid(),
          markerEnd: {
            type: MarkerType.ArrowClosed,
          }
        };

        return addEdge(edge, currentEdges);
      }),
    []
  );


  // ---- Trigger Event to Open Settings Panel ----
  const onNodeClick = useCallback((event, node) => {
    event.stopPropagation();
    setSelectedNode(node)
  }, [])

  // ---- Return to Node Panel when empty space clicked ----
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);


  return (
    <div
      ref={reactFlowWrapper}
      onDrop={handleDrop}
      onDragOver={onDragOver}
      className='w-3/4 h-[93vh]'>
      
      {/* Reactflow Component */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

    </div>
  )
}