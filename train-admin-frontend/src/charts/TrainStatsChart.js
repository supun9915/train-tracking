import React from "react";
import { Line } from "react-chartjs-2";
import trainStaticsData from "../assets/dummy-data/trainStatics";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const TrainStatsChart = () => {
  return (
  <div style={{ width: 600, height: 300 }}>
      <Line options={options} data={trainStaticsData} />
    </div>
  );
};

export default TrainStatsChart;
