const Payment = require("/src/models/Payment");

const Withdraw = Payment.discriminator(
  "Withdraw",
  new mongoose.Schema({
    From: {
      type: String,
      required: true,
    },
  })
);
module.exports = mongoose.model("Withdraw", Withdraw);
