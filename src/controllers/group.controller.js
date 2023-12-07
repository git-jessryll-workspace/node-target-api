import {
  createGroup,
  deleteGroup,
  getGroup,
  getGroups,
  updateGroup,
} from "../services/group.service.js";
export const createGroupHandler = async (req, res) => {
  const { name, active, member_ids } = req.body;
  const user_id = req.user.userId;
  const group = await createGroup({
    name,
    active,
    member_ids,
    user_id,
  });

  res.status(201).json(group);
};

export const updateGroupHandler = async (req, res) => {
  const id = req.params.id;
  const { name, active, member_ids } = req.body;
  const group = await updateGroup(id, {
    name,
    active,
    member_ids,
  });
  res.status(200).json(group);
};

export const deleteGroupHandler = async (req, res) => {
  const id = req.params.id;
  res.status(204).json(new deleteGroup(id));
};

export const getGroupHandler = async (req, res) => {
  const id = req.params.id;
  res.status(200).json(await getGroup(id));
};

export const getGroupsHandler = async (req, res) => {
  const user_id = req.user.userId;
  const groups = await getGroups(user_id)
  res.status(200).json(groups);
};
