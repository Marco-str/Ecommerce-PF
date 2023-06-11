const { Router } = require("express");
const router = Router();
const getAllUsers = require("../controllers/User/getUsers");
const signUp = require("../controllers/User/signUp");
const login = require("../controllers/User/login");
const protected = require("../controllers/User/protected");
const verifyToken = require("../middleware/verifyToken");
const getUserById = require("../controllers/User/getUserById");
const putUserById = require("../controllers/User/putUserById");
const deleteUserById = require("../controllers/User/deleteUserById");

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/signup", signUp);

router.post("/login", login);

router.get("/protected", verifyToken, protected);


/**Editar Informacion del Usuario **/

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await putUserById(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
}); 

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await deleteUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;
