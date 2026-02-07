import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Index.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Notes from './pages/Notes.jsx'
import Bookmarks from './pages/Bookmarks.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}> 
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="notes" element={<Notes />} />
          <Route path="bookmarks" element={<Bookmarks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
