const User = require('../models/user.model.js');

const registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hasheando la contraseña
  const user = new User({ username, password: hashedPassword });
  await user.save();
  return user;
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

module.exports = { registerUser, findUserByUsername };
