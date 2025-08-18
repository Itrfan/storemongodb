const express = require("express");
//create a express router
const router = express.Router();

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

/* 
  Routes for movies
  GET /movies - list all the movies
  GET /movies/68943cf564aa9f8354cef260 - get a specific movie
  POST /movies - add new movie
  PUT /movies/68943cf564aa9f8354cef260 - update movie
  DELETE /movies/68943cf564aa9f8354cef260 - delete movie
*/
// GET /movies - list all the movies
/*
  query params is everything after the ? mark
*/
router.get("/", async (req, res) => {
  const name = req.query.name;
  const price = req.query.price;
  const category = req.query.category;
  const product = await getProducts(name, price, category);
  res.status(200).send(product);
});

// GET /movies/:id - get a specific movie
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  const product = await getProduct(id);
  res.status(200).send(product);
});

/* 
  POST /movies - add new movie
  This POST route need to accept the following parameters:
  - title
  - director
  - release_year
  - genre
  - rating
*/
router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // check error - make sure all the fields are not empty
    if (!name || !description || !price || !category) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }
    res
      .status(200)
      // short hand
      .send(await addProduct(name, description, price, category));
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

//  PUT /movies/68943cf564aa9f8354cef260 - update movie
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the movie
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // check error - make sure all the fields are not empty
    if (!name || !price ||  !category) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res
      .status(200)
      .send(
        await updateProduct(id, name, description, price, category)
      );
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

//  DELETE /movies/68943cf564aa9f8354cef260 - delete movie
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await deleteProduct(id);

    res.status(200).send({
      message: `Product with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
