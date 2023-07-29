import React from "react";
import "../styles/dashboard.css";
import Singlecard from "../components/reuseable/SingleCard";

import RevenueChart from "../charts/RevenueChart";
// import RevenueStatsChart from "../charts/TrainStatsChart";
import TrainStatsChart from "../charts/TrainStatsChart";

const trainObj = {
  title: "Total Trains",
  totalNumber: 2,
};

const revenueObj = {
  title: "All Revenue",
  totalNumber: 5920,
};

const ticketObj = {
  title: "All Ticket Sales",
  totalNumber: "15",
};

const profitObj = {
  title: "Bookings",
  totalNumber: 6,
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__trainds">
          <Singlecard item={trainObj} />
          <Singlecard item={revenueObj} />
          <Singlecard item={ticketObj} />
          <Singlecard item={profitObj} />
        </div>

        <div className="statics">
          <div className="stats">
            <h3 className="stats__title">Revenue Statistics</h3>
            <RevenueChart />
          </div>

          <div className="stats">
            <h3 className="stats__title">Train Statistics</h3>
            <TrainStatsChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
