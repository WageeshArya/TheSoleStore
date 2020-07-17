const express = require('express');
const router = express.Router();

const checkAuth = require('../auth/checkAuth');

const orderController = require('./orderController');

router.get('/:userId', checkAuth, orderController.getOrders);

router.post('/:userId', checkAuth, orderController.createNewOrder);

router.delete('/:orderId', checkAuth, orderController.deleteOrder);

module.exports = router;