import Toolbar from "./component/Toolbar"
import Sidebar from "./component/Sidebar"
import FileContent from "./component/FileContent"

function App() {

  return (
    <>
      <div className="h-screen flex flex-col">
        <Toolbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1">
            <FileContent />
          </main>
        </div>
      </div>
    </>
  )
}

export default App
