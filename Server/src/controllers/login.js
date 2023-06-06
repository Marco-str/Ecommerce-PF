const { User } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;


const login = async (req, res) => {
    try{
        const {userName, password} = req.body;

        const user = await User.findOne({ where: {   userName: userName}});

        if (!user){
            return res.status(400).json({msg: "User name is incorrect"});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).json({msg: "EL nombre de usuario o la contraseña are incorrect"});
        }

        const token = jwt.sign({id: user.id, userName: user.userName}, `${JWT_SECRET}`);
    
        res.json({token, user});
    
    }catch(error){
        res.status(500).json(error.message);
    }
}


module.exports = login;