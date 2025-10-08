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
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: {
    type: String,
  },
  billplz_id: String,
  paid_at: Date,
});

// create a Modal from the schema
const Product = model("Product", productSchema);

// export the Modal
module.exports = Product;
