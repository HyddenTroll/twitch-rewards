// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StreamerLogin from './pages/StreamerLogin';
import StreamerRegister from './pages/StreamerRegister';
import AdminDashboard from './pages/AdminDashboard';
import ViewerLogin from './pages/ViewerLogin';
import ViewerCallback from './pages/ViewerCallback';
import ViewerDashboard from './pages/ViewerDashboard'; // ✅ Si utilisé
import ViewerWatch from './pages/ViewerWatch'; // ✅ IMPORTANT !
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/streamer" element={<StreamerLogin />} />
        <Route path="/register/streamer" element={<StreamerRegister />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login/viewer" element={<ViewerLogin />} />
        <Route path="/viewer/callback" element={<ViewerCallback />} />
        <Route path="/viewer/dashboard" element={<ViewerDashboard />} />
        <Route path="/viewer/watch/:streamer" element={<ViewerWatch />} /> {/* ✅ C'était ça qui manquait ! */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
