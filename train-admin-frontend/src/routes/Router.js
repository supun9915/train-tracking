import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
// import Selltrain from "../pages/TrainRevenue";
import PrivateRout from "../routes/PrivateRoute";
import Settings from "../pages/Settings";
import TrainRevenue from "../pages/TrainRevenue";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRout />}>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/sell-train" element={<TrainRevenue />} />
          <Route path="/sell-train/:slug" element={<TrainRevenue />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routers;
