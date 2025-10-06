import { useState } from 'react'
import './App.css'
import Login from './Page/Login'
import Register from './Page/Register'
import Dashboard from "./Page/Dashboard";
import { Router, Route, Routes } from 'react-router-dom'
import Sender from './Page/Sender';
import History from './Page/History';

function App() {

  return (
    <>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/send" element={<Sender/>}/>
          <Route path="/history" element={<History/>}/>
        </Routes>
    </>
  )
}

export default App
