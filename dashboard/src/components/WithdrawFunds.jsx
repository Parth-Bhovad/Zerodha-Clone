import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const WithdrawFunds = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleWithdrawFunds = async () => {
    const response = await axios.patch("http://localhost:3000/api/user/fund/withdraw", { amount }, { withCredentials: true });
    console.log(response.data);
    setMessage(`₹${amount} withdrawn successfully.`);
  };

  return (
    <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "12px" }}>
      <div className="card-body">
        <h5 className="card-title mb-3">Withdraw Funds</h5>
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          className="btn w-100"
          style={{ backgroundColor: "#d32f2f", color: "#fff" }}
          onClick={handleWithdrawFunds}
        >
          Withdraw Funds
        </button>
        {message && <p className="text-danger mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default WithdrawFunds;
