const express = require('express');

//Importing controllers
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/get-orders', userController.getOrders); // Get orders route

router.post('/', userController.signUp); // Sign up route

router.post('/order', userController.order); // Order route

router.patch('/fund/add', userController.addFunds); // Add funds route
router.patch('/fund/withdraw', userController.withdrawFunds); // Withdraw funds route
router.get('/fund', userController.getFunds); // Get funds route


router.delete('/:id', (req, res) => {
    res.send(`Delete user with ID: ${req.params.id}`);
});

module.exports = router;