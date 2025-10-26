import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <Router>
      {/* Layout bao quanh toàn bộ ứng dụng */}
      <Layout>
        <Routes>
          {/* Mặc định vào login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Các trang chính */}
          <Route path="/home" element={<Home />} />
          {/* <Route path="/movies/:id" element={<MovieDetail />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
