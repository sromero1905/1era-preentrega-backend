const express = require('express');
const router = express.Router();

module.exports = (io) => {
  router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
  });

  return router;
};
