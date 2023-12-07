import { GroupModel } from "../models/index.js";
import { httpBadRequest } from "../utils/http-error.util.js";

const createGroup = async (payload) => {
  const { name, active, user_id, member_ids } = payload;

  return new GroupModel({
    name,
    creator: user_id,
    members: member_ids,
    active: active || true,
  }).save();
};

const updateGroup = async (id, payload) => {
  const { name, active, member_ids } = payload;
  return GroupModel.findByIdAndUpdate(id, {
    name,
    active,
    members: member_ids,
  });
};

const deleteGroup = async (id) => {
  return GroupModel.findByIdAndDelete(id);
};

const getGroup = async (id) => {
  const group = await GroupModel.findById(id)
    .populate("creator", "-password")
    .populate("members", "-password");

  if (!group) {
    httpBadRequest("Oops, something went wrong!");
  }

  return group;
};

const getGroups = async (user_id) => {
  const groups = await GroupModel.find({
    $or: [{ creator: user_id }, { members: { $elemMatch: { $eq: user_id } } }],
  })
    .populate("creator", "-password")
    .populate("members", "-password");

  if (!groups) {
    httpBadRequest("Oops, something went wrong!");
  }

  return groups;
};

export { createGroup, updateGroup, deleteGroup, getGroup, getGroups };
