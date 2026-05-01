const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');

const app = express(); 
const server = http.createServer(app); 

// 1. MIDDLEWARE & CORS
app.use(cors()); 

// FIXED FOR EXPRESS 5: 
// Removed the leading slash and simplified the pattern to satisfy path-to-regexp
app.options("{*path}", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://alonte-basketball-league-2.onrender.com");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});

app.use(express.json());

// 2. DATABASE CONNECTION
const dbURI = "mongodb://larsenreyes:larsenreyes@ac-2yapnh7-shard-00-00.wnpspyc.mongodb.net:27017,ac-2yapnh7-shard-00-01.wnpspyc.mongodb.net:27017,ac-2yapnh7-shard-00-02.wnpspyc.mongodb.net:27017/AlonteLeague?ssl=true&replicaSet=atlas-ttkcgh-shard-0&authSource=admin&appName=Cluster0";

mongoose 
    .connect(dbURI) 
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1); 
    });

// 3. ROUTES
const submitForm = require('./API/submit');
app.use("/submit", submitForm);

app.get('/', (req, res) => {
    res.send("Alonte Basketball League API is online.");
});

// 4. START SERVER
const PORT = process.env.PORT || 8080; 

// Add '0.0.0.0' to force Render to expose the port to the public internet
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
