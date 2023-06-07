const jwt = require("jsonwebtoken");
const JWT_SIGN = process.env.JWT_SIGN;




async function verifyToken(req, res, next)  {

    const token = req.headers.authorization?.split(" ")[1];
  
    if(!token) return res.status(401).json("You are not authorized to access this route ");

    try{
        const decodeToken = await jwt.verify (token, JWT_SIGN)
      
        req.userName = decodeToken.userName;
        next();

    }catch(error){
        res.status(500).json(error.message);
    }

}

module.exports = verifyToken;