const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  // x-token headers alli esta el token
  const accessToken = req.header("x-token-auth");

  if (!accessToken) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid, name } = jwt.verify(accessToken, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next();
};

const validateRefreshJWT = (req, res = response, next) => {
  const refreshToken = req.header("x-token-refresh");

  if (!refreshToken) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid, name } = jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESHJWT_SEED
    );

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next();
};

module.exports = {
  validateJWT,
  validateRefreshJWT,
};
