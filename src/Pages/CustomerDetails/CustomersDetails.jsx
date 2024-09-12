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

const CustomersDetails = () => {
  const [dailyData, setDailyData] = useState({
    labels: [],
    datasets: [],
  });

  const [dailyDubData, setDailyDubData] = useState({
    labels: [],
    datasets: [],
  });

  const [monthlyData, setMonthlyData] = useState({
    labels: [],
    datasets: [],
  });

  const [monthlyDubData, setMonthlyDubData] = useState({
    labels: [],
    datasets: [],
  });

  const [yearlyData, setYearlyData] = useState({
    labels: [],
    datasets: [],
  });

  const [yearlyDubData, setYearlyDubData] = useState({
    labels: [],
    datasets: [],
  });

  const [quaterlyData, setQuaterlyData] = useState({
    labels: [],
    datasets: [],
  });
  const [quaterlyDubData, setQuaterlyDubData] = useState({
    labels: [],
    datasets: [],
  });

  const [dailyyear, setDailyYear] = useState("2020");
  const [monthlyyear, setMonthlyYear] = useState("2020");
  const [quaterlyyear, setQuaterlyYear] = useState("2020");
  const [dailydubyear, setDailyDubYear] = useState("2022");
  const [monthlydubyear, setMonthlyDubYear] = useState("2022");
  const [quaterlydubyear, setQuaterlyDubYear] = useState("2022");

  const handleDailyYearChange = (event) => {
    setDailyYear(event.target.value);
  };

  const handleQuaterlyYearChange = (event) => {
    setQuaterlyYear(event.target.value);
  };

  const handleMonthlyYearChange = (event) => {
    setMonthlyYear(event.target.value);
  };

  const handleDailyDubYearChange = (event) => {
    setDailyDubYear(event.target.value);
  };

  const handleQuaterlyDubYearChange = (event) => {
    setQuaterlyDubYear(event.target.value);
  };

  const handleMonthlyDubYearChange = (event) => {
    setMonthlyDubYear(event.target.value);
  };

  //  Effective Function for both newly added and dublicate customer count DAILY.
  useEffect(() => {
    const fetchDailyData = async () => {
      await axios
        .get("http://localhost:8383/api/customer/newcustomer/daily")
        .then((res) => {
          const datas = res.data.data;

          const filteredData = datas.filter(
            (d) => d._id.year === parseInt(dailyyear)
          );
          const labels = filteredData.map(
            (d) => `${d._id.year}-${d._id.month}-${d._id.day}`
          );

          const count = filteredData.map((d) => d.newCustomers);

          setDailyData({
            labels: labels,
            datasets: [
              {
                label: "Daily Count",
                data: count,
                fill: false, // Don't fill under the line
                backgroundColor: "#E83F6F",
              },
            ],
          });
        })
        .catch((err) => console.error(err));
    };
    fetchDailyData();
  }, [dailyyear]);

  useEffect(() => {
    const fetchDailyDubData = async () => {
      await axios
        .get("http://localhost:8383/api/customer/dublicate/daily")
        .then((res) => {
          const datas = res.data.data;

          const filteredData = datas.filter(
            (d) => d._id.year === parseInt(dailydubyear)
          );
          const labels = filteredData.map(
            (d) => `${d._id.year}-${d._id.month}-${d._id.day}`
          );

          const count = filteredData.map((d) => d.repeatCustomers);

          setDailyDubData({
            labels: labels,
            datasets: [
              {
                label: "Daily Count",
                data: count,
                fill: false, // Don't fill under the line
                backgroundColor: "#E83F6F",
              },
            ],
          });
        })
        .catch((err) => console.error(err));
    };
    fetchDailyDubData();
  }, [dailydubyear]);

  //  Effective Function for both newly added and dublicate customer count MONTHLY.
  useEffect(() => {
    const fetchMonthlyData = async () => {
      await axios
        .get("http://localhost:8383/api/customer/newcustomer/monthly")
        .then((res) => {
          const datas = res.data.data;
          const filteredData = datas.filter(
            (d) => d._id.year === parseInt(monthlyyear)
          );

          const labels = filteredData.map(
            (d) => `${d._id.year}-${d._id.month}`
          );

          const count = filteredData.map((d) => d.newCustomers);

          setMonthlyData({
            labels: labels,

            datasets: [
              {
                label: "Monthly Count",
                data: count,
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
    const fetchMonthlyDubData = async () => {
      await axios
        .get("http://localhost:8383/api/customer/dublicate/monthly")
        .then((res) => {
          const datas = res.data.data;
          const filteredData = datas.filter(
            (d) => d._id.year === parseInt(monthlydubyear)
          );

          const labels = filteredData.map(
            (d) => `${d._id.year}-${d._id.month}`
          );

          const count = filteredData.map((d) => d.repeatCustomers);

          setMonthlyDubData({
            labels: labels,

            datasets: [
              {
                label: "Monthly Count",
                data: count,
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
    fetchMonthlyDubData();
  }, [monthlydubyear]);

  const options = {
    responsive: true, // Ensures the chart is responsive
    maintainAspectRatio: false, // Allows the chart to be non-square
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
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

  //  Effective Function for both newly added and dublicate customer count YEARLY.
  useEffect(() => {
    const fetchYearlyData = async () => {
      await axios
        .get("http://localhost:8383/api/customer/newcustomer/yearly")
        .then((res) => {
          const datas = res.data.data;

          const labels = datas.map((d) => `${d._id.year}`);

          const count = datas.map((d) => d.newCustomers);

          setYearlyData({
            labels: labels,
            datasets: [
              {
                label: "Yearly Count",
                data: count,
                fill: false, // Don't fill under the line
                backgroundColor: ["#90323D", "#D9CAB3"],

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
    const fetchYearlyDubData = async () => {
      await axios
        .get("http://localhost:8383/api/customer/dublicate/yearly")
        .then((res) => {
          const datas = res.data.data;

          const labels = datas.map((d) => `${d._id.year}`);

          const count = datas.map((d) => d.repeatCustomers);

          setYearlyDubData({
            labels: labels,
            datasets: [
              {
                label: "Yearly Count",
                data: count,
                fill: false, // Don't fill under the line
                backgroundColor: ["#90323D", "#D9CAB3"],

                borderWidth: 1, // Makes the line smoother
              },
            ],
          });
        })
        .catch((err) => console.error(err));
    };
    fetchYearlyDubData();
  }, []);

  //  Effective Function for both newly added and dublicate customer count QUARTERLY.
  useEffect(() => {
    const fetchQuaterlyData = async () => {
      await axios
        .get("http://localhost:8383/api/customer/newcustomer/quarterly")
        .then((res) => {
          const datas = res.data.data;
          const filteredData = datas.filter(
            (d) => d._id.year === parseInt(quaterlyyear)
          );

          const labels = filteredData.map((d) => `Q-${d._id.quarter}`);
          //const labels = [Jan - Mar, Apr - Jun, Jul - Sep, Oct - Dec];
          const count = filteredData.map((d) => d.newCustomers);

          setQuaterlyData({
            labels: labels,

            datasets: [
              {
                label: "Quaterly Count",
                data: count,
                fill: false, // Don't fill under the line
                backgroundColor: ["#DD6E42", "#4F6D7A", "#440381", "#EC368D"],

                borderWidth: 1, // Makes the line smoother
              },
            ],
          });
        })
        .catch((err) => console.error(err));
    };
    fetchQuaterlyData();
  }, [quaterlyyear]);

  useEffect(() => {
    const fetchQuaterlyDubData = async () => {
      await axios
        .get("http://localhost:8383/api/customer/dublicate/quarterly")
        .then((res) => {
          const datas = res.data.data;
          const filteredData = datas.filter(
            (d) => d._id.year === parseInt(quaterlydubyear)
          );

          const labels = filteredData.map((d) => `Q-${d._id.quarter}`);
          //const labels = [Jan - Mar, Apr - Jun, Jul - Sep, Oct - Dec];
          const count = filteredData.map((d) => d.repeatCustomers);

          setQuaterlyDubData({
            labels: labels,

            datasets: [
              {
                label: "Quaterly Count",
                data: count,
                fill: false, // Don't fill under the line
                backgroundColor: ["#DD6E42", "#4F6D7A", "#440381", "#EC368D"],

                borderWidth: 1, // Makes the line smoother
              },
            ],
          });
        })
        .catch((err) => console.error(err));
    };
    fetchQuaterlyDubData();
  }, [quaterlydubyear]);

  const dpoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div className="container ">
      <h2 className="d-flex justify-content-center pb-2">Customer Details</h2>
      <div>
        <ul
          className="nav nav-pills mb-3 text-center d-flex justify-content-center"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link customer active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <i
                className="bi bi-person-plus-fill"
                style={{ marginRight: "10px" }}
              ></i>{" "}
              Newly Added Customers
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link customer"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              <i
                className="bi bi-people-fill"
                style={{ marginRight: "10px" }}
              ></i>{" "}
              Dublicate Customers
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabIndex="0"
          >
            {/* Newly Added Customer */}
            <div className="container">
              {/* Daily Customer Count */}
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-8">
                          <h4>New Customer Count</h4>
                        </div>
                        <div className="col-4">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="year"
                            value={dailyyear}
                            onChange={handleDailyYearChange}
                          >
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: "100", height: "300px" }}>
                      <Bar data={dailyData} options={options} />
                    </div>
                    <div className="card-footer">
                      <p>
                        This chart shows the Newly Added Customers for each day
                        of the selected year.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="row">
                {/* Montly Data */}
                <div className="col-sm-12 col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-8">
                          <h4>Monthly Count</h4>
                        </div>
                        <div className="col-4">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="monthyear"
                            value={monthlyyear}
                            onChange={handleMonthlyYearChange}
                          >
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: "100", height: "300px" }}>
                      <Line data={monthlyData} options={options} />
                    </div>
                    <div className="card-footer">
                      <p>This chart shows the count for each month.</p>
                    </div>
                  </div>
                </div>

                {/* Yearly Data */}
                <div className="col-sm-12 col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-8">
                          <h4>Yearly Count Data</h4>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: "100", height: "300px" }}>
                      <Pie data={yearlyData} options={dpoptions} />
                    </div>
                    <div className="card-footer">
                      <p>This chart shows the total count for each year.</p>
                    </div>
                  </div>
                </div>

                {/* Quarterly Sales */}
                <div className="col-sm-12 col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-8">
                          <h4>Quaterly Count</h4>
                        </div>
                        <div className="col-4">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="quateryear"
                            value={quaterlyyear}
                            onChange={handleQuaterlyYearChange}
                          >
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: "100", height: "300px" }}>
                      <Doughnut data={quaterlyData} options={dpoptions} />
                    </div>
                    <div className="card-footer">
                      <p>This chart shows the count for each quater.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------- */}
          {/* Dublicate Customer Count */}

          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabIndex="0"
          >
            <div className="container">
              {/* Daily Customer Count */}
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-8">
                          <h4>Dublicate Customer Count</h4>
                        </div>
                        <div className="col-4">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="year"
                            value={dailydubyear}
                            onChange={handleDailyDubYearChange}
                          >
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: "100", height: "300px" }}>
                      <Bar data={dailyDubData} options={options} />
                    </div>
                    <div className="card-footer">
                      <p>
                        This chart shows the Repeated Customers for each day of
                        the selected year.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="row">
                {/* Montly Data */}
                <div className="col-sm-12 col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-8">
                          <h4>Monthly Count</h4>
                        </div>
                        <div className="col-4">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="monthyear"
                            value={monthlydubyear}
                            onChange={handleMonthlyDubYearChange}
                          >
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: "100", height: "300px" }}>
                      <Line data={monthlyDubData} options={options} />
                    </div>
                    <div className="card-footer">
                      <p>This chart shows the count for each month.</p>
                    </div>
                  </div>
                </div>

                {/* Yearly Data */}
                <div className="col-sm-12 col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-8">
                          <h4>Yearly Count Data</h4>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: "100", height: "300px" }}>
                      <Pie data={yearlyDubData} options={dpoptions} />
                    </div>
                    <div className="card-footer">
                      <p>This chart shows the total count for each year.</p>
                    </div>
                  </div>
                </div>

                {/* Quarterly Data */}
                <div className="col-sm-12 col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-8">
                          <h4>Quaterly Count</h4>
                        </div>
                        <div className="col-4">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="quateryear"
                            value={quaterlydubyear}
                            onChange={handleQuaterlyDubYearChange}
                          >
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: "100", height: "300px" }}>
                      <Doughnut data={quaterlyDubData} options={dpoptions} />
                    </div>
                    <div className="card-footer">
                      <p>This chart shows the count for each quater.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersDetails;
