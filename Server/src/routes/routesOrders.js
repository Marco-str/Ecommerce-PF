const { Router } = require("express");
const router = Router();


const getAllOrders = require("../controllers/Orders/getAllOrders");
const getOrdersById = require("../controllers/Orders/getOrdersById");

router.get("/", async (req, res) => {
    const { id } = req.body;
   try{
    const orders = await getAllOrders(id);
    res.status(200).json(orders);
    }catch(error){
        res.status(400).json({error: error.message});     
   }
    }
);

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const orders = await getOrdersById(id);
        res.status(200).json(orders);
        }catch (error) {
            res.status(400).json({error: error.message});
    }
    }
);

router.post("/", (req, res) => {
    res.send("Esto Se realiza Solo a través de Mercado Pago");
    }
);

router.put("/:id", (req, res) => {
    res.send("Cuando aparezca migue");
    }
);

router.delete("/", (req, res) => {
    res.send("Welcome to Henry's Store");
    }
);


module.exports = router;