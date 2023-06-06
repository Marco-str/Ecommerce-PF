const { User } = require("../db");


const getAllUsers = async function () {
    const users = await User.findAll();
    return users;
    }

module.exports = getAllUsers;