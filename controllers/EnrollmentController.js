const User = require("../model/user")

const loginUser = async (req, res) => {
  try {
    let findResponse = await User.findOne({ email: req.body.email }).exec();
    if(!findResponse){
      return res.send("Not Found Any!")
    }
    if(findResponse.password != req.body.password){
      return res.send("Wrong Credentials!")
    }
    res.send("LoginUser");
  } catch (error) {
    res.send(`Failed to enroll admin user "admin": ${error}`)
  }
}

const registerUser = async (req, res) => {
  try {
    let findResponse = await User.findOne({ email: req.body.email }).exec();
    if(findResponse){
      return res.send("Already existing email")
    }

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    const userInstance = await User.create(userData);
    await userInstance.save();
    res.send("registerUser");
  } catch (error) {
    return res.send(`Failed to register user: ${error}`)
  }
}

module.exports = {
  loginUser,
  registerUser
}
