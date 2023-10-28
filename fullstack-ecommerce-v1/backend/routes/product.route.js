const Router = require("express").Router;

const router = Router();
router.get("/", (req, res) => {
  res.status(200).json({
    products: [
      { id: 1, name: "Aston Martin Valkyrie" },
      { id: 2, name: "Ferrari 2004" },
    ],
  });
});

module.exports = router;
