const mongoose = require("mongoose");

const Payment = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Pending", "Passed", "Failed"],
      default: "Pending",
    },
    value: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
    },
  },
  { discriminatorKey: "kind" }
);

module.exports = mongoose.model("Payment", Payment);
