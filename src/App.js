import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Game from './pages/Game'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='game' element={<Game />} />
        <Route path='/' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
