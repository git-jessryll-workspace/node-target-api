import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const groupSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name of the team"],
    },
    creator: {
      type: ObjectId,
      ref: "UserModel",
    },
    description: {
      type: String,
      default: ""
    },
    active: {
      type: Boolean,
      default: true,
    },
    members: [
      {
        type: ObjectId,
        ref: "UserModel",
      },
    ],
  },
  {
    collection: "groups",
    timestamps: true,
  }
);

const GroupModel =
  mongoose.models.GroupModel || mongoose.model("GroupModel", groupSchema);

export default GroupModel;
