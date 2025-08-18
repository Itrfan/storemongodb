const { Schema, model } = require("mongoose");

// declare schema for Movies
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// create a Modal from the schema
const Product = model("Product", productSchema);

// export the Modal
module.exports = Product;
