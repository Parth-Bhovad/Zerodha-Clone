const User = require("../model/UserModel");
const OrdersModel = require("../model/OrdersModel");

const signUp = async (req, res) => {
    const { email, username, password } = req.body;
    console.log(username);
    
    try {
        const newUser = await User({email, username});  // Create a new user instance
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser); // Log the registered user for debugging
        
        req.logIn(registeredUser, (err) => {
            if (err) {
                return res.status(500).json({ message: "Login failed" });
            }
            return res.status(201).json({ user: registeredUser });
        });

    } catch (error) {
        res.status(400).json({ message: error });
    }
}

const holdings = async (req, res) => {
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
    const newOrder = new OrdersModel({...req.body});
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
        
        res.status(200).json({ message: "Funds added successfully!" , addedAmount: amount });
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

module.exports = {
    signUp,
    holdings,
    order,
    getOrders,
    getFunds,
    addFunds,
    withdrawFunds,
    // Other controller functions can be added here
};