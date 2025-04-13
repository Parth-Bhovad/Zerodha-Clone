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
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: info?.message || 'Invalid credentials' });

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({
                message: 'Logged in successfully',
                user: { username: user.username, email: user.email }
            });
        });
    })(req, res, next);
});

// Logout the currently logged-in user
router.post('/logout', isLoggedIn, userController.logout);

// Get logged-in user's information (used after login to verify session)
router.get('/', isLoggedIn, userController.getUserInfo);

// Change the current user's password
router.patch('/', isLoggedIn, userController.changePassword);


// =====================
// ORDERS & HOLDINGS
// =====================

// Place a new order (buy/sell)
router.post('/order', isLoggedIn, userController.order);

// Get all orders made by the user
router.get('/get-orders', isLoggedIn, userController.getOrders);

// Get user's current holdings (stocks/assets owned)
router.get('/get-holdings', isLoggedIn, userController.getHoldings);


// =====================
// FUNDS MANAGEMENT
// =====================

// Add funds to user's trading account
router.patch('/fund/add', isLoggedIn, userController.addFunds);

// Withdraw funds from user's trading account
router.patch('/fund/withdraw', isLoggedIn, userController.withdrawFunds);

// Get current fund balance of the user
router.get('/fund', isLoggedIn, userController.getFunds);


module.exports = router;