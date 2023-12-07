import {
  clearRefreshToken,
  setRefreshToken,
} from "../services/auth.cookie.service.js";
import { createUser, signUser } from "../services/auth.service.js";
import {
  verifyToken,
  getToken,
  generateToken,
} from "../services/token.service.js";
import { findUser } from "../services/user.service.js";
import { httpUnauthorized } from "../utils/http-error.util.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, picture, status, password } = req.body;

    const newUser = await createUser({
      name,
      email,
      picture,
      status,
      password,
    });

    const { access_token, refresh_token } = await getToken(newUser._id);

    setRefreshToken(res, refresh_token);

    res.json({
      message: "register success",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        status: newUser.status,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await signUser(email, password);

    const { access_token, refresh_token } = await getToken(user._id);

    setRefreshToken(res, refresh_token);

    res.json({
      message: "login success",
      user: userPayload(user, access_token),
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    clearRefreshToken(res);
    res.json({
      message: "logged out!",
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refreshtoken;
    if (!refresh_token) httpUnauthorized("Please login");

    const check = await verifyToken(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await findUser(check.userId);
    const access_token = await generateToken(
      {
        userId: user._id,
      },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      user: userPayload(user, access_token),
    });
  } catch (error) {
    next(error);
  }
};

const userPayload = (user, access_token) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    picture: user.picture,
    status: user.status,
    token: access_token,
  };
};
