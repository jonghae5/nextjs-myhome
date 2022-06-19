import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '거래 현황 Line Chart',
    },
  },
};

const KakaoMapChart = () => {
  const { clickedMarker } = useSelector(state => state.map);

  const result = clickedMarker
    .slice(0)
    .reverse()
    .map(function (data) {
      return {
        날짜: new Date(data.년 + '-' + data.월 + '-' + data.일),
        년: data.년,
        월: data.월,
        일: data.일,
        거래금액: data.거래금액,
      };
    });
  const data = {
    labels: result.map(v => v.날짜.toLocaleDateString()),
    datasets: [
      {
        label: clickedMarker[0].아파트,
        data: result.map(v => v.거래금액),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default KakaoMapChart;
