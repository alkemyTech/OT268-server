const { User } = require('../models');

const logIn = async (req, res, next) => {
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

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({ ok: false });
     }

    next()
  } catch (error) {
    return res.status(404).json({ ok: false });
  }
};

module.exports = {
  logIn,
};
