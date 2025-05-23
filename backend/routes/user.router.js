const express = require('express');
const passport = require('passport'); // Importing passport for authentication

//Importing controllers
const userController = require('../controllers/userController');

// Importing middleware for authentication
const isLoggedIn = require('../middlewares'); // Middleware to check if user is logged in

const router = express.Router();

// =====================
// USER AUTHENTICATION
// =====================

// Register a new user
router.post('/', userController.signUp);

// Login route using Passport.js local strategy
router.post('/login', userController.login);

// Logout the currently logged-in user
router.post('/logout', userController.logout);

// Get logged-in user's information (used after login to verify session)
router.get('/:userId', userController.getUserInfo);

// Change the current user's password
router.patch('/:userId', userController.changePassword);


// =====================
// ORDERS & HOLDINGS
// =====================

// Place a new order (buy/sell)
router.post('/order/:userId', userController.order);

// Get all orders made by the user
router.get('/get-orders/:userId', userController.getOrders);

// Get user's current holdings (stocks/assets owned)
router.get('/get-holdings/:userId', userController.getHoldings);


// =====================
// FUNDS MANAGEMENT
// =====================

// Add funds to user's trading account
router.patch('/fund/add/:userId', userController.addFunds);

// Withdraw funds from user's trading account
router.patch('/fund/withdraw/:userId', userController.withdrawFunds);

// Get current fund balance of the user
router.get('/fund/:userId', userController.getFunds);


module.exports = router;