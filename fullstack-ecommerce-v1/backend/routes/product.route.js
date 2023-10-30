const config = require("../config/config.js");
const badRequest = require("../helpers/bad-request");
const db = require("../database/get-database-connection.js").getInstance();

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

router.post("/", (req, res) => {
  const { name, description, price } = req.body;
  if (!(name && description && price)) {
    return badRequest(
      req,
      res,
      "The name, description, and price are required"
    );
  }
  const sqlQuerie = `INSERT INTO ${config.productTableName} SET ?`;
  const payload = { name, description, price };
  db.query(sqlQuerie, payload, (err) => {
    return err
      ? res.status(500).json({ msg: "Product creation failed", success: false })
      : res.status(201).json({
          msg: "Product added correctly",
          success: true,
        });
  });
});

module.exports = router;
