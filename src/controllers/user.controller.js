// const userService = require('../services/user.service.js');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const register = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await userService.registerUser(username, password);
//   res.status(201).json({ user });
// };

// const login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await userService.findUserByUsername(username);
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }
//   const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1d' });
//   res.cookie('token', token, { httpOnly: true });
//   res.json({ user });
// };

// module.exports = { register, login };
