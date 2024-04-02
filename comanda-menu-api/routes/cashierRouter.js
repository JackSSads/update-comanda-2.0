const router = require("express").Router();

const CashierController = require("../controllers/cashierController");

const auth = require("../auth");

router.get("/", CashierController.getAll);
router.get("/:id", CashierController.getById);
router.post("/", CashierController.create);
router.put("/:id", CashierController.updateById);
router.delete("/:id", CashierController.deleteById);

module.exports = router;