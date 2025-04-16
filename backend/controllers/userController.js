const User = require("../model/UserModel");
const OrdersModel = require("../model/OrdersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
    const { email, username, password } = req.body;
    console.log(username);

    try {
        const newUser = await User({ email, username });  // Create a new user instance

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        newUser.password = hashedPassword;
        await newUser.save();

        const token = jwt.sign({ id: newUser._id },
            process.env.JWT_SECRET_KEY
        );

        res.cookie("token", token, {
            httpOnly: true,  // Prevents JavaScript access
            secure: process.env.NODE_ENV === "production",  // Secure only in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax"
        });
        res.json({ token, userId: newUser._id });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = User.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: "Invalid credential" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credential" });
    }

    const token = jwt.sign({ id: user._id },
        process.env.JWT_SECRET_KEY,
    );

    res.cookie("token", token, {
        httpOnly: true,  // Prevents JavaScript access
        secure: process.env.NODE_ENV === "production",  // Secure only in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax"
    });

    res.json({ token, userId: user._id });
}

const getUserInfo = async (req, res) => {
    try {
        const existingUser = await User.findById(req.user._id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ username: existingUser.username, email: existingUser.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const changePassword = async (req, res) => {
    console.log("Change password request received");
    try {
        console.log("Fetching user with ID:", req.user._id);
        const existingUser = await User.findById(req.user._id);
        if (!existingUser) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Setting new password for user:", req.user._id);
        existingUser.setPassword(req.body.password, async (err) => {
            if (err) {
                console.error("Error setting password:", err);
                return res.status(500).json({ message: "Error changing password" });
            }
            await existingUser.save(); // Save the updated user document
            console.log("Password changed successfully for user:", req.user._id);
            res.status(200).json({ message: "Password changed successfully!" });
        });
    } catch (error) {
        console.error("Error in changePassword:", error.message);
        res.status(500).json({ message: error.message });
    }
}

const getHoldings = async (req, res) => {
    try {
        const exitingUser = await User.findById(req.user._id);
        if (!exitingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const holdings = exitingUser.holdings;
        if (!holdings) {
            return res.status(404).json({ message: "No holdings found" });
        }
        res.status(200).json(holdings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const order = async (req, res) => {
    const newOrder = new OrdersModel({ ...req.body });
    console.log(newOrder);
    newOrder.save()
        .then(() => console.log("Order created successfully!"))
        .catch((error) => res.status(400).json({ message: error.message }));
    const existingUser = await User.findById(req.user._id);
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    existingUser.orders.push(newOrder._id);
    await existingUser.save();
    res.status(200).json({ message: "Order saved successfully!" });
};

const getFunds = async (req, res) => {
    console.log("Getting funds...");

    try {
        const existingUser = await User.findById(req.user._id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(existingUser.balance);

        res.json({ margin: existingUser.balance });
    } catch (error) {
        log.error("Error fetching funds:", error);
        res.status(500).json({ message: "Error fetching funds" });
    }
}

const addFunds = async (req, res) => {
    const { amount } = req.body;
    console.log("Adding funds:", amount);
    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }
    try {
        const existingUser = await User.findById(req.user._id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        existingUser.balance += amount; // Add the funds to the user's account
        await existingUser.save(); // Save the updated user document

        res.status(200).json({ message: "Funds added successfully!", addedAmount: amount });
    } catch (error) {
        console.log("Error adding funds:", error);
        res.status(500).json({ message: error });
    }
}

const withdrawFunds = async (req, res) => {
    try {
        const { amount } = req.body;
        console.log("Withdrawing funds:", amount);

        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ message: "Invalid withdrawal amount" });
        }

        const existingUser = await User.findById(req.user._id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (existingUser.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        existingUser.balance -= amount;
        await existingUser.save();

        res.status(200).json({ message: "Funds withdrawn successfully!", withdrawnAmount: amount });
    } catch (error) {
        console.error("Error withdrawing funds:", error);
        res.status(500).json({ message: "Server error while withdrawing funds" });
    }
};


const getOrders = async (req, res) => {
    console.log("Getting orders...");

    try {
        console.log("Fetching orders for user ID:", req.user._id);

        console.log("existingUser");
        const existingUser = await User.findById(req.user._id).populate('orders');
        console.log(existingUser);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }



        const orders = existingUser.orders;
        if (!orders) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Error during logout:", err);
            return res.status(500).json({ message: "Logout failed" });
        }
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).json({ message: "Logout failed" });
            }
            res.clearCookie("connect.sid", { path: "/" }); // Clear the session cookie
            res.status(200).json({ message: "Logged out successfully" });
        });
    })
}

module.exports = {
    signUp,
    getUserInfo,
    changePassword,
    getHoldings,
    order,
    getOrders,
    getFunds,
    addFunds,
    withdrawFunds,
    logout,
    // Other controller functions can be added here
};