//react router dom
import { BrowserRouter, Routes, Route } from "react-router-dom"

//Layouts
import DefaultLayout from "./layouts/DefaultLayout"

//pages
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"

//GlobalContext
import GlobalProvider from "./context/GlobalContext"


function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path="/" Component={TaskList} />
              <Route path="/add-task" Component={AddTask} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider >
    </>

  )
}

export default App
