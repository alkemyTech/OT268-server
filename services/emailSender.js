require('dotenv').config();
const sgEmail = require('@sendgrid/mail');

sgEmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, subject, message) => {
  const msg = {
    to,
    from : process.env.EMAIL_ORIGIN,
    subject,
    html: message,
  };
  sgEmail.send(msg);

  try {
    sgEmail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
