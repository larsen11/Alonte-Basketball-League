const express = require("express");
const router = express.Router();

// 1. You should import your Mongoose Model here to actually save to MongoDB
// const Form = require("../models/Form"); 

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

        // --- 3. LOGGING FOR DEBUGGING ---
        console.log("🏀 Received Data:", { name, barangay, competitionLevel });

        // --- 4. DATABASE LOGIC (Placeholder) ---
        /*
        const newEntry = new Form({
            barangay, address, name, age, contact, 
            height, weight, medicalConditions, competitionLevel, position
        });
        await newEntry.save();
        */

        // --- 5. SUCCESS RESPONSE ---
        res.status(201).json({ 
            message: "🏀 Form Submitted Successfully!",
            receivedData: name 
        });

    } catch (error) {
        // --- 6. ERROR HANDLING ---
        console.error("❌ SUBMISSION ERROR:", error.message);
        
        res.status(500).json({ 
            message: "Internal Server Error. Could not save registration.",
            error: error.message 
        });
    }
});

module.exports = router;
