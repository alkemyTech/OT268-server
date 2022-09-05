const bcrypt = require("bcrypt");
const db = require('../models')
const {User} = db
const sendEmail = require('../services/emailSender')

const register = async (req, res) => {
    try {
      const { firstName, lastName, password, image, email, roleId } = req.body;
      console.log(firstName, lastName, password, image, email)
  
      if (!firstName &&!lastName && !email && !password && !image) {
        res.status(400).send("all input are require");
      }
  
      let encrypetedPassword = await bcrypt.hash(password, 10);
      let firstNameUpperCase =  firstName.charAt(0).toUpperCase() + firstName.slice(1)
      let lastNameUpperCase =  lastName.charAt(0).toUpperCase() + lastName.slice(1)
  
      const oldUser = await User.findOne({ where: { email: email } });
  
      if (oldUser) {
        return res.status(409).json({ msg: "already exist a user with this email, try to sing up" });
      }
  
      const user = await User.create({
        firstName: firstNameUpperCase,
        lastName: lastNameUpperCase,
        email: email.toLowerCase(),
        password: encrypetedPassword,
        image,
        roleId
      });
      
      const message = `Bienvenido ${firstNameUpperCase} ${lastNameUpperCase} a la ONG Somos Mas!!`
      sendEmail(email, message, message);
      return res.status(200).json({ msg: "User created sucefully", data: user });
    } catch (error) {
      res.status(404).send("Ups something went wrong, try again");
    }
  }

module.exports = {register}
  