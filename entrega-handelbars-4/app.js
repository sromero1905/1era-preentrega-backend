const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Para análisis de formularios
app.use(express.json());

// Rutas
const productRoutes = require('./routes/products')(io);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

// Socket.io
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
  socket.emit('products', products);

  socket.on('newProduct', (product) => {
    products.push(product);
    io.sockets.emit('products', products);
  });

  socket.on('deleteProduct', (productId) => {
    products = products.filter(p => p.id !== productId);
    io.sockets.emit('products', products);
  });
});

// Lista de productos
let products = [];

// Iniciando el servidor
const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
