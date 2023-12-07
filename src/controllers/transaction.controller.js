import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
} from "../services/transaction.service.js";

export const createTransactionHandler = async (req, res) => {
  const { name, note, amount, type, transaction_date, group_id } = req.body;
  const transaction = await createTransaction({
    name,
    note,
    amount,
    type,
    transaction_date,
    user_id: req.user.userId,
    group_id
  });
  res.status(201).json({
    message: "Successfully created",
    transaction,
  });
};

export const updateTransactionHandler = async (req, res) => {
  const id = req.params.id;
  const { name, note, amount, type, transaction_date } = req.body;
  const transaction = await updateTransaction(id, {
    name,
    note,
    amount,
    type,
    transaction_date,
  });
  res.status(200).json({
    message: "Successfully updated",
    transaction,
  });
};

export const deleteTransactionHandler = async (req, res) => {
  const id = req.params.id;
  const transaction = await deleteTransaction(id);
  res.status(204).json({ message: "Successfully deleted", transaction });
};

export const getTransactionsHandler = async (req, res) => {
  const transactions = await getTransactions(req.user.userId);
  res.status(200).json(transactions);
};

export const getTransactionHandler = async (req, res) => {
  const id = req.params.id;
  const transaction = await getTransaction(id);
  res.status(200).json(transaction);
};
