//
import { BrowserRouter, Routes, Route } from "react-router-dom"

//Layouts
import DefaultLayout from "./layouts/DefaultLayout"

//pages
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={TaskList} />
            <Route path="/add-task" Component={AddTask} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
