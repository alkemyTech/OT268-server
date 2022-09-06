const { Contact } = require('../models');

const listContacts = async (req, res) => {
  let contacts = [];

  try {
    contacts = await Contact.findAll({
      attributes: ['name', 'email', 'phone', 'message', 'createdAt'],
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error });
  }

  return res.status(200).json({ contacts });
};

module.exports = {
  listContacts,
};
