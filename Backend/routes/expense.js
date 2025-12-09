const express=require("express")
const router=express.Router()


const authenticateiddleware=require("../middleware/auth")

const Controllers=require("../controllers/expense")

router.post("/expenses", authenticateiddleware.authenticate, Controllers.addExpense);
router.get("/expenses", authenticateiddleware.authenticate, Controllers.getExpenses);
router.delete("/expenses/:id", authenticateiddleware.authenticate, Controllers.deleteExpense);
router.put("/expenses/:id", authenticateiddleware.authenticate, Controllers.updateExpense);



module.exports=router