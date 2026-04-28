const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send("server is running");
});

// REMOVED: useNewUrlParser and useUnifiedTopology
// ADDED: The database name (e.g., 'myFirstDatabase') before the '?'
const dbURI = "mongodb+srv://larsenreyes:larsenreyes@cluster0.wnpspyc.mongodb.net/";

mongoose 
    .connect(dbURI) 
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message);
        // Note: Check your IP Whitelist in MongoDB Atlas if this still fails!
        process.exit(1);
    });

    app.use(cors());
    app.use(express.json());

    const submitForm = require('./API/submit')

    app.use("/submit", submitForm);
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});