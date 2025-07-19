import { useState } from 'react'
import FlowBuilder from './components/FlowBuilder/FlowBuilder'
import NavBar from './components/Navbar'
import NodePanel from './components/FlowBuilder/NodePanel'
import SettingsPanel from './components/FlowBuilder/SettingsPanel'
import { useEdgesState, useNodesState } from '@xyflow/react'
import { FlowProvider } from './contexts/FlowContext'

function App() {
  

  const initialNodes = [{
    id: '1',
    data: {
      label: 'Node 1',
      message: 'hello'
    },
    position: { x: 20, y: 10 },
    type: 'MessageNode'
  },
  {
    id: '2',
    data: {
      label: 'Node 2',
      message: 'hello asdf'
    },
    position: { x: 20, y: 100 },
    type: 'MessageNode'
  },
  {
    id: '3',
    data: {
      label: 'Node 3',
      message: 'sdfasdf'
    },
    position: { x: 220, y: 100 },
    type: 'MessageNode'
  }
  ] 

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)

  const [selectedNode, setSelectedNode] = useState(null)

  return (
    <>
      <NavBar />
      <FlowProvider setNodes={setNodes} nodesSelection={{selectedNode, setSelectedNode}}>
        <div className='flex flex-wrap'>
          <FlowBuilder
            nodes={nodes}
            setNodes={setNodes}
            onNodesChange={onNodesChange}
            setSelectedNode={setSelectedNode}
          />

          {
            !selectedNode ?
              <NodePanel /> :
              <SettingsPanel node={selectedNode} setSelectedNode={setSelectedNode} />
          }
        </div>
      </FlowProvider>


    </>
  )
}

export default App
