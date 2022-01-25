const { response } = require("express");
const bcrypt = require("bcrypt");
const dbConnection = require("../config/dbConnection");
const { generateJWT, generateRefreshJWT } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res = response) => {
  const { email, password, username } = req.body;

  try {
    const db = await dbConnection();
    const exist = `SELECT ID, username FROM users WHERE email='${email}'`;
    let user = await db.query(exist);
    if (user.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }

    const salt = bcrypt.genSaltSync();
    const passwd = bcrypt.hashSync(password, salt);
    const uid = uuidv4();

    const sqlMakeUser = `INSERT INTO users (ID, username, email, passwd) VALUES ('${uid}', '${username}', '${email}', '${passwd}')`;
    usuario = await db.query(sqlMakeUser);

    // Generar JWT
    const accessToken = await generateJWT(uid, username);
    const refreshToken = await generateRefreshJWT(uid, username);
    //const refreshToken = ji;

    res.status(201).json({
      ok: true,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const db = await dbConnection();
    const exist = `SELECT ID, username, passwd FROM users WHERE email='${email}'`;
    const usuario = await db.query(exist);

    if (usuario?.length === 0) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    const { ID: uid, username, passwd } = usuario[0];
    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, passwd);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El password no es válido",
      });
    }
    // Generar JWT
    const accessToken = await generateJWT(uid, username);
    const refreshToken = await generateRefreshJWT(uid, username);
    res.json({
      ok: true,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const refreshToken = async (req, res = response) => {
  const { uid, username } = req;
  // Generate JWT

  const accesstoken = await generateJWT(uid, username);
  const refreshToken = await generateRefreshJWT(uid, username);
  res.json({
    ok: true,
    accesstoken,
    refreshToken,
  });
};

module.exports = {
  refreshToken,
  register,
  login,
};
