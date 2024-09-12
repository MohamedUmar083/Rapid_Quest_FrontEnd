import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
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

const SalesGrowth = () => {
  const [monthlygrowth, setMonthlyGrowth] = useState({
    labels: [],
    datasets: [],
  });

  const [dailygrowth, setDailyGrowth] = useState({
    labels: [],
    datasets: [],
  });

  const [yearlygrowth, setYearlyGrowth] = useState({
    labels: [],
    datasets: [],
  });

  const [quaterlygrowth, setQuaterlyGrowth] = useState({
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
    const fetchSalesGrowthDaily = async () => {
      await axios
        .get("http://localhost:8383/api/order/growthrate/daily")
        .then((res) => {
          const data = res.data.data;
          const filteredData = data.filter(
            (d) => d.period.year === parseInt(dailyyear)
          );
          const labels = filteredData.map(
            (d) => `${d.period.year}-${d.period.month}-${d.period.day}`
          );
          const growthRates = filteredData.map((item) =>
            parseFloat(item.growthRate)
          );
          const totalSales = filteredData.map((item) => item.totalSales);

          setDailyGrowth({
            labels: labels,
            datasets: [
              {
                label: "Sales Growth Rate (%)",
                data: growthRates,
                fill: false, // Don't fill under the line
                backgroundColor: "#E3170A",
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchSalesGrowthDaily();
  }, [dailyyear]);

  useEffect(() => {
    const fetchSalesGrowthMonthly = async () => {
      await axios
        .get("http://localhost:8383/api/order/growthrate/monthly")
        .then((res) => {
          const data = res.data.data;
          const filteredData = data.filter(
            (d) => d.period.year === parseInt(monthlyyear)
          );
          const labels = filteredData.map(
            (d) => `${d.period.year}-${d.period.month}`
          );
          const growthRates = filteredData.map((item) =>
            parseFloat(item.growthRate)
          );
          const totalSales = filteredData.map((item) => item.totalSales);

          setMonthlyGrowth({
            labels: labels,
            datasets: [
              {
                label: "Monthly Sales Growth Rate (%)",
                data: growthRates,
                fill: false, // Don't fill under the line
                backgroundColor: "#FF8552",
                borderColor: "#39393A",
                tension: 0.5,
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchSalesGrowthMonthly();
  }, [monthlyyear]);

  useEffect(() => {
    const fetchYearlyData = async () => {
      await axios
        .get("http://localhost:8383/api/order/growthrate/yearly")
        .then((res) => {
          const data = res.data.data;
          const fyear = data.filter((d) => d.period.year === parseInt("2023"));
          const labels = fyear.map((d) => `${d.period.year}`);

          const growthRates = fyear.map((item) => parseFloat(item.growthRate));

          setYearlyGrowth({
            labels: labels,
            datasets: [
              {
                label: "Yearly Sales Growth Rate (%)",
                data: growthRates,
                fill: true, // Don't fill under the line
                backgroundColor: "#023E8A",

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
        .get("http://localhost:8383/api/order/growthrate/quarterly")
        .then((res) => {
          const data = res.data.data;
          const filteredData = data.filter(
            (d) => d.period.year === parseInt(quaterlyyear)
          );
          const labels = filteredData.map((d) => `Q-${d.period.quarter}`);
          const growthRates = filteredData.map((item) =>
            parseFloat(item.growthRate)
          );

          setQuaterlyGrowth({
            labels: labels,

            datasets: [
              {
                label: "Quaterly Sales Growth Rate (%)",
                data: growthRates,
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

  const baroptions = {
    responsive: true, // Ensures the chart is responsive
    maintainAspectRatio: false, // Allows the chart to be non-square
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Growth Data (Daily)",
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

  const lineoptions = {
    responsive: true, // Ensures the chart is responsive
    maintainAspectRatio: false, // Allows the chart to be non-square
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Growth Data (Monthly)",
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

  const yoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Yearly Progress Data",
      },
    },
  };

  const qoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Quarterly Progress Data",
      },
    },
  };

  return (
    <div className="container">
      <h2 className="d-flex justify-content-center pb-2">
        Sales Growth in Over the Time Period
      </h2>
      {/* Daily Sales Growth Rate */}
      <div className="row">
        <div className="col-12">
          <div className="card h-100">
            <div className="card-header">
              <div className="row">
                <div className="col-8">
                  <h4>Daily Sales Growth Rate</h4>
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
            <div
              className="card-body"
              style={{ height: "300px", width: "100" }}
            >
              <Bar data={dailygrowth} options={baroptions} />
            </div>
            <div className="card-footer">
              <p>
                This chart shows the sales growth for each day of the selected
                year.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        {/* Monthly Sales */}
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-8">
                  <h4>Monthly Growth Rate</h4>
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
              <Line data={monthlygrowth} options={lineoptions} />
            </div>
            <div className="card-footer">
              <p>This chart shows the total sales growth for each month.</p>
            </div>
          </div>
        </div>

        {/* Yearly Sales */}
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-8">
                  <h4>Yearly Growth Rate</h4>
                </div>
              </div>
            </div>
            <div style={{ width: "100", height: "300px" }}>
              <Line data={yearlygrowth} options={yoptions} />
            </div>
            <div className="card-footer">
              <p>This chart shows the total sales growth for each year.</p>
            </div>
          </div>
        </div>

        {/* Quarterly Sales */}
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-8">
                  <h4>Quaterly Growth Rate</h4>
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
              <Doughnut data={quaterlygrowth} options={qoptions} />
            </div>
            <div className="card-footer">
              <p>This chart shows the total sales growth for each quater.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesGrowth;
