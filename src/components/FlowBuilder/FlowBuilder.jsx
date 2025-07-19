
import '@xyflow/react/dist/style.css';
import { Background, Controls, MiniMap, ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { useCallback, useRef } from 'react';
import { useFlow } from '../../contexts/FlowContext';

import { nodeTypes } from './nodes';

export default function FlowBuilder({ nodes, setNodes, onNodesChange, setSelectedNode }) {


  const initialEdges = [
    {
      id: '1-2',
      source: '1',
      target: '2',
      animated: true
    }
  ]

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const reactFlowWrapper = useRef(null);
  const { onDrop, onDragOver } = useFlow();

  

  const handleDrop = (e) => onDrop(e, reactFlowWrapper);



  // Edge Creation
  const onConnect = useCallback((connection) => {
    const edge = {
      ...connection,
      animated: true,
      id: `${edges.length}+1`
    }
    setEdges(prevEdges => addEdge(edge, prevEdges))
  })


  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node)
  },[])




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