import { TodoModel } from "../models/index.js";
import { httpBadRequest, httpNotFound } from "../utils/http-error.util.js";

const DEFAULT_STATUS = "NEW";

const createTodo = async (todoData) => {
  const { label, description, status = DEFAULT_STATUS, user_id } = todoData;
  const todo = await TodoModel.create({
    label,
    description,
    status,
    author: user_id,
  });

  return todo;
};

const getOwnTodos = async (user_id) => {
  const todos = await TodoModel.find({ author: user_id })
    .populate("author", "name email status")
    .exec();

  if (!todos || todos.length === 0) {
    httpBadRequest("Oops, something went wrong!");
  }

  return todos;
};

const getTodo = async (id) => {
  const todo = await TodoModel.findById(id)
    .populate("author", "name email status")
    .exec();

  if (!todo) {
    httpNotFound("Todo not found");
  }

  return todo;
};

const updateTodo = async (id, todoData) => {
  const { label, description, status } = todoData;
  const updatedTodo = await TodoModel.findByIdAndUpdate(
    id,
    { label, description, status },
    { new: true }
  ).populate("author", "name email status");

  return updatedTodo;
};

const deleteTodo = async (id) => {
  const deletedTodo = await TodoModel.findByIdAndDelete(id);
  return deletedTodo;
};

export { createTodo, getOwnTodos, getTodo, updateTodo, deleteTodo };
