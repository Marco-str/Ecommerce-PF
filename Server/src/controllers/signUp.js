const { User } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;




const signUp = async (req, res) => {
try{
    const {name, phone, email, password, admin} = req.body;

    const emailExist = await User.findOne({where: {email: email}});
    if(!email || !password || !name || !phone){
        return res.status(400).json({msg: "PLease, all fill are required"});
    }
    if(emailExist){
        return res.status(400).json({msg: "Email already exist"});

}
;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({name, phone, email, password: hashedPassword});
console.log(newUser);
    const token = jwt.sign({id: newUser.id, name: newUser.name, email: newUser.email}, `${JWT_SECRET}`);

    // res.status(200).json({msg: newUser});
    res.status(200).json({token});



    } catch(error){
    res.status(500).json(error.message);
        }
};




module.exports =  signUp ;