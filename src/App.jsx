import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import TotalSales from "./Pages/Totalsales/TotalSales";
import SalesGrowth from "./Pages/Totalsales/SalesGrowth";
import Cohorts from "./Pages/Totalsales/Cohorts";
import Footer from "./Components/Footer";
import CustomersDetails from "./Pages/CustomerDetails/CustomersDetails";
import CustomerCity from "./Pages/CustomerDetails/CustomerCity";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <>
          <Navbar />
        </>
        <div className="row h-100">
          <Sidebar />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/totalsales" element={<TotalSales />} />
              <Route path="/salesgrowth" element={<SalesGrowth />} />
              <Route path="/cohort" element={<Cohorts />} />
              <Route path="/customerdetails" element={<CustomersDetails />} />
              <Route path="/customercity" element={<CustomerCity />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
