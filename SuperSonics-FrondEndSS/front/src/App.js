import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JoinUs from "./components/JoinUs";
import Home from "./components/Home";
import ViewProfile from "./components/ViewProfile";
import AdminDashboard from "./components/AdminDashboard";
import UpgradePlan from "./components/UpgradePlan";
import PaymentForm from "./components/PaymentForm";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import AudioUpload from "./components/AudioUpload";
import VideoUpload from "./components/VideoUpload";
import AdminArtist from "./components/AdminArtist";

function App() {
  return (
    <Router>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/JoinUs" element={<JoinUs />} />
            <Route path="/profile" element={<ViewProfile />} />
            <Route path="/upload/Audio" element={<AudioUpload />} />
            <Route path="/upload/Video" element={<VideoUpload />} />
            <Route path="/UpgradePlan" element={<UpgradePlan />} />
            <Route path="/UpgradePlan/payment" element={<PaymentForm />} />
            <Route path="/PaymentForm" element={<PaymentForm />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/AdminArtist" element={<AdminArtist />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
