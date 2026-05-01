const express = require("express");
const router = express.Router();

// 1. Import the model we just created
const Form = require("../models/NBAteamform"); 

router.post("/", async (req, res) => {
    try {
        const {
            barangay, address, name, age, contact, 
            height, weight, medicalConditions, competitionLevel, position 
        } = req.body;

        // --- 2. BASIC VALIDATION ---
        if (!name || !contact || !barangay) {
            return res.status(400).json({ 
                message: "Missing required fields: Name, Contact, and Barangay are mandatory." 
            });
        }

        console.log("🏀 Received Data:", { name, barangay, competitionLevel });

        // --- 3. DATABASE LOGIC (Active) ---
        // We create a new entry using the data from the frontend
        const newEntry = new Form({
            barangay, address, name, age, contact, 
            height, weight, medicalConditions, competitionLevel, position
        });

        // This line actually saves it to your MongoDB Atlas cluster!
        await newEntry.save(); 

        // --- 4. SUCCESS RESPONSE ---
        res.status(201).json({ 
            message: "🏀 Form Submitted Successfully!",
            receivedData: name 
        });

    } catch (error) {
        console.error("❌ SUBMISSION ERROR:", error.message);
        
        res.status(500).json({ 
            message: "Internal Server Error. Could not save registration.",
            error: error.message 
        });
    }
});

module.exports = router;
