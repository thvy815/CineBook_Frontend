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
import CheckoutPage from "./pages/Booking/CheckoutPage.tsx";

const getDefaultRoute = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return "/home"; // không có user → vào home

  try {
    const user = JSON.parse(userStr);
    if (Number(user.role) === 1) return "/admin/report"; // admin → vào dashboard
    return "/home"; // customer → vào home
  } catch {
    return "/home"; // nếu parse lỗi → vào home
  }
};


function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* Layout bao quanh toàn bộ ứng dụng */}
      <Layout>
        <Routes>
          {/* Mặc định vào home */}
          <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

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

          {/* Checkout page */}
          <Route path="/checkout/:bookingId" element={<CheckoutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
