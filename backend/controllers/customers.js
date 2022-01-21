const { response } = require("express");
const dbConnection = require("../config/dbConnection");

const customersInfo = async (req, res = response) => {
  res.json("Customers Info");
};

const totalClients = async (req, res = response) => {
  try {
    const db = await dbConnection();
    const customers = await db.query(
      "SELECT COUNT(Fullname) as total_clients FROM Customers;"
    );
    res.json({ total_clients: customers[0].total_clients });
  } catch (err) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = {
  totalClients,
  customersInfo,
};
