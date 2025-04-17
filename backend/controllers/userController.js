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
    console.log("Login request received");
    const { username, password } = req.body;
    console.log("password:", password);

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: "Invalid credential" });
    }

    console.log("User found:", user);


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
    console.log("User ID:", user._id);
    console.log("Token:", token);


    res.json({ token, userId: user._id });
}

const getUserInfo = async (req, res) => {
    console.log("Get user info request received");
    try {
        const userId = req.params.userId;
        console.log("Fetching user info for ID:", userId);
        const existingUser = await User.findById(userId);
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
        const userId = req.params.userId;
        const { password } = req.body;
        console.log("New password:", password);
        console.log("Changing password for user ID:", userId);
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Setting new password for user:", userId);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        existingUser.password = hashedPassword;
        await existingUser.save();
        console.log("Password changed successfully for user:", userId);
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error in changePassword:", error.message);
        res.status(500).json({ message: error.message });
    }
}

const getHoldings = async (req, res) => {
    try {
        const userId = req.params.userId;
        const exitingUser = await User.findById(userId);
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
    try {
        const userId = req.params.userId;
        const newOrder = new OrdersModel({ ...req.body });
        console.log(newOrder);
        newOrder.save()
            .then(() => console.log("Order created successfully!"))
            .catch((error) => res.status(400).json({ message: error.message }));
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
    
        existingUser.orders.push(newOrder._id);
        await existingUser.save();
        res.status(200).json({ message: "Order saved successfully!" });
    } catch (error) {
        console.log("Error during order:", error);
        res.json(error)
    }
};

const getFunds = async (req, res) => {
    console.log("Getting funds...");

    try {
        const userId = req.params.userId
        const existingUser = await User.findById(userId);
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
        const userId = req.params.userId;

        const existingUser = await User.findById(userId);
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
        const userId = req.params.userId;
        const { amount } = req.body;
        console.log("Withdrawing funds:", amount);

        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ message: "Invalid withdrawal amount" });
        }

        const existingUser = await User.findById(userId);
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
        const userId = req.params.userId;
        console.log("Fetching orders for user ID:", userId);

        console.log("existingUser");
        const existingUser = await User.findById(userId).populate('orders');
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
    console.log("logout");

    res.clearCookie("token", {
        httpOnly: true,  // Prevents JavaScript access
        secure: process.env.NODE_ENV === "production",  // Secure only in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax"
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
    console.log("Logged out successfully");
}

module.exports = {
    signUp,
    login,
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