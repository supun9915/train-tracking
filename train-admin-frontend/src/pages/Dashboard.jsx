import React from "react";
import "../styles/dashboard.css";
import Singlecard from "../components/reuseable/SingleCard";

import RevenueChart from "../charts/RevenueChart";
// import RevenueStatsChart from "../charts/TrainStatsChart";
import TrainStatsChart from "../charts/TrainStatsChart";

const trainObj = {
  title: "Total Trains",
  totalNumber: 75,
};

const revenueObj = {
  title: "All Revenue",
  totalNumber: 1697,
};

const ticketObj = {
  title: "All Ticket Sales",
  totalNumber: "85k",
};

const profitObj = {
  title: "Profit",
  totalNumber: 2167,
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
            <h3 className="stats__title">Ticket Statistics</h3>
            <TrainStatsChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
