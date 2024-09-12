import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

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
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const TotalSales = () => {
  const [monthlysales, setMonthlySales] = useState({
    labels: [],
    datasets: [],
  });

  const [dailysales, setDailySales] = useState({
    labels: [],
    datasets: [],
  });

  const [yearlysales, setYearlySales] = useState({
    labels: [],
    datasets: [],
  });

  const [quaterlysales, setQuaterlySales] = useState({
    labels: [],
    datasets: [],
  });

  const [dailyyear, setDailyYear] = useState("2022");
  const [monthlyyear, setMonthlyYear] = useState("2022");
  const [quaterlyyear, setQuaterlyYear] = useState("2022");

  const handleDailyYearChange = (event) => {
    setDailyYear(event.target.value);
  };

  const handleQuaterlyYearChange = (event) => {
    setQuaterlyYear(event.target.value);
  };

  const handleMonthlyYearChange = (event) => {
    setMonthlyYear(event.target.value);
  };

  useEffect(() => {
    const fetchMonthlyData = async () => {
      await axios
        .get(
          "https://rapid-quest-backend.onrender.com/api/order/totalsales/monthlysales"
        )
        .then((res) => {
          const datas = res.data.data;
          const filteredData = datas.filter(
            (d) => d._id.year === parseInt(monthlyyear)
          );

          const labels = filteredData.map(
            (d) => `${d._id.year}-${d._id.month}`
          );

          const sales = filteredData.map((d) => d.totalSales);

          setMonthlySales({
            labels: labels,

            datasets: [
              {
                label: "Monthly Sales",
                data: sales,
                fill: false, // Don't fill under the line
                backgroundColor: "#FF8552",
                borderColor: "#39393A",
                tension: 0.5, // Makes the line smoother
              },
            ],
          });
        })
        .catch((err) => console.error(err));
    };
    fetchMonthlyData();
  }, [monthlyyear]);

  useEffect(() => {
    const fetchDailyData = async () => {
      await axios
        .get(
          "https://rapid-quest-backend.onrender.com/api/order/totalsales/dailysales"
        )
        .then((res) => {
          const datas = res.data.data;
          const filteredData = datas.filter(
            (d) => d._id.year === parseInt(dailyyear)
          );
          const labels = filteredData.map(
            (d) => `${d._id.year}-${d._id.month}-${d._id.day}`
          );

          const sales = filteredData.map((d) => d.totalSales);

          setDailySales({
            labels: labels,
            datasets: [
              {
                label: "Daily Sales",
                data: sales,
                fill: false, // Don't fill under the line
                backgroundColor: "#744FC6",
              },
            ],
          });
        })
        .catch((err) => console.error(err));
    };
    fetchDailyData();
  }, [dailyyear]);

  useEffect(() => {
    const fetchYearlyData = async () => {
      await axios
        .get(
          "https://rapid-quest-backend.onrender.com/api/order/totalsales/yearlysales"
        )
        .then((res) => {
          const datas = res.data.data;

          const labels = datas.map((d) => `${d._id.year}`);

          const sales = datas.map((d) => d.totalSales);

          setYearlySales({
            labels: labels,
            datasets: [
              {
                label: "Yearly Sales",
                data: sales,
                fill: false, // Don't fill under the line
                backgroundColor: ["#C1121F", "#023E8A"],

                borderWidth: 1, // Makes the line smoother
              },
            ],
          });
        })
        .catch((err) => console.error(err));
    };
    fetchYearlyData();
  }, []);

  useEffect(() => {
    const fetchQuaterlyData = async () => {
      await axios
        .get(
          "https://rapid-quest-backend.onrender.com/api/order/totalsales/quarterlysales"
        )
        .then((res) => {
          const datas = res.data.data;
          const filteredData = datas.filter(
            (d) => d._id.year === parseInt(quaterlyyear)
          );

          const labels = filteredData.map((d) => `Q-${d._id.quarter}`);
          //const labels = [Jan - Mar, Apr - Jun, Jul - Sep, Oct - Dec];
          const sales = filteredData.map((d) => d.totalSales);

          setQuaterlySales({
            labels: labels,

            datasets: [
              {
                label: "Quaterly Sales",
                data: sales,
                fill: false, // Don't fill under the line
                backgroundColor: ["#083D77", "#EBEBD3", "#DA4167", "#F78764"],

                borderWidth: 1, // Makes the line smoother
              },
            ],
          });
        })
        .catch((err) => console.error(err));
    };
    fetchQuaterlyData();
  }, [quaterlyyear]);

  const lineoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const baroptions = {
    responsive: true, // Ensures the chart is responsive
    maintainAspectRatio: false, // Allows the chart to be non-square
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Sales Data",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Quarterly Sales Breakdown",
      },
    },
  };

  const pieoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Yearly Sales Breakdown",
      },
    },
  };

  return (
    <div className="container">
      <h2 className="d-flex justify-content-center pb-2">
        Total Sales in Over the Time Period
      </h2>
      {/* Daily Sales Total */}
      <div className="row">
        <div className="col-sm-12 col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-8">
                  <h4>Daily Sales Data</h4>
                </div>
                <div className="col-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="year"
                    value={dailyyear}
                    onChange={handleDailyYearChange}
                  >
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ width: "100", height: "300px" }}>
              <Bar data={dailysales} options={baroptions} />
            </div>
            <div className="card-footer">
              <p>
                This chart shows the total sales for each day of the selected
                year.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <div className="row">
        {/* Montly Sales */}
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-8">
                  <h4>Monthly Sales Data</h4>
                </div>
                <div className="col-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="monthyear"
                    value={monthlyyear}
                    onChange={handleMonthlyYearChange}
                  >
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ width: "100", height: "300px" }}>
              <Line data={monthlysales} options={lineoptions} />
            </div>
            <div className="card-footer">
              <p>This chart shows total sales for each month.</p>
            </div>
          </div>
        </div>

        {/* Yearly Sales */}
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-8">
                  <h4>Yearly Sales Data</h4>
                </div>
              </div>
            </div>
            <div style={{ width: "100", height: "300px" }}>
              <Pie data={yearlysales} options={pieoptions} />
            </div>
            <div className="card-footer">
              <p>This chart shows the total sales for each year.</p>
            </div>
          </div>
        </div>

        {/* Quarterly Sales */}
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-8">
                  <h4>Quaterly Sales Data</h4>
                </div>
                <div className="col-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="quateryear"
                    value={quaterlyyear}
                    onChange={handleQuaterlyYearChange}
                  >
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ width: "100", height: "300px" }}>
              <Doughnut data={quaterlysales} options={doughnutoptions} />
            </div>
            <div className="card-footer">
              <p>This chart shows total sales for each quater.</p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default TotalSales;
