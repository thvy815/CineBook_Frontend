import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import BackgroundLayout from "./components/layout/BackgroundLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Profile from "./pages/User/Profile";
import PromotionSelection from "./pages/Booking/PromotionSelection.tsx";
import BookingPage from "./pages/Booking/BookingPage"; // ✅ Gộp Showtime + F&B
import ShowtimeList from "./pages/Movie/ShowtimeList"; // ✅ nếu có
import ShowtimePage from "./pages/Movie/ShowtimePage.tsx";
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

                  {/* Movie pages */}
                  <Route
                    path="/showtimes" element={ <BackgroundLayout> <ShowtimeList /> </BackgroundLayout>}
                  />
                  { /* Booking pages */}
                  <Route path="/promotions" element={<BackgroundLayout> <PromotionSelection /> </BackgroundLayout>} />

                  <Route path="/showtime" element={<BackgroundLayout> <BookingPage/> </BackgroundLayout>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
