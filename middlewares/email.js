const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.USER, 
        pass: process.env.PASSWORD, 
        host: process.env.HOST,
        port: process.env.EMAIL_PORT,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: "Somos Mas ONG",
      to: email,
      subject: "Send from Somos Mas ONG",
      text: `Welcome ${name} to Somos Mas ONG `,
    });

    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;