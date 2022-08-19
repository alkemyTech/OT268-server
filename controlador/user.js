const User = require('../models/user')

const userDetails = async (req, res) => {
   try {
    await User.create({
        name: req.body.name,
        description: req.body.description
    })

    res.send("dato exitoso")
   } catch (error) {
    console.log(error)
   }
} 

module.exports = userDetails