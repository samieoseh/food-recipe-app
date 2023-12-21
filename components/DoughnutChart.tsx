import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

const DoughnutChart = ({
  value,
  gray,
  unit,
}: {
  value: number;
  gray: number;
  unit: string;
}) => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState<Chart<
    "doughnut",
    number[],
    string
  > | null>(null);

  useEffect(() => {
    console.log("running use effect");
    if (!chartRef) return;
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const data = {
        datasets: [
          {
            label: "My First Dataset",
            data: [value, gray],
            backgroundColor: ["rgba(249,115,22, 0.8)", "rgba(0, 0, 0, 0.2)"],
            borderWidth: 1,
            cutout: "90%",
            circumference: 180,
            rotation: 270,
          },
        ],
      };

      const chart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: {
          aspectRatio: 1.5,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        },
        plugins: [
          {
            id: "guageChartText",
            afterDatasetsDraw(chart) {
              const {
                ctx,
                data,
                chartArea: { top, bottom, left, right, width, height },
                scales: { r },
              } = chart;
              const score = data.datasets[0].data[0];

              ctx.save();
              const xCord = chart.getDatasetMeta(0).data[0].x;
              const yCord = chart.getDatasetMeta(0).data[0].y;
              ctx.font = "15px sans-serif";
              ctx.fillStyle = "#666";
              ctx.textAlign = "left";
              ctx.fillText("0", left, yCord + 20);
              ctx.textAlign = "right";
              ctx.fillText(`${Math.round(value + gray)}`, right, yCord + 20);

              ctx.textAlign = "center";
              ctx.font = "30px sans-serif";
              ctx.fillText(`${value} ${unit}`, xCord, yCord - 50);
            },
          },
        ],
      });
      setChart(chart);
    }
  }, [chartRef]);

  return <canvas ref={chartRef} id="myChart" width="400" height="400" />;
};

export default DoughnutChart;
