"use client";
import { stateSchema } from "@/schemas/pokemon";
import React from "react";
import Chart from "react-apexcharts";

import { z } from "zod";

type State = z.infer<typeof stateSchema>;

type RadarChartProps = {
  data: State[];
};

const RadarChart = ({ data }: RadarChartProps) => {
  const categories: string[] = [];
  const seriesData: number[] = [];

  data.forEach((record) => {
    categories.push(record.stat.name);
    seriesData.push(record.base_stat);
  });

  const chartOptions = {
    chart: {
      id: "radar-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories,
      labels: {
        show: true,
        style: {
          colors: ["#a8a8a8"],
          fontSize: "16px",
        },
      },
    },
  };

  const series = [
    {
      name: "Pokemon",
      data: seriesData,
    },
  ];

  return (
    <Chart options={chartOptions} series={series} type="radar" height="450" data-testid="radar-chart-container"/>
  );
};

export default RadarChart;
