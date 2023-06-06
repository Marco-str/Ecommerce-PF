const { User } = require("../db");
const bcrypt = require("bcryptjs");




const signUp = async (req, res) => {
try{
    const {name, phone, email, password} = req.body;

    const emailExist = await User.findOne({where: {email: email}});
    
    if(emailExist){
        return res.status(400).json({msg: "Email already exist"});

}
    
    const salt = await bcrypt.genSalt(69);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = await User.create({name, phone, email, password: hashedPassword});

    res.status(200).json({msg: newUser});



}catch(error){
    console.log(error);
    res.status(500).json(error.message);
}
};




module.exports =  signUp ;