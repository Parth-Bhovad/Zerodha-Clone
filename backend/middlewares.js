// This middleware checks if the user is authenticated before allowing access to certain routes
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User is logged in, go to next middleware/route
    } else {
        return res.status(401).json({ message: 'You must be logged in to access this route' });
    }
}

module.exports = isLoggedIn; // Export the middleware function for use in other files
