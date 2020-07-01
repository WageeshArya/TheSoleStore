const express = require('express');
const router = express.Router();

const checkAuth = require('../auth/checkAuth');

const orderController = require('./orderController');

router.get('/', checkAuth, orderController.getAllOrders);

router.post('/:userId', checkAuth, orderController.createNewOrder);

router.delete('/:orderId', checkAuth, orderController.deleteOrder);

module.exports = router;