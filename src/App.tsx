import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import BackgroundLayout from "./components/layout/BackgroundLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Profile from "./pages/User/ProfilePage";

function App() {
  return (
    <Router>
      {/* Layout bao quanh toàn bộ ứng dụng */}
      <Layout>
        <Routes>
          {/* Mặc định vào home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />

          {/* User pages */}
          <Route path="/profile" element={<BackgroundLayout> <Profile /> </BackgroundLayout>} />

          {/* Home pages */}
          <Route path="/home" element={<BackgroundLayout> <Home /> </BackgroundLayout>} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
