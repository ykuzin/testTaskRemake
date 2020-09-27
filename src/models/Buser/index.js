const mongoose = require("mongoose");
const options = { discriminatorKey: "role" };
const Buser = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    balance: {
      type: mongoose.Decimal128,
      default: 0,
    },
  },
  options
);
module.exports = mongoose.model("Buser", Buser);
