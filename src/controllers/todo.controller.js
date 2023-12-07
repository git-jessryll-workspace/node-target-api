import {
  createTodo,
  deleteTodo,
  getOwnTodos,
  getTodo,
  updateTodo,
} from "../services/todo.service.js";

export const createTodoHandler = async (req, res) => {
  const { label, description, status } = req.body;
  const todo = await createTodo({
    label,
    description,
    status,
    user_id: req.user.userId,
  });
  res.json({
    message: "Successfully created",
    todo,
  });
};

export const getTodosHandler = async (req, res) => {
  const user_id = req.user.userId;
  const todos = await getOwnTodos(user_id);
  res.status(200).json(todos);
};

export const updateTodoHandler = async (req, res) => {
  const { label, description, status } = req.body;
  const todo = await updateTodo(req.params.id, {
    label,
    description,
    status,
  });
  res.status(201).json(todo);
};

export const deleteTodoHandler = async (req, res) => {
  const id = req.params.id;
  const todo = await deleteTodo(id);
  res.status(204).json(todo);
};

export const getTodoHandler = async (req, res) => {
  const todo = await getTodo(req.params.id);
  res.status(200).json(todo);
};
