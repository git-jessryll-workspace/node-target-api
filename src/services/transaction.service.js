import TransactionModel from "../models/transaction.model.js";
import { filterBy } from "../utils/filter-dates.util.js";
import { httpBadRequest } from "../utils/http-error.util.js";
import mongoose from "mongoose";

const formatDateToUTC = (date) => new Date(date);

const createTransaction = async (payload) => {
  const { name, type, note, amount, transaction_date, user_id, group_id } =
    payload;

  const transaction = await TransactionModel.create({
    name,
    type,
    note,
    amount,
    transaction_date: formatDateToUTC(transaction_date),
    user: user_id,
    group: group_id,
  });
  return getTransaction(transaction._id);
};

const updateTransaction = async (id, payload) => {
  const { name, type, note, amount, transaction_date } = payload;
  const transaction = await TransactionModel.findByIdAndUpdate(
    id,
    {
      name,
      type,
      note,
      amount,
      transaction_date: formatDateToUTC(transaction_date),
    },
    { new: true }
  ).populate("user", "name email status");

  return getTransaction(transaction._id);
};

const deleteTransaction = async (id) => {
  return TransactionModel.findByIdAndDelete(id);
};

const getTransactions = async (user_id, filterby = "MONTH") => {
  const filter = filterBy;
  let _gte = filter.startOfMonth;
  let _lte = filter.endOfMonth;

  if (filterby === "TODAY") {
    _gte = filter.today;
    _lte = filter.endOfDay;
  }

  if (filterby === "WEEK") {
    _gte = filter.startOfWeek;
    _lte = filter.endOfWeek;
  }

  if (filterby === "YEAR") {
    _gte = filter.startOfYear;
    _lte = filter.endOfYear;
  }

  const transactions = await TransactionModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user_info",
      },
    },

    {
      $unwind: "$user_info",
    },
    {
      $lookup: {
        from: "groups",
        localField: "group",
        foreignField: "_id",
        as: "group_info",
      },
    },
    {
      $unwind: { path: "$group_info", preserveNullAndEmptyArrays: true },
    },
    {
      $match: {
        "user_info._id": new mongoose.Types.ObjectId(user_id),
        transaction_date: { $gte: _gte, $lte: _lte },
      },
    },
    {
      $project: {
        _id: 1,
        amount: { $toDouble: "$amount" },
        type: 1,
        transaction_date: 1,
        createdAt: 1,
        name: 1,
        user: {
          _id: "$user_info._id",
          name: "$user_info.name",
          email: "$user_info.email",
          picture: "$user_info.picture",
        },
        group: {
          _id: "$group_info._id",
          name: "$group_info.name",
        },
      },
    },
  ]).exec();

  const transactionAggregate = await TransactionModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user_info",
      },
    },
    {
      $match: {
        "user_info._id": new mongoose.Types.ObjectId(user_id),
        transaction_date: { $gte: _gte, $lte: _lte },
      },
    },
    {
      $group: {
        _id: "$type",
        amount: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 1,
        amount: { $toDouble: "$amount" },
      },
    },
  ]).exec();

  if (!transactions) {
    httpBadRequest("Oops! Something went wrong!");
  }

  let transactionOverview = transactionAggregate.map((item) => {
    item.name = item._id === "EXPENSE" ? "Total Expenses" : "Total Income";
    return item;
  });

  const totalExpense = transactionOverview.find(
    (item) => item._id === "EXPENSE"
  );
  const totalIncome = transactionOverview.find((item) => item._id === "INCOME");
  transactionOverview = [
    ...transactionOverview,
    {
      _id: "TOTAL_COUNT",
      name: "No. of Transaction",
      amount: transactions.length,
    },
    {
      _id: "TOTAL_EXPENSE_COUNT",
      name: "No. of Expense Transaction",
      amount: transactions.filter((item) => item.type === "EXPENSE").length,
    },
    {
      _id: "TOTAL_INCOME_COUNT",
      name: "No. of Income Transaction",
      amount: transactions.filter((item) => item.type === "INCOME").length,
    },
  ];

  if (totalExpense && totalIncome) {
    transactionOverview = [
      ...transactionOverview,
      {
        _id: "REVENUE",
        name: "Total Revenue",
        amount: (totalIncome?.amount || 0) - (totalExpense?.amount || 0),
      },
    ];
  } else {
    transactionOverview = [
      ...transactionOverview,
      {
        _id: "REVENUE",
        name: "Total Revenue",
        amount: 0,
      },
    ];
  }

  return {
    transactions,
    total: transactionOverview,
  };
};

const getTransaction = async (id) => {
  const transaction = await TransactionModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user_info",
      },
    },

    {
      $unwind: "$user_info",
    },
    {
      $lookup: {
        from: "groups",
        localField: "group",
        foreignField: "_id",
        as: "group_info",
      },
    },
    {
      $unwind: { path: "$group_info", preserveNullAndEmptyArrays: true },
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $project: {
        _id: 1,
        amount: { $toDouble: "$amount" },
        type: 1,
        transaction_date: 1,
        createdAt: 1,
        name: 1,
        user: {
          _id: "$user_info._id",
          name: "$user_info.name",
          email: "$user_info.email",
          picture: "$user_info.picture",
        },
        group: {
          _id: "$group_info._id",
          name: "$group_info.name",
        },
      },
    },
  ]).exec();

  if (!transaction) {
    httpBadRequest("Oops! Something went wrong");
  }

  return transaction[0];
};

export {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  getTransaction,
};
