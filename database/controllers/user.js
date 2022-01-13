const { User } = require("../models");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(pattern)) {
      throw new Error("Email not valid");
    }
    if (password.length < 6) {
      throw new Error("Password to short");
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new Error("User already exist");
    }

    const hashPassword = await brcypt.hash(password, 12);

    const newUser = await User.create({
      email,
      password: hashPassword,
      name,
    });

    return res.status(201).json({
      status: "succes",
      code: 201,
      message: "Succes register",
      data: newUser,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const match = await brcypt.compare(password, user.password);

    if (!match) {
      throw new Error("Password not valid");
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      SECRET_TOKEN,
      {
        expiresIn: "24h",
      }
    );

    return res.status(201).send({
      code: 201,
      message: "Success login",
      user: {
        token: token,
        name: user.name,
        id: user.id,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    // const { user } = req;

    const detailUser = await User.findAll();

    return res.status(201).send({
      data: detailUser,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  getUser,
};
