import axios from "axios";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const Cohorts = () => {
  const [cohortData, setCohortData] = useState({ labels: [], datasets: [] });
  const [year, setYear] = useState("2022");

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    // Fetch CLV data from the backend
    const fetchCLVData = async () => {
      await axios
        .get(
          "https://rapid-quest-backend.onrender.com/api/order/totalsales/getclv"
        )
        .then((response) => {
          const data = response.data.data;
          //console.log(response.data.data);
          const filteredData = data.filter(
            (d) => d._id.year === parseInt(year)
          );
          const labels = filteredData.map(
            (d) => `${d._id.year}-${d._id.month}`
          );

          const lifetimeValues = filteredData.map((d) => d.totalLifetimeValue);

          setCohortData({
            labels: labels,
            datasets: [
              {
                label: "Customer Lifetime Value (CLV)",
                data: lifetimeValues,
                backgroundColor: "#003554",

                borderWidth: 1,
              },
            ],
          });
        })
        .catch((err) => console.log(err));
    };
    fetchCLVData();
  }, [year]);

  const chartOptions = {
    responsive: true, // Ensures the chart is responsive
    maintainAspectRatio: false, // Allows the chart to be non-square
    plugins: {
      legend: {
        position: "top",
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

  return (
    <div className="container">
      <h2 className="d-flex justify-content-center pb-2">
        Customer Lifetime Value by Cohort
      </h2>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-8">
                  <h4>CLV by Cohort</h4>
                </div>
                <div className="col-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="year"
                    value={year}
                    onChange={handleYearChange}
                  >
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div style={{ width: "100", height: "300px" }}>
                <Bar data={cohortData} options={chartOptions} />
              </div>
            </div>
            <div className="card-footer">
              <p>
                This chart shows the customer lifetime value (CLV) for each
                cohort.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cohorts;
