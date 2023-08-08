import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import Singlecard from "../components/reuseable/SingleCard";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import RevenueChart from "../charts/RevenueChart";
// import RevenueStatsChart from "../charts/TrainStatsChart";
import TrainStatsChart from "../charts/TrainStatsChart";
import { GET, request } from "../api/ApiAdapter";

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
    let Sock = new SockJS(`http://localhost:39388/tracker/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, () => {
      console.error("fail");
    });
  };

  const onConnected = () => {
    stompClient.subscribe("/dashboard/booking/change", onBookingChange);
    stompClient.subscribe("/dashboard/payment/change", onPaymentChange);
    stompClient.subscribe("/dashboard/reservation/change", onReservationChange);
    stompClient.subscribe("/dashboard/train/change", onTrainChange);
  };

  const trainCount = async () => {
    const res = await request(`train/count`, GET);
    if (!res.error) {
      console.log(res);
      setTrainObj({ ...trainObj, totalNumber: res });
    }
  };

  const allRevenue = async () => {
    const res = await request(`payment/total`, GET);
    if (!res.error) {
      console.log("revenue", res >= 0);
      setRevenueObj({ ...revenueObj, totalNumber: res });
    }
  };

  const allTicketSales = async () => {
    const res = await request(`reservation/ticket/sales/count`, GET);
    if (!res.error) {
      setTicketObj({ ...ticketObj, totalNumber: res });
    }
  };

  const allBookings = async () => {
    const res = await request(`booking/count`, GET);
    if (!res.error) {
      setProfitObj({ ...profitObj, totalNumber: res });
    }
  };

  const [chart, setChart] = useState([]);

  const revenueData = async () => {
    const res = await request(`payment/chart/revenue/all`, GET);
    if (!res.error) {
      setChart(res);
    }
  };

  const onTrainChange = (payload) => {
    console.log("hit with ws train");
    trainCount();
  };

  const onBookingChange = (payload) => {
    allBookings();
  };

  const onReservationChange = (payload) => {
    allTicketSales();
  };

  const onPaymentChange = (payload) => {
    allRevenue();
    revenueData();
  };

  useEffect(() => {
    connect();
    trainCount();
    allRevenue();
    allTicketSales();
    allBookings();
    revenueData();
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
            <RevenueChart data={chart} />
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
