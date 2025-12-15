import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Profile from "./pages/UserProfile/ProfilePage.tsx";
import NowPlayingMovie from "./pages/Movie/NowPlayingMovie";
import UpcomingMovie from "./pages/Movie/UpcomingMovie";
import MovieDetail from "./pages/Movie/MovieDetail";
import AdminDashboard from "./pages/Report/AdminDashboard.tsx";
import ScrollToTop from "./components/ui/ScrollToTop.tsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* Layout bao quanh toàn bộ ứng dụng */}
      <Layout>
        <Routes>
          {/* Mặc định vào home */}
          <Route path="/" element={<Navigate to="/admin/report" replace />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />

          {/* User pages */}
          <Route path="/profile" element={<Profile />} />

          {/* Home pages */}
          <Route path="/home" element={<Home />} />

          {/* Admin dashboard pages */}
          <Route path="/admin/report" element={<AdminDashboard />} />


          {/* Movie pages */}
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/movies/now-playing" element={<NowPlayingMovie />} />
          <Route path="/movies/upcoming" element={<UpcomingMovie />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
