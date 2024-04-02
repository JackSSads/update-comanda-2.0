const router = require("express").Router();

const heckController = require("../controllers/checkController");

const auth = require("../auth");

router.get("/", heckController.getAll);
router.get("/:id", heckController.getById);
router.post("/", heckController.create);
router.put("/:id", heckController.updateById);
router.delete("/", heckController.deleteAll);
router.delete("/:id", heckController.deleteById);

module.exports = router;