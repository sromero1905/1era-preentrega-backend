
const express = require('express');
const ProductManager = require('./main');

const app = express();
const PORT = 3000; 

const productManager = new ProductManager();

app.get('/products', async (req, res) => {
  const { limit } = req.query;
  const allProducts = await productManager.getAllProducts();
  res.json(limit ? allProducts.slice(0, parseInt(limit)) : allProducts);
});

app.get('/products/:pid', async (req, res) => {
  const { pid } = req.params;
  res.json(await productManager.getProductById(pid));
});


app.listen(PORT, () => {
  console.log(`el servidor esta corriendo`);
});
