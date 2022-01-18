const { User } = require("../models/User");
const bcrypt = require("bcrypt");

const newUser = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: username.toLowerCase(),
    displayName: username,
    email: email.toLowerCase(),
    password: hashedPassword,
  });
  user.save();
  return res.redirect("/login");
};

module.exports = { newUser };
