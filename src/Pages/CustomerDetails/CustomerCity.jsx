import axios from "axios";
import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";

const CustomerCity = () => {
  const [cityData, setCityData] = useState({ label: [], datasets: [] });
  useEffect(() => {
    const fetchCityData = async () => {
      await axios
        .get("http://localhost:8383/api/customer/getCity")
        .then((response) => {
          const data = response.data.data;
          const labels = data.map((element) => element._id);
          const value = data.map((element) => element.totalCustomers);

          setCityData({
            labels: labels,
            datasets: [
              {
                label: "Total Number of the Customers",
                data: value,
                backgroundColor: "#90323D",

                borderWidth: 1,
              },
            ],
          });
        })
        .catch((err) => console.log(err));
    };
    fetchCityData();
  }, []);

  const Options = {
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
        Geographical Distribution of Customers
      </h2>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h4>Geographical Data</h4>
            </div>
            <div className="card-body">
              <div style={{ width: "100", height: "300px" }}>
                <Bar data={cityData} options={Options} />
              </div>
            </div>
            <div className="card-footer">
              <p>This chart shows the Geographical Distribution of Customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCity;
