const {
  getAllProducts,
  getProductById,
  postProduct,
  patchProductById,
  deleteProductById,
} = require("../controllers/products.controller.js");

const Router = require("express").Router;

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", postProduct);

router.patch("/:id", patchProductById);

router.delete("/:id", deleteProductById);

module.exports = router;
