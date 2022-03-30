const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHash = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    return User.create({ email, passwordHash });
  }

  static async signIn({ email, password = '' }) {
    try {
      const user = await User.findByEmail(email);
      if (!user) throw new Error('invalid email/password');

      const passwordMatching = bcrypt.compareSync(password, user.passwordHash);
      if (!passwordMatching) throw new Error('invalid email/password');

      return user;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
