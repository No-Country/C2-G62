const { Router } = require("express");
const {
  dashboard,
  totalSales,
  lastweekSales,
  lastmonthSales,
  stateSales,
  regionSales,
  segmentSales,
} = require("../controllers/sales");
const { validateJWT } = require("../middlewares/validate_jwt");

const router = Router();

router.use(validateJWT);

router.get("/", dashboard);
router.get("/total", totalSales);
router.get("/lastweek", lastweekSales);
router.get("/lastmonth", lastmonthSales);
router.get("/states", stateSales);
router.get("/regions", regionSales);
router.get("/segment", segmentSales);

module.exports = router;
