const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
  async register(data) {
    const exists = await User.findOne({ email: data.email });
    if (exists) throw new Error('User already exists');

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hashed });
    return this.generateToken(user);
  },
  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');
    return this.generateToken(user);
  },
  generateToken(user) {
    return jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
  }
};