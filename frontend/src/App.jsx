import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Settings from './pages/Settings.jsx';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000';

export default function App(){
  const [user, setUser] = useState(null);

  useEffect(()=>{
    axios.get('/api/auth/me').then(res => setUser(res.data)).catch(()=>{});
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={(u)=>setUser(u)} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} onAuthChange={(u)=>setUser(u)} /> : <Navigate to='/' />} />
        <Route path="/settings" element={user ? <Settings user={user} onAuthChange={(u)=>setUser(u)} /> : <Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}
