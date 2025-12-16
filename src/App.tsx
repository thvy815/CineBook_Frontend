import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/ui/ScrollToTop.tsx";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Profile from "./pages/UserProfile/ProfilePage.tsx";
import NowPlayingMovie from "./pages/Movie/NowPlayingMovie";
import UpcomingMovie from "./pages/Movie/UpcomingMovie";
import MovieDetail from "./pages/Movie/MovieDetail";
import AdminDashboard from "./pages/Report/AdminDashboard.tsx";
import CheckoutPage from "./pages/Booking/CheckoutPage.tsx";
import { RequireRoleRedirect } from "./components/RequireRoleRedirect.tsx";

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* Redirect mặc định */}
        <Route path="/" element={<RequireRoleRedirect />} />

        {/* Layout bao quanh các route */}
        <Route element={<Layout />}>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* User */}
          <Route path="/profile" element={<Profile />} />

          {/* Home */}
          <Route path="/home" element={<Home />} />

          {/* Admin */}
          <Route path="/admin/report" element={<AdminDashboard />} />

          {/* Movie */}
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/movies/now-playing" element={<NowPlayingMovie />} />
          <Route path="/movies/upcoming" element={<UpcomingMovie />} />

          {/* Checkout */}
          <Route path="/checkout/:bookingId" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
