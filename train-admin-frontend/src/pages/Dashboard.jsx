import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import Singlecard from "../components/reuseable/SingleCard";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import RevenueChart from "../charts/RevenueChart";
// import RevenueStatsChart from "../charts/TrainStatsChart";
import TrainStatsChart from "../charts/TrainStatsChart";

var stompClient = null;
const Dashboard = () => {
  const [trainObj, setTrainObj] = useState({
    title: "Total Trains",
    totalNumber: 0,
  });

  const [revenueObj, setRevenueObj] = useState({
    title: "All Revenue",
    totalNumber: 0,
  });

  const [ticketObj, setTicketObj] = useState({
    title: "All Ticket Sales",
    totalNumber: 0,
  });

  const [profitObj, setProfitObj] = useState({
    title: "Bookings",
    totalNumber: 0,
  });

  const connect = () => {
    let Sock = new SockJS(`${process.env.REACT_APP_ENDPOINT}socket`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, () => {
      console.error("fail");
    });
  };

  const onConnected = () => {
    stompClient.subscribe("/dashboard/train/count", onTrainCount);
  };

  const onTrainCount = (payload) => {
    console.log(payload);
  };

  useEffect(() => {
    // connect();
  }, []);

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
