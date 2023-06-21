const { Router } = require("express");
const router = Router();

const modifyReview = require("../controllers/Reviews/modifyReview");
const deleteReview = require("../controllers/Reviews/deleteReview");

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try{
      const putReviews = await modifyReview(id, req.body)
      res.status(200).json(putReviews);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try{
      const deleteReviews = await deleteReview(id)
      res.status(200).json(deleteReviews);
    }
    catch (error) {
      res.status(400).send(error.message);
    }
  });
  


module.exports = router;
