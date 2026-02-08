import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Sender from "./pages/Sender";
import History from "./pages/History";
import "./styles/global.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      
      <Route 
        path="/login" 
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        } 
      />
      
      <Route 
        path="/register" 
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        } 
      />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/send" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <Sender />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/history" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <History />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;
