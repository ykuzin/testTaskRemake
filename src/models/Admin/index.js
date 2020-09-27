const baseUser = require("/src/models/Buser");

const Admin = baseUser.discriminator(
  "admin",
  new mongoose.Schema({ root: mongoose.Boolean })
);
module.exports = mongoose.model("Admin", Admin);
