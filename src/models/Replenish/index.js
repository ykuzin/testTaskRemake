const Payment = require("/src/models/Payment");

const Replenish = Payment.discriminator(
  "Replenish",
  new mongoose.Schema({
    To: {
      type: String,
      required: true,
    },
  })
);
module.exports = mongoose.model("Replenish", Replenish);
