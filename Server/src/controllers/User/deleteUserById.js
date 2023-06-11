const { User } = require('../../db');

const deleteUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        await user.destroy();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
    }
    module.exports = deleteUserById;