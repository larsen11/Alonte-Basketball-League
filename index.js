const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');

const app = express(); 
const server = http.createServer(app); 

// 1. MIDDLEWARE & CORS (Must be before routes)
// Allows all origins temporarily to test the connection
app.use(cors()); 

// Explicit pre-flight handler for Express 5 compatibility
app.options("/:path*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://alonte-basketball-league-2.onrender.com");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});

// Required for parsing JSON data from your React form
app.use(express.json());

// 2. DATABASE CONNECTION
const dbURI = "mongodb+srv://larsenreyes:larsenreyes@cluster0.wnpspyc.mongodb.net/AlonteLeague";

mongoose 
    .connect(dbURI) 
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1); // Exits if connection fails to prevent app hanging
    });

// 3. ROUTES
const submitForm = require('./API/submit');
app.use("/submit", submitForm);

app.get('/', (req, res) => {
    res.send("Alonte Basketball League API is online.");
});

// 4. START SERVER
const PORT = process.env.PORT || 8080; 
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
