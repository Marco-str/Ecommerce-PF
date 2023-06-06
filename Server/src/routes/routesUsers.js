const { Router } = require("express");
const router = Router();
const  getAllUsers  = require("../controllers/getUsers");

const jwt = require("jsonwebtoken");
const signUp = require("../controllers/signUp");



router.get("/", async (req, res) => {

    try{
        const users = await getAllUsers();
        res.status(200).json(users);

    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.post("/signup", signUp);

router.post("/login")

router.get("/protected")



    module.exports = router;
