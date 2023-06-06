const { Router } = require("express");
const router = Router();
const  getAllUsers  = require("../controllers/getUsers");


const signUp = require("../controllers/signUp");
const login = require("../controllers/login");
const protected = require("../controllers/protected");
const verifyToken = require("../middelware/verifyToken");
const jwt = require("jsonwebtoken");
const {JWT_SIGN} = process.env;



router.get("/", async (req, res) => {

    try{
        const users = await getAllUsers();
        res.status(200).json(users);

    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.post("/signup", signUp);

router.post("/login", login)

router.get("/protected", verifyToken, protected)



    module.exports = router;
