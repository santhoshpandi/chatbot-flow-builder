
import '@xyflow/react/dist/style.css';
import { Background, Controls, MiniMap, ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { useCallback, useRef } from 'react';
import { useFlow } from '../../contexts/FlowContext';

import { nodeTypes } from './nodes';
import { enqueueSnackbar } from 'notistack';
import { nanoid } from 'nanoid';

export default function FlowBuilder({ setSelectedNode }) {


 

  const reactFlowWrapper = useRef(null);
  const { onDrop, onDragOver } = useFlow();
  const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange} = useFlow()



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

        // Reject the Edge Creation
        if (outgoingCount >= MAX_SOURCE_EDGES) {
          enqueueSnackbar('Only one Edge is Allowed for Source',{variant:'warning'})
          return currentEdges;
        }

        // If it has no Edge from its Source, New Edge will be Created
        const edge = {
          ...connection,
          animated: true,
          id: nanoid()
        };
        return addEdge(edge, currentEdges);
      }),
    []
  );


  // ---- Trigger Event to Open Settings Panel ----
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node)
  }, [])




  return (
    <div
      ref={reactFlowWrapper}
      onDrop={handleDrop}
      onDragOver={onDragOver}
      className='w-3/4 h-[93.1vh] border'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
      >

        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}