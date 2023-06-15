const User = require('@model/user');

const loginUser = async (req, res) => {
  try {
    // eslint-disable-next-line no-console
    console.log('test');

    const findResponse = await User.findOne({ email: req.body.email }).exec();
    if (!findResponse) {
      return res.status(400).json({ message: 'Not Found Any!' });
    }
    if (findResponse.password !== req.body.password) {
      return res.status(400).json({ message: 'Wrong Credentials!' });
    }
    return res.status(200).json({ message: 'Loggedin!' });
  } catch (error) {
    return res.status(500).json({ message: `Failed to enroll admin user "admin": ${error}` });
  }
};

const registerUser = async (req, res) => {
  try {
    const findResponse = await User.findOne({ email: req.body.email }).exec();
    if (findResponse) {
      return res.status(400).json({ message: 'Already existing email!' });
    }

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const userInstance = await User.create(userData);
    await userInstance.save();
    return res.status(200).json({ message: 'Registered!' });
  } catch (error) {
    return res.status(500).json({ message: `Failed to register user: ${error}` });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
