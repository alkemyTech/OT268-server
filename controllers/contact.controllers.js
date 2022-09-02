const db = require("../models");
const { Contacts } = db;
const emailSend = require("../services/emailSender");
const detailMessage = require("../middlewares/mailer/templateMail");

////////////////////////////////////////////////////////////////////////////////////////////

const getContactInformation = async (req, res) => {
  try {
    const contactInformation = await Contacts.findAll();
    res.status(200).send(contactInformation);
  } catch (error) {
    res.status(404).send(error);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////

const postContactInformation = async (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log(name, email);
  try {
    if (name.length && email.length <= 0) {
      return res.status(404).send("complete alguno de los campos faltantes");
    }

    const oldContact = await Contacts.findOne({ where: { email: email } });
    if (oldContact)
      return res
        .status(404)
        .send("Ya existe con contacto vinculado a ese email");

    const contactCreated = await Contacts.create({
      name: name,
      phone: phone,
      email: email.toLowerCase(),
      message: message,
    });

    const welcomeMessage = `Gracias ${name} por contactatarse con nosotros`;
    emailSend(
      email.toLowerCase(),
      welcomeMessage,
      detailMessage(
        "Bienvenido a Ong Somos Mas",
        "Gracias por contactarse con nosotros, vamos a estar respondiendo su consulta pronto",
        email.toLowerCase()
      )
    );

    res.status(200).send(contactCreated);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  postContactInformation,
  getContactInformation,
};
