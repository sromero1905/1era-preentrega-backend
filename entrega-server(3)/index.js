const express = require('express');
const ProductManager = require('./main');

const app = express();
const PORT = 8080;  // Asegúrate de que este puerto está libre y es el que quieres usar

// Asegurando que la ruta al archivo JSON es la correcta
const productManager = new ProductManager('./productos.json');

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;
        const allProducts = await productManager.getProducts();
        res.json(limit ? allProducts.slice(0, parseInt(limit)) : allProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        // Asegurarse de convertir pid a número ya que los IDs se comparan como números en getProductById
        res.json(await productManager.getProductById(parseInt(pid)));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});