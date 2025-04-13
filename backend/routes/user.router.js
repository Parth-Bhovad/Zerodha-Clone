const express = require('express');
const passport = require('passport'); // Importing passport for authentication

//Importing controllers
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/get-orders', userController.getOrders); // Get orders route
router.get('/get-holdings', userController.getHoldings); // Get holdings route

router.post('/', userController.signUp); // Sign up route
router.get('/', userController.getUserInfo); // Login route
router.patch('/', userController.changePassword); // Update password route

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

router.post('/logout', userController.logout); // Logout route

router.post('/order', userController.order); // Order route

router.patch('/fund/add', userController.addFunds); // Add funds route
router.patch('/fund/withdraw', userController.withdrawFunds); // Withdraw funds route
router.get('/fund', userController.getFunds); // Get funds route


router.delete('/:id', (req, res) => {
    res.send(`Delete user with ID: ${req.params.id}`);
});

module.exports = router;