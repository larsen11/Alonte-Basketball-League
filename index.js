const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');

const app = express();
const server = http.createServer(app); 

// 1. Middleware
app.use(cors({
    // REMOVED the "/" at the end to fix the CORS policy error
    origin: "https://alonte-basketball-league-2.onrender.com", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// 2. Database Connection
// Added 'AlonteLeague' to the URI to ensure data goes to the right collection
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
