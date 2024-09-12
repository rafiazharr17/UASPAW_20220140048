const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let products = [
  {
    id: 1,
    name: "Iphone 16 Pro Max",
    price: 21000000,
    description:
      "Iphone 16 Pro Max merupakan smartphone terbaru dengan spesifikasi tombol capture untuk foto dan video.",
    image: "iphone.jpg",
  },
  {
    id: 2,
    name: "Samsung S24 Ultra",
    price: 21999000,
    description:
      "Samsung S24 merupakan smartphone terbaru dengan spesifikasi zoom 100x.",
    image: "samsung.jpg",
  },
  {
    id: 3,
    name: "Google Pixel 9 Pro XL",
    price: 17107034,
    description:
      "Google Pixel 9 Pro XL merupakan smartphone terbaru dengan spesifikasi layar 120hz.",
    image: "pixel.jpg",
  },
  {
    id: 4,
    name: "Rog Phone 8 Pro",
    price: 14999000,
    description:
      "Rog Phone 8 merupakan smartphone terbaru dengan spesifikasi gaming terbaik.",
    image: "rog.jpg",
  },
];

// GET all products
app.get("/api/products", (req, res) => {
  const { search } = req.query;
  if (search) {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

// POST a new product
app.post("/api/products", (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// GET a specific product
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// PUT (update) a product
app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });

  const { name, price, description } = req.body;
  if (name) product.name = name;
  if (price) product.price = price;
  if (description) product.description = description;

  res.json(product);
});

// DELETE a product
app.delete("/api/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  products.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
