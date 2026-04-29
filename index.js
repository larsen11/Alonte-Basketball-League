const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');

const app = express(); // Declared ONLY once here
const server = http.createServer(app); 

// 1. ADVANCED CORS CONFIGURATION
const corsOptions = {
    origin: "https://alonte-basketball-league-2.onrender.com", 
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

// Fixed for Express 5 compatibility
app.options("/:path*", cors(corsOptions)); 

app.use(express.json());

// 2. Database Connection
const dbURI = "mongodb+srv://larsenreyes:larsenreyes@cluster0.wnpspyc.mongodb.net/AlonteLeague";

mongoose 
    .connect(dbURI) 
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    });

// 3. Routes
const submitForm = require('./API/submit');
app.use("/submit", submitForm);

app.get('/', (req, res) => {
    res.send("Alonte Basketball League API is online.");
});

// 4. Start Server
const PORT = process.env.PORT || 8080; 
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
