import { useState } from 'react'
import FlowBuilder from './components/FlowBuilder/FlowBuilder'
import NavBar from './components/Navbar'
import NodePanel from './components/FlowBuilder/NodePanel'
import SettingsPanel from './components/FlowBuilder/SettingsPanel'
import Footer from './components/Footer'

import { FlowProvider } from './contexts/FlowContext'
import { SnackbarProvider } from 'notistack'

function App() {

  // Used For Opening Particular Text NOde in SettingsPanel
  const [selectedNode, setSelectedNode] = useState(null)

  return (
    <>
      {/* -------- NotiStack for Notification Popups -------- */}
      <SnackbarProvider
        // preventDuplicate
        autoHideDuration={700}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />

      {/* Custom Context API */}
      <FlowProvider nodesSelection={{ selectedNode, setSelectedNode }}>

        {/* --- Contains SaveChanges Button --- */}
        <NavBar />

        {/* --- Contains FlowBuilder --- */}
        <div className='flex flex-wrap'>
          <FlowBuilder setSelectedNode={setSelectedNode} />
          {
            !selectedNode ?
              <NodePanel /> :
              <SettingsPanel node={selectedNode} setSelectedNode={setSelectedNode} />
          }
        </div>
        <Footer />
      </FlowProvider>


    </>
  )
}

export default App
