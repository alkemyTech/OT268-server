const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const expirationTime = 4000 * 60;

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      res.status(400).send("all input are required");
    }

    const user = await User.findOne({ where: { email: email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      let token = jwt.sign(
        { user_id: user.id, email, user_roleId: user.roleId },
        process.env.JWT_SECRET,
        {
          algorithm: "HS256",
          expiresIn: expirationTime,
        }
      );

      return res.status(200).json({ token });
    }
    //next()
  } catch (error) {
    res.status(404).send("Ups something happens");
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// try {
//   const user = await User.findOne({
//     where: {
//       email,
//     },
//   });

//   if (!user) {
//     return res.status(404).json({ ok: false });
//   }

//   const isPasswordValid = password === user.password;

//   if (!isPasswordValid) {
//     return res.status(401).json({ ok: false });
//   }

//   next()
// } catch (error) {
//   return res.status(404).json({ ok: false });
// }
// };

module.exports = {
  logIn,
};
