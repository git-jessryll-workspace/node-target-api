import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const todoSchema = mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
      required: [true, "Please provide todo name"],
    },
    status: {
      type: String,
      default: "NEW",
    },
    description: {
      type: String,
    },
    author: {
      type: ObjectId,
      ref: "UserModel",
    },
  },
  { collection: "todos", timestamps: true }
);
const TodoModel =
  mongoose.models.TodoModel || mongoose.model("TodoModel", todoSchema);
export default TodoModel;
