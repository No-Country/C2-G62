const { Router } = require("express");
const { totalClients, customersInfo } = require("../controllers/customers");
//const { validateJWT } = require("../middlewares/validate_jwt");

const router = Router();
//router.use(validateJWT);

router.get("/", customersInfo);
router.get("/total_clients", totalClients);

module.exports = router;
