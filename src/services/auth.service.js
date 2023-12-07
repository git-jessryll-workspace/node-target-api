import { compare } from "bcrypt";
import { UserModel } from "../models/index.js";
import {
  DEFAULT_PROFILE_IMAGE,
  DEFAULT_STATUS,
} from "../utils/constant.util.js";
import { validateRegisterRequest } from "../validations/auth.request.js";
import { httpBadRequest, httpNotFound } from "../utils/http-error.util.js";

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  validateRegisterRequest({ name, email, password });

  const checkDb = await UserModel.findOne({ email });

  if (checkDb) {
    httpBadRequest(
      "Please try again with different email addresss, this email is already exist"
    );
  }

  const user = await new UserModel({
    name,
    email,
    picture: picture || DEFAULT_PROFILE_IMAGE,
    status: status || DEFAULT_STATUS,
    password,
  }).save();
  return user;
};

export const signUser = async (email, password) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

  // check if user exist
  if (!user) httpNotFound("Invalid credentials");

  // compare passwords
  let passwordMatches = await compare(password, user.password);

  if (!passwordMatches) httpNotFound("Invalid credentials");

  return user;
};
