const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate_fields");
const { refreshToken, register, login } = require("../controllers/auth");
const { validateRefreshJWT } = require("../middlewares/validate_jwt");

const router = Router();

router.post(
  "/new",
  [
    // middlewares
    check("username", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  register
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  login
);

router.get("/renew", validateRefreshJWT, refreshToken);

module.exports = router;
