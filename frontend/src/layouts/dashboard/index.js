
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
import PieChart from "examples/Charts/PieChart";


// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import React, { useState, useEffect, useCallback } from 'react';

import Icon from "@mui/material/Icon";
import MDButton from "../../components/MDButton";

function Dashboard() {  
    //Total clientes
    const [countClients, setCountClients] = useState(0);
    //total sales
    const [totalSales, setTotalSales] = useState(0);
    //total sales last week
    const [salesLastWeek, setSalesLastWeek] = useState(0);
    //total Sales last month
    const [salesLastMonth, setSalesLastMonth] = useState(0);
    //new state excel
    const [dataExcel, setDataExcel] = useState([]);
    //pieDataset
    const [pieDataset, setPieDataset] = useState(
    
      {
        labels: [],
        datasets: {
        label: "",
        backgroundColors: ["warning"],
        data: []}
    }

);

    //token
    const auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI5ZTRkMWQ3Yy0yOTA3LTRmNTgtOWU3OC0zZTFmODIwMDljMWMiLCJuYW1lIjoidGVzdDEyIiwiaWF0IjoxNjQyOTQyMTgzLCJleHAiOjE2NDI5NDkzODN9.Do13gi7Bd0a8yeIT0WUwodjM-Dk51yruB06tDyR0Las';
    

    const getInfoBack = useCallback(async () => {
    await fetch('http://localhost:4000/api/customers/total_clients', {
      headers: {
      'x-token-auth':auth_token,
      }
    })

      .then(resp => resp.json())
      .then( clients_json => setCountClients(clients_json.total_clients));
  
      await fetch('http://localhost:4000/api/sales/total', {
      headers: {
      'x-token-auth': auth_token,

      }

    })
      .then(resp => resp.json())
      .then( sales_json => setTotalSales(sales_json.total_sales));

      await fetch('http://localhost:4000/api/sales/lastweek', {
        headers: {
      'x-token-auth': auth_token,
      }

    })

    .then(resp => resp.json())
    .then(lastWeekSales_json => {
    setSalesLastWeek(lastWeekSales_json.lastweek_sales.length);

    });
  
      await fetch('http://localhost:4000/api/sales/lastmonth', {
      headers: {
      'x-token-auth':auth_token,
      }
      })

    .then(resp => resp.json())
    .then( lastMonthSales_json => {
    setSalesLastMonth(lastMonthSales_json.lastmonth_sales.length);
    });

      await fetch('http://localhost:4000/api/sales/regions', {
      headers: {
      'x-token-auth':auth_token,
        } 
    })

    .then(resp => resp.json())
    .then(regions_json => {

    let regionsNames = [];
    let regionsValues = [];
        regions_json.region_sales.map(region => {
        regionsNames.push(region.Region);
        regionsValues.push(region.total_sales);
        });
      
    setPieDataset({

      labels: regionsNames,
      datasets: {
      label: "",
      backgroundColors: ["info", "warning", "primary", "success"],
      data: regionsValues}});
    
    });
      
    
  },
  []);
  
    useEffect(() => {

    getInfoBack();
    console.log(pieDataset);}
    ,[getInfoBack]);


  const { sales, tasks } = reportsLineChartData;
    return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDButton
        variant="gradient"
        color="warning">
        <Icon sx={{ fontWeight: "bold" }}>
        add
        </Icon>
        &nbsp;Export report excel
    </MDButton>
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="weekend"
              title="Total Sales"
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
                  label: "updated",
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
        <MDBox mb={3}>
        <PieChart
              icon={{ color: "info", component: "leaderboard" }}
              title="Pie Chart"
              description=""
              chart={pieDataset}
          />
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
