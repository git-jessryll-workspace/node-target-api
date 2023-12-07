import { UserModel } from "../models/index.js";
import { httpBadRequest } from "../utils/http-error.util.js";

export const findUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) httpBadRequest("Please fill all fields.");

  return user;
};

export const searchUsers = async (keyword, userId) => {
  const users = await UserModel.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ],
  }).find({
    _id: { $ne: userId },
  });
  return users;
};

export const getUsersByEmails = async (emails, userId) => {
  const users = await UserModel.find({
    email: {
      $in: emails
    },
  }).find({
    _id: { $ne: userId },
  }).select('-password');
  return users;
};
