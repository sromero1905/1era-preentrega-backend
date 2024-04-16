class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock"];
        if (!requiredFields.every(field => field in product)) {
            console.log("Error: Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(prod => prod.code === product.code)) {
            console.log("Error: El código del producto ya existe");
            return;
        }

        product.id = this.products.length + 1;
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(prod => prod.id === id);
        if (product) {
            return product;
        } else {
            console.log("Error: Producto no encontrado");
        }
    }
}

const manager = new ProductManager();
manager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 100.99,
    thumbnail: "/foto1.avif",
    code: "ABC123",
    stock: 100
});

console.log(manager.getProducts());
console.log(manager.getProductById(1));
