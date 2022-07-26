import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  //console.log(coinHistory);
  //console.log(currentPrice);

  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.history?.length; i++) {
    coinPrice.unshift(coinHistory?.history[i].price);
    coinTimestamp.unshift(
      new Date(coinHistory?.history[i].timestamp * 1000).toLocaleDateString()
    );
  }

  //console.log("coinPrice", coinPrice);
  //console.log("coinTimestamp", coinTimestamp);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        backgroundColor: "0071bd",
        borderColor: "0071bd",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.change} %
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
