import React from "react";
import "../styles/bookings.css";

import trainData from "../assets/dummy-data/booking-train.js";
import TrainItem from "../components/UI/TrainItem";

const Bookings = () => {
  return (
    <div className="bookings">
      <div className="booking__wrapper">
        <h2 className="booking__title">Train Revenue</h2>

        <div className="booking__train-list">
          {trainData?.map((item) => (
            <TrainItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
