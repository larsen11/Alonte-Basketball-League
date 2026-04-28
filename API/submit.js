const express = require("express");
const router = express.Router();

router.post("/", (req, res)=> {
    const {barangay, address, name, age, contact, height, weight, medicalConditions, competitionLevel, position} = req.body

    console.log("Received Data: ", {barangay, address, name, age, contact, height, weight, medicalConditions, competitionLevel, position} )

    res.status(200).json({message: " Form Submitted Successfully"});
});

module.exports = router;

// lacks error handling