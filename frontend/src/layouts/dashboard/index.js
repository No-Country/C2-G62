
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import React, { useState } from 'react';


function Dashboard() {

  //Total clientes
  const [countClients, setCountClients] = useState(0);
  
  fetch('http://localhost:4000/api/customers/total_clients', {
  headers: {
    'x-token-auth':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI3OTBkMjg5NC03NzE2LTQ4MTgtYWE1MC0wMWZlYmZhZGQzOWUiLCJpYXQiOjE2NDI4NDgyODgsImV4cCI6MTY0Mjg1NTQ4OH0.orgVeVSq6-5424ImzQQ1jDSDRGpWciTOFHIONOnBrfY',
  }
})
   .then(resp => resp.json())
   .then( clients_json => setCountClients(clients_json.total_clients));

  //total sales
  const [totalSales, setTotalSales] = useState(0);
  fetch('http://localhost:4000/api/sales/total', {
  headers: {
    'x-token-auth':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI3OTBkMjg5NC03NzE2LTQ4MTgtYWE1MC0wMWZlYmZhZGQzOWUiLCJpYXQiOjE2NDI4NDg1OTgsImV4cCI6MTY0Mjg1NTc5OH0.mJSfLax4t-UYFeJSJfbE7eFjhjo32OpDjGQmL9BvQik',
    }
  })
   .then(resp => resp.json())
   .then( sales_json => setTotalSales(sales_json.total_sales));

  //total sales last week
  const [salesLastWeek, setSalesLastWeek] = useState('');
  fetch('http://localhost:4000/api/sales/lastweek', {
  headers: {
    'x-token-auth':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI3OTBkMjg5NC03NzE2LTQ4MTgtYWE1MC0wMWZlYmZhZGQzOWUiLCJpYXQiOjE2NDI4NDkxOTksImV4cCI6MTY0Mjg1NjM5OX0.ftp2pZigfjTeiMNCZcGBelCYZKFglnt2BQFrJ7S0WA8',
    }
  })
   .then(resp => resp.json())
   .then( lastWeekSales_json => {
     console.log(lastWeekSales_json.lastweek_sales);
    //  const saleTotal = lastWeekSales_json.lastweek_sales.map(sale => sale.Sales).reduce((acc, sale) => sale + acc);
     setSalesLastWeek(lastWeekSales_json.lastweek_sales.length);
     
   });


  //total Sales last month
  const [salesLastMonth, setSalesLastMonth] = useState('');
  fetch('http://localhost:4000/api/sales/lastmonth', {
  headers: {
    'x-token-auth':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI3OTBkMjg5NC03NzE2LTQ4MTgtYWE1MC0wMWZlYmZhZGQzOWUiLCJpYXQiOjE2NDI4NTMwMzIsImV4cCI6MTY0Mjg2MDIzMn0.Acq-TNeHg4clk1MidtiWLb6IBA2u_IMI_4OxkgPVEe0',
    }
  })
   .then(resp => resp.json())
   .then( lastMonthSales_json => {
     console.log(lastMonthSales_json.lastmonth_sales);
    //  const saleTotal = lastWeekSales_json.lastweek_sales.map(sale => sale.Sales).reduce((acc, sale) => sale + acc);
    setSalesLastMonth(lastMonthSales_json.lastmonth_sales.length);
   });







  const { sales, tasks } = reportsLineChartData;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Sales per year"
                count={totalSales}
                percentage={{
                  color: "success",
                  amount: "100%",
                  label: "update",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Clients"
                count={countClients}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Sales last week"
                count={salesLastWeek}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Sales last month"
                count={salesLastMonth}
                percentage={{
                  color: "success",
                  amount: "100%",
                  label: "update",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Sales by states"
                  description="Latest sales Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="sales by regions"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="sales by segment"
                  description="Latest sales Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
