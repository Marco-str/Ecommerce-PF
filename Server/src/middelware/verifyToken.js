const jwt = require("jsonwebtoken");
const {JWT_SIGN} = process.env;




async function verifyToken(req, res, next)  {

    const token = req.headers.authorization?.split(" ")[1];
   console.log(token);
    if(!token) return res.status(401).json("You are not authorized to access this route ");

    try{
        const decodeToken = await jwt.verify (token, `${JWT_SIGN}`)
      

        res.status(200).json(decodeToken);
        next();
    }catch(error){
        res.status(500).json(error.message);
    }

}

module.exports = verifyToken;