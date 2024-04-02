const router = require("express").Router();

const ProductController = require("../controllers/productController");

const auth = require("../auth");

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.post("/", ProductController.create);
router.put("/:id", ProductController.updateById);
router.delete("/:id", ProductController.deleteById);

module.exports = router;