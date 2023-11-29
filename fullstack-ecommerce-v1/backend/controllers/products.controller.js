const config = require("../config/config.js");
const db = require("../database/get-database-connection.js").getInstance();
const internalServerError = require("../helpers/internal-server-error.js");
const badRequest = require("../helpers/bad-request.js");
const findNumberOfProductsInDb = require("../helpers/find-number-of-products-in-db.js");

function getAllProducts(req, res) {
  const sqlQuery = `SELECT * FROM ${config.productTableName}`;
  db.query(sqlQuery, (err, result) => {
    return err
      ? internalServerError(err)
      : res.status(200).json({
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

    if (records.length === 0) {
      return res.status(404).json({
        msg: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Product retrieved correctly",
      success: true,
      data: records[0],
    });
  });
}

async function postProduct(req, res) {
  const { name, description, price } = req.body;
  if (!(name && description && price)) {
    return badRequest(
      req,
      res,
      "The name, description, and price are required"
    );
  }

  //Verifying that the record is smaller than 6. Just so that this app will not be exploited
  // This would typically not be done
  const counter = await findNumberOfProductsInDb();
  if (counter >= config.maxNumberOfProducts) {
    return res.status(500).json({
      msg: `Can not create more than ${config.maxNumberOfProducts} products`,
      success: false,
    });
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

async function getNumberOfProducts(req, res) {
  try {
    const numberOfRecords = await findNumberOfProductsInDb();
    return res.status(201).json({
      msg: "Count retrieved correctly",
      success: true,
      data: numberOfRecords,
    });
  } catch (error) {
    return internalServerError(
      req,
      res,
      "The database could not fetch the number of records"
    );
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  patchProductById,
  deleteProductById,
  getNumberOfProducts,
};
