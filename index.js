const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');

const app = express();
const server = http.createServer(app); 

// 1. Middleware (must be before routes)
app.use(cors({
    origin: "https://alonte-basketball-league-2.onrender.com/"
}));
app.use(express.json());

// 2. Database Connection
const dbURI = "mongodb+srv://larsenreyes:larsenreyes@cluster0.wnpspyc.mongodb.net/";

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
    res.send("server is running");
});

// 4. Start Server (Only call this ONCE)
const PORT = process.env.PORT || 8080; 
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
