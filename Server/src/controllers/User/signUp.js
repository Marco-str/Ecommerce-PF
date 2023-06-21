const { User } = require("../../db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SIGN } = process.env;
const { sendRegistrationEmail } = require("../../utils/email");

const signUp = async (req, res) => {
  try {
    const { name, userName, phone, email, password, admin } = req.body;

    const emailExist = await User.findOne({ where: { email: email } });
    if (!email || !password || !name || !phone || !userName) {
      return res.status(400).json({ msg: "Please, all fill are required" });
    }
    if (emailExist) {
      return res.status(400).json({ msg: "Email already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      userName,
      admin,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        userName: newUser.userName,
        email: newUser.email,
      },
      `${JWT_SIGN}`
    );

    sendRegistrationEmail(newUser.id);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = signUp;
