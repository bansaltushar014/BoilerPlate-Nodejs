const enrollAdmin = async (req, res) => {
  try {
    res.send("enrollAdmin");
  } catch (error) {
    res.send(`Failed to enroll admin user "admin": ${error}`)
  }
}

const registerUser = async (req, res) => {
  try {
    res.send("registerUser");
  } catch (error) {
    return res.send(`Failed to register user: ${error}`)
  }
}

module.exports = {
  enrollAdmin,
  registerUser
}
