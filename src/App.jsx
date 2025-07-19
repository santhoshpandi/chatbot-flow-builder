import { useState } from 'react'
import FlowBuilder from './components/FlowBuilder/FlowBuilder'
import NavBar from './components/Navbar'
import NodePanel from './components/FlowBuilder/NodePanel'
import SettingsPanel from './components/FlowBuilder/SettingsPanel'

import { FlowProvider } from './contexts/FlowContext'
import { SnackbarProvider } from 'notistack'

function App() {


  

  const [selectedNode, setSelectedNode] = useState(null)

  return (
    <>
      {/* -------- NotiStack for Notification Popups -------- */}
      <SnackbarProvider
        // preventDuplicate
        autoHideDuration={700}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />

      <FlowProvider nodesSelection={{ selectedNode, setSelectedNode }}>

        <NavBar />

        <div className='flex flex-wrap'>
          <FlowBuilder
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
