const { response } = require("express");
const dbConnection = require("../config/dbConnection");

const dashboard = async (req, res = response) => {
  res.json("Dashboard!");
};

const totalSales = async (req, res = response) => {
  try {
    const db = await dbConnection();
    const sales = await db.query(
      `SELECT COUNT(Row_ID) as total_sales FROM Sales WHERE STR_TO_DATE(Date, '%d/%m/%Y') BETWEEN STR_TO_DATE('01/01/2012', '%d/%m/%Y') AND STR_TO_DATE('31/12/2015', '%d/%m/%Y');`
    );

    res.json({ total_sales: sales[0].total_sales });
  } catch (err) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const lastweekSales = async (req, res = response) => {
  try {
    const db = await dbConnection();
    const sales = await db.query(
      "SELECT * FROM Sales WHERE STR_TO_DATE(Date, '%d/%m/%Y') BETWEEN STR_TO_DATE('21/12/2015', '%d/%m/%Y') AND STR_TO_DATE('31/12/2015', '%d/%m/%Y');"
    );
    res.json({ lastweek_sales: sales });
  } catch (err) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const lastmonthSales = async (req, res = response) => {
  try {
    const db = await dbConnection();
    const sales = await db.query(
      "SELECT * FROM Sales WHERE STR_TO_DATE(Date, '%d/%m/%Y') BETWEEN STR_TO_DATE('01/12/2015', '%d/%m/%Y') AND STR_TO_DATE('31/12/2015', '%d/%m/%Y');"
    );
    res.json({ lastmonth_sales: sales });
  } catch (err) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const stateSales = async (req, res = response) => {
  try {
    const db = await dbConnection();
    const sales = await db.query(
      "SELECT State, COUNT(Row_ID) as quantity FROM Sales WHERE STR_TO_DATE(Date, '%d/%m/%Y') BETWEEN STR_TO_DATE('01/01/2012', '%d/%m/%Y') AND STR_TO_DATE('31/12/2015', '%d/%m/%Y') GROUP BY State;"
    );
    res.json({ states_sales: sales });
  } catch (err) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const regionSales = async (req, res = response) => {
  try {
    const db = await dbConnection();
    const sales = await db.query(
      "SELECT Zip_Code, COUNT(Row_ID) as quantity FROM Sales WHERE STR_TO_DATE(Date, '%d/%m/%Y') BETWEEN STR_TO_DATE('01/01/2012', '%d/%m/%Y') AND STR_TO_DATE('31/12/2015', '%d/%m/%Y') GROUP BY Zip_Code;"
    );

    res.json({ region_sales: sales });
  } catch (err) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = {
  dashboard,
  totalSales,
  lastweekSales,
  lastmonthSales,
  stateSales,
  regionSales,
};
