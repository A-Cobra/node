const config = require("../config/config.js");
const db = require("../database/get-database-connection.js").getInstance();

function getAllProducts(req, res) {
  const sqlQuery = `SELECT * FROM ${config.productTableName}`;
  db.query(sqlQuery, (err, result) => {
    return err
      ? internalServerError(err)
      : res.status(201).json({
          msg: "Products retrieved correctly",
          success: true,
          data: result,
        });
  });
}

function getProductById(req, res) {
  const id = req.params.id;

  if (!id) {
    return badRequest(req, res);
  }

  const sqlQuery = `SELECT * FROM ${config.productTableName} WHERE id=? LIMIT 1`;
  // const sqlQuery = `SELECT * FROM ${config.productTableName} WHERE id = ${id}`; //Unsafe

  db.query(sqlQuery, id, (err, result) => {
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
}

function postProduct(req, res) {
  const { name, description, price } = req.body;
  if (!(name && description && price)) {
    return badRequest(
      req,
      res,
      "The name, description, and price are required"
    );
  }
  const sqlQuery = `INSERT INTO ${config.productTableName} SET ?`;
  const payload = { name, description, price };
  db.query(sqlQuery, payload, (err) => {
    return err
      ? res.status(500).json({ msg: "Product creation failed", success: false })
      : res.status(201).json({
          msg: "Product created correctly",
          success: true,
        });
  });
}

function patchProductById(req, res) {
  const id = req.params.id;
  if (!id) {
    return badRequest(req, res, "The id is required");
  }

  const updatedFields = req.body;
  const sqlQuery = `UPDATE ${config.productTableName} SET ? WHERE id = ?`;

  const payload = [updatedFields, id];
  db.query(sqlQuery, payload, (err) => {
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
}

function deleteProductById(req, res) {
  const id = req.params.id;

  if (!id) {
    return badRequest(req, res, "The id is required");
  }

  const sqlQuery = `DELETE FROM ${config.productTableName} WHERE id = ?`;

  db.query(sqlQuery, id, (err) => {
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
}

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  patchProductById,
  deleteProductById,
};
