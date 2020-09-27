const baseUser = require("/src/models/Buser");

const User = baseUser.discriminator("user");
module.exports = mongoose.model("User", User);
