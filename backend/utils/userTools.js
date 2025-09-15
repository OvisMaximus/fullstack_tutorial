const bcrypt = require("bcrypt");
const User = require("../models/user");

const createUserInDb = async (username, name, password) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash,
  });
  return newUser.save();
};

module.exports = {
  createUserInDb,
};
