const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo');

//Models
const User = require('./model/UserModel');

//Routers
const userRouter = require('./routes/user.router');

//Models
const HoldingsModel = require('./model/HoldingsModel');
const PositionsModel = require('./model/PositionsModel');
const OrdersModel = require('./model/OrdersModel');

//Allowed origins for CORS
const allowedOrigins = process.env.NODE_ENV === "production" ?
    ["https://zerodha-dashboard-pqjg.onrender.com",
        "https://zerodha-clone-tfsx.onrender.com"
    ]
    :
    [
        'http://localhost:5174',
        'http://localhost:5173',
    ];
app.use(cors({
    origin: "https://zerodha-dashboard-pqjg.onrender.com",
    credentials: true,
}));
app.use(express.json());

//MONGODB URL
const uri = process.env.MONGO_URL;
//Session storage congiguration
const store = MongoStore.create({
    mongoUrl: uri,
    crypto: {
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 3600
});

const sessionConfig = {
    store: store,
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: true, // Secure only in production
        sameSite: "none", // SameSite attribute for CSRF protection
    },
}

app.use(session(sessionConfig));
app.use(passport.initialize());

app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes

app.use('/api/user', userRouter);

// app.get('/addPositions', (req, res) => {
//     const tempPositions = [
//         {
//             product: "CNC",
//             name: "EVEREADY",
//             qty: 2,
//             avg: 316.27,
//             price: 312.35,
//             net: "+0.58%",
//             day: "-1.24%",
//             isLoss: true,
//         },
//         {
//             product: "CNC",
//             name: "JUBLFOOD",
//             qty: 1,
//             avg: 3124.75,
//             price: 3082.65,
//             net: "+10.04%",
//             day: "-1.35%",
//             isLoss: true,
//         },
//     ];

//     tempPositions.forEach(async (position) => {
//         const newPosition = new PositionsModel({
//             product: position.product,
//             name: position.name,
//             qty: position.qty,
//             avg: position.avg,
//             price: position.price,
//             net: position.net,
//             day: position.day,
//             isLoss: position.isLoss,
//         });
//         await newPosition.save();
//     });
//     res.send("Positions added successfully!");
// });

// app.get('/addHoldings', (req, res) => {
//     const tempHoldings = [
//         {
//             name: "BHARTIARTL",
//             qty: 2,
//             avg: 538.05,
//             price: 541.15,
//             net: "+0.58%",
//             day: "+2.99%",
//         },
//         {
//             name: "HDFCBANK",
//             qty: 2,
//             avg: 1383.4,
//             price: 1522.35,
//             net: "+10.04%",
//             day: "+0.11%",
//         },
//         {
//             name: "HINDUNILVR",
//             qty: 1,
//             avg: 2335.85,
//             price: 2417.4,
//             net: "+3.49%",
//             day: "+0.21%",
//         },
//         {
//             name: "INFY",
//             qty: 1,
//             avg: 1350.5,
//             price: 1555.45,
//             net: "+15.18%",
//             day: "-1.60%",
//             isLoss: true,
//         },
//         {
//             name: "ITC",
//             qty: 5,
//             avg: 202.0,
//             price: 207.9,
//             net: "+2.92%",
//             day: "+0.80%",
//         },
//         {
//             name: "KPITTECH",
//             qty: 5,
//             avg: 250.3,
//             price: 266.45,
//             net: "+6.45%",
//             day: "+3.54%",
//         },
//         {
//             name: "M&M",
//             qty: 2,
//             avg: 809.9,
//             price: 779.8,
//             net: "-3.72%",
//             day: "-0.01%",
//             isLoss: true,
//         },
//         {
//             name: "RELIANCE",
//             qty: 1,
//             avg: 2193.7,
//             price: 2112.4,
//             net: "-3.71%",
//             day: "+1.44%",
//         },
//         {
//             name: "SBIN",
//             qty: 4,
//             avg: 324.35,
//             price: 430.2,
//             net: "+32.63%",
//             day: "-0.34%",
//             isLoss: true,
//         },
//         {
//             name: "SGBMAY29",
//             qty: 2,
//             avg: 4727.0,
//             price: 4719.0,
//             net: "-0.17%",
//             day: "+0.15%",
//         },
//         {
//             name: "TATAPOWER",
//             qty: 5,
//             avg: 104.2,
//             price: 124.15,
//             net: "+19.15%",
//             day: "-0.24%",
//             isLoss: true,
//         },
//         {
//             name: "TCS",
//             qty: 1,
//             avg: 3041.7,
//             price: 3194.8,
//             net: "+5.03%",
//             day: "-0.25%",
//             isLoss: true,
//         },
//         {
//             name: "WIPRO",
//             qty: 4,
//             avg: 489.3,
//             price: 577.75,
//             net: "+18.08%",
//             day: "+0.32%",
//         },
//     ];

//     tempHoldings.forEach(async (holding) => {
//         const newHolding = new HoldingsModel({
//             name: holding.name,
//             qty: holding.qty,
//             avg: holding.avg,
//             price: holding.price,
//             net: holding.net,
//             day: holding.day,
//         });
//         await newHolding.save();
//     });
//     res.send("Holdings added successfully!");
// });

app.get('/holdings', async (req, res) => {
    try {
        const holdings = await HoldingsModel.find();
        res.json(holdings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// app.get('/positions', async (req, res) => {
//     try {
//         const positions = await PositionsModel.find();
//         res.json(positions);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// app.post("/newOrder", (req, res) => {
//     // const { name, qty, avg, price, net, day } = req.body;

//     const newOrder = new OrdersModel({...req.body});
//     console.log(newOrder);
//     newOrder.save()
//         .then(() => res.status(201).json({ message: "Order created successfully!" }))
//         .catch((error) => res.status(400).json({ message: error.message }));
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    mongoose.connect(uri);
    console.log("Connected to MongoDB");
});