import React from "react";

import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

import RevenueStatics from "../assets/dummy-data/RevenueStatics";

const revenueChart = () => {
  return (
    <ResponsiveContainer width="100%">
      <BarChart data={RevenueStatics}>
        <XAxis dataKey="name" stroke="#2884ff" />
        <Bar dataKey="revenueStats" stroke="#2884ff" fill="#2884ff" barSize={30} />

        <Tooltip wrapperClassName="tooltip__style" cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default revenueChart;
