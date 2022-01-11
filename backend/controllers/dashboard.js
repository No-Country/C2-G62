const { response } = require("express");

const dashboard = async (req, res = response) => {
  res.json("Dashboard!");
};

module.exports = {
  dashboard,
};
