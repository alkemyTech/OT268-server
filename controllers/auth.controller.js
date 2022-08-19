const { User } = require('../models');
const bcrypt = require('bcryptjs');

const logIn = async (req, res) => {
  console.log('Post log');
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ ok: false });
    }

    // const isPasswordValid = bcrypt.compareSync(password, user.password);
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({ ok: false });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(404).json({ ok: false });
  }
};

module.exports = {
  logIn,
};
