const { Router } = require("express");
const { dashboard } = require("../controllers/dashboard");
const { validateJWT } = require("../middlewares/validate_jwt");

const router = Router();

router.use(validateJWT);

router.get("/", dashboard);

module.exports = router;
