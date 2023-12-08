const {
  getAllProducts,
  getProductById,
  postProduct,
  patchProductById,
  deleteProductById,
  getNumberOfProducts,
} = require("../controllers/products.controller.js");
const authenticateUser = require("../middlewares/authenticate-user.js");

const Router = require("express").Router;

const router = Router();

router.get("/", getAllProducts);

router.get("/number-of-products", getNumberOfProducts);

router.get("/:id", getProductById);

router.post("/", postProduct);

router.patch("/:id", patchProductById);

router.delete("/:id", authenticateUser, deleteProductById);

module.exports = router;
