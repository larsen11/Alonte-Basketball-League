const mongoose = require("mongoose");

// This blueprint perfectly matches the data you are sending from React
const formSchema = new mongoose.Schema({
    barangay: { type: String, required: true },
    address: { type: String },
    name: { type: String, required: true },
    age: { type: Number },
    contact: { type: String, required: true },
    height: { type: String },
    weight: { type: String },
    medicalConditions: { type: String },
    competitionLevel: { type: String },
    position: { type: String }
}, { 
    timestamps: true // This automatically adds a "createdAt" date to every registration
});

module.exports = mongoose.model("Form", formSchema);
