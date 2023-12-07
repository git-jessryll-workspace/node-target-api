import mongoose from "mongoose";

const { ObjectId, Decimal128, Date } = mongoose.Schema.Types;

const transactionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide transaction name"],
    },
    type: {
      type: String,
      default: "UNKNOWN",
    },
    note: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: "UserModel",
    },
    amount: {
      type: Decimal128,
      default: 0.0,
      index: true,
    },
    transaction_date: {
      type: Date,
      index: true,
      required: [true, "Transaction date is required"],
    },
    group: {
      type: ObjectId,
      ref: "GroupModel",
    },
  },
  {
    collection: "transactions",
    timestamps: true,
  }
);

const TransactionModel =
  mongoose.models.TransactionModel ||
  mongoose.model("TransactionModel", transactionSchema);
export default TransactionModel;
