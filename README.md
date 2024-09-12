# Sales Analytics Dashboard - Frontend

## Overview

This is the frontend for the Sales Analytics Dashboard, built using React and Chart.js. It visualizes sales data and customer insights, including total sales, sales growth rate, new and repeat customers, geographical distribution, and customer lifetime value.

## Technologies Used

- **React**: JavaScript library for building user interfaces
- **Chart.js**: JavaScript library for data visualization
- **Axios**: HTTP client for making API requests
- **Bootstrap**: For responsive design and layout

## Components

### 1. Sales Over Time

- **Component**: `TotalSales.jsx`
- **Description**: Visualizes total sales for different intervals (daily, monthly, quarterly, yearly) fetched from the backend.

### 2. Sales Growth Rate

- **Component**: `SalesGrowth.jsx`
- **Description**: Displays the sales growth rate over time by comparing data fetched from the backend.

### 3. New Customers

- **Component**: `CustomerDetails.jsx`
- **Description**: Shows the number of new customers added over time, using data from the `shopifyCustomers` collection.

### 4. Repeat Customers

- **Component**: `CustomerDetails.jsx`
- **Description**: Displays the number of repeat customers for various time intervals.

### 5. Geographical Distribution

- **Component**: `CustomerCity.jsx`
- **Description**: Visualizes the distribution of customers across cities using a map.

### 6. Customer Lifetime Value by Cohorts

- **Component**: `Cohort.jsx`
- **Description**: Displays customer lifetime value grouped by cohort based on their first purchase.

## Project Documentation

- [Backend Repository](https://github.com/MohamedUmar083/Rapid_Quest_Backend) - The Backend repository for the project.
- [Api Documentation](https://documenter.getpostman.com/view/25526528/2sAXqne4hY) - Detailed documentation of the API endpoints.

- [Frontend Deployment](https://rq-ecomm.netlify.app/) - Live version of the frontend application.

- [Backend Deployment](https://rapid-quest-backend.onrender.com/ping) - Live version of the backend application.
