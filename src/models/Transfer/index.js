const Payment = require("/src/models/Payment");

const Transfer = Payment.discriminator(
  "Transfer",
  new mongoose.Schema({
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  })
);

module.exports = mongoose.model("Transfer", Transfer);
