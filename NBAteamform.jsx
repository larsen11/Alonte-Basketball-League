import React, { useState } from "react";
import "./NBAteamform.css";

const AlonteLeagueForm = () => {
    const [formData, setFormData] = useState({
        barangay: "",
        address: "",
        name: "",
        age: "",
        contact: "",
        height: "",
        weight: "",
        medicalConditions: "",
        competitionLevel: "",
        position: ""
    });

    const binanBarangays = [
        "Biñan (Poblacion)", "Bungahan", "Canlalay", "Casile", "De La Paz", 
        "Ganado", "Langkiwa", "Loma", "Malaban", "Malamig", "Mampalasan", 
        "Platero", "Poblacion", "San Antonio", "San Francisco", "San Jose", 
        "San Vicente", "Santo Domingo", "Santo Niño", "Santo Tomas", 
        "Soro-Soro", "Timbao", "Tubigan", "Zapote"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- VALIDATION ---
        const phoneRegex = /^\+639\d{9}$/;
        if (!phoneRegex.test(formData.contact)) {
            alert("❌ Invalid contact number. It must start with +639 followed by 9 digits.");
            return;
        }

        if (formData.height <= 0 || formData.weight <= 0) {
            alert("❌ Invalid physical stats. Height and Weight must be greater than 0.");
            return;
        }

        try {
            // This connects to your live Render backend
            const response = await fetch("https://alonte-basketball-backend.onrender.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("🏀 REGISTRATION SUBMITTED SUCCESSFULLY!");
                // Clear the form after successful save to MongoDB
                setFormData({
                    barangay: "", address: "", name: "", age: "", contact: "", 
                    height: "", weight: "", medicalConditions: "", competitionLevel: "", position: ""
                });
            } else {
                alert("❌ Submission failed: " + (result.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Connection Error:", error);
            alert("❌ Could not connect to the server. Make sure your backend is running.");
        }
    };

    return (
        <div className="league-form-container">
            <h1 className="league-form-title">Alonte Basketball League Form</h1>
            
            <p className="league-form-subtitle">
                Official registration and tryout form to monitor, assess,<br/>
                and select players residing in Biñan City for the 2026 league.
            </p>

            <form onSubmit={handleSubmit}>
                
                {/* --- LOCATION SECTION --- */}
                <select name="barangay" value={formData.barangay} onChange={handleChange} className="league-form-input" required>
                    <option value="">Select Residing Barangay</option>
                    {binanBarangays.map((brgy, index) => (
                        <option key={index} value={brgy}>{brgy}</option>
                    ))}
                </select>
                
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Complete Address (Street, Subdivision, etc.)" className="league-form-input" required />

                <hr className="league-form-divider" />

                {/* --- PERSONAL & PHYSICAL INFO SECTION --- */}
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="league-form-input" required />
                
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" min="5" max="60" className="league-form-input" required />
                
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number (+639XXXXXXXXX)" className="league-form-input" required />
                
                <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (in cm)" min="50" max="250" className="league-form-input" required />
                
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight (in kg)" min="20" max="200" className="league-form-input" required />
                
                <textarea name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} placeholder="Medical Conditions (Write 'None' if applicable)" rows="3" className="league-form-input" required></textarea>

                <hr className="league-form-divider" />

                {/* --- LEAGUE LOGISTICS SECTION --- */}
                <select name="competitionLevel" value={formData.competitionLevel} onChange={handleChange} className="league-form-input" required>
                    <option value="">Select Competition Level</option>
                    <option value="Mosquito">Mosquito (12 & Under)</option>
                    <option value="Midget">Midget / Aspirants (15 & Under)</option>
                    <option value="Juniors">Juniors (18 & Under)</option>
                    <option value="Seniors">Seniors (19 - 35 Years Old)</option>
                    <option value="Daddy">Daddy / Veterans (36 & Above)</option>
                </select>
                
                <select name="position" value={formData.position} onChange={handleChange} className="league-form-input" required>
                    <option value="">Select Team Position</option>
                    <option value="Point Guard">Point Guard (PG)</option>
                    <option value="Shooting Guard">Shooting Guard (SG)</option>
                    <option value="Small Forward">Small Forward (SF)</option>
                    <option value="Power Forward">Power Forward (PF)</option>
                    <option value="Center">Center (C)</option>
                </select>

                <button type="submit" className="league-form-button">Submit Registration</button>
            </form>
        </div>
    );
};

export default AlonteLeagueForm;
