import React from 'react'
import Login from './Component/Login/Login'
import Ragister from './Component/Login/Ragister'
import Page from './Component/Pages/Page'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ToDo from './Component/TodoList/Todo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Page />} />
        <Route
          path='/*' 
          element={
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/ragister' element={<Ragister />} />
              <Route path='/todo' element={<ToDo />} />
            </Routes>
          } 
        />        
      </Routes>
    </BrowserRouter>
  )
}

export default App
