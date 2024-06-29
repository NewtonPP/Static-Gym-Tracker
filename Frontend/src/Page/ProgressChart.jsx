import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import Header from '../Components/Header';
import Loading from '../Components/Loading';

// Register components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

const ProgressChart = () => {
  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("Id");
      try {
        const response = await axios.get(`http://localhost:3000/api/progress/getprogress/${userId}`, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        
        const data = response.data;

        // Filter data to include only the last 7 days
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
        
        const filteredData = data.filter(entry => new Date(entry.Date) >= last7Days);

        const dates = filteredData.map(entry => new Date(entry.Date).toLocaleDateString());
        const weights = filteredData.map(entry => entry.Weight);
        const bodyFats = filteredData.map(entry => entry.BodyFat);

        setLineChartData({
          labels: dates,
          datasets: [
            {
              label: 'Weight (kg)',
              data: weights,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
            }
          ],
        });

        setBarChartData({
          labels: dates,
          datasets: [
            {
              label: 'Body Fat (Percent)',
              data: bodyFats,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
            }
          ],
          options: {
            animation: {
              duration: 1000, // animation duration in ms
              easing: 'easeInOutQuad' // animation easing function
            }
          }
        });
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching data");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div>
        <h2 className='text-center my-[20px] text-[20px]'>Progress Tracking Charts</h2>
        {error && <div className="text-red-600 text-center my-2">{error}</div>}
        {lineChartData ? <Line data={lineChartData} options={lineChartData.options}/> : <Loading/>}
        {barChartData ? <Bar data={barChartData} options={barChartData.options} /> : <Loading/>}
      </div>
    </>
  );
};

export default ProgressChart;
