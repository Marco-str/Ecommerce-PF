const { User } = require("../db");
// const bcrypt = require("bcryptjs");




const signUp = async (req, res) => {
try{
    const {name, email, password} = req.body;

    const emailExist = await User.findOne({where: {email: email}});
    
    if(emailExist){
        return res.status(400).json({msg: "Email already exist"});

}
    //Hasheamos password
    const saltRounds = 69
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //Creamos usuario
    const user = await User.create({name, email, password: hashedPassword});

    //Creamos y firmamos token

res.send("User created");


}catch(error){
    console.log(error);
    res.status(500).json({msg: "There was an error"});
}
};




module.exports =  signUp ;