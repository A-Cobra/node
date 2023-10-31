const config = require("../config/config.js");
const badRequest = require("../helpers/bad-request");
const internalServerError = require("../helpers/internal-server-error.js");
const db = require("../database/get-database-connection.js").getInstance();
const Router = require("express").Router;

const router = Router();

router.get("/", (req, res) => {
  const sqlQuerie = `SELECT * FROM ${config.productTableName}`;
  db.query(sqlQuerie, (err, result) => {
    return err
      ? internalServerError(err)
      : res.status(201).json({
          msg: "Products retrieved correctly",
          success: true,
          data: result,
        });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return badRequest(req, res);
  }

  const sqlQuerie = `SELECT * FROM ${config.productTableName} WHERE id=? LIMIT 1`;
  // const sqlQuerie = `SELECT * FROM ${config.productTableName} WHERE id = ${id}`; //Unsafe

  db.query(sqlQuerie, id, (err, result) => {
    if (err) {
      return internalServerError(req, res);
    }

    const records = result;
    console.log(records);

    if (records.length === 0) {
      return res.status(404).json({
        msg: "User not found",
        success: false,
      });
    }

    return res.status(201).json({
      msg: "Product retrieved correctly",
      success: true,
      data: records[0],
    });
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

router.patch("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return badRequest(req, res, "The id is required");
  }

  const updatedFields = req.body;
  const sqlQuerie = `UPDATE ${config.productTableName} SET ? WHERE id = ?`;

  const payload = [updatedFields, id];
  db.query(sqlQuerie, payload, (err) => {
    return err
      ? res.status(500).json({
          msg: "Product update failed, try again later",
          success: false,
        })
      : res.status(201).json({
          msg: "Product updated correctly",
          success: true,
        });
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return badRequest(req, res, "The id is required");
  }

  const sqlQuerie = `DELETE FROM ${config.productTableName} WHERE id = ?`;

  db.query(sqlQuerie, id, (err) => {
    return err
      ? res.status(500).json({
          msg: "Product removal failed, try again later",
          success: false,
        })
      : res.status(201).json({
          msg: "Product removed correctly",
          success: true,
        });
  });
});

module.exports = router;
