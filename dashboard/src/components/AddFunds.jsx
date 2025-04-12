import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const AddFunds = () => {
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    const handleAddFunds = async () => {
        try {
            console.log("Adding funds:", typeof amount);

            const response = await axios.patch("http://localhost:3000/api/user/fund/add", { amount }, { withCredentials: true });
            console.log(response.data);
            setMessage(`₹${amount} added successfully.`);
        } catch (error) {
            console.error("Error adding funds:", error.message);
            console.error("Error response:", error.response ? error.response.data : null);
            setMessage("Failed to add funds. Please try again.");
        }
    };

    return (
        <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "12px" }}>
            <div className="card-body">
                <h5 className="card-title mb-3">Add Funds</h5>
                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <button
                    className="btn w-100"
                    style={{ backgroundColor: "#388e3c", color: "#fff" }}
                    onClick={handleAddFunds}
                >
                    Add Funds
                </button>
                {message && <p className="text-success mt-3">{message}</p>}
            </div>
        </div>
    );
};

export default AddFunds;
