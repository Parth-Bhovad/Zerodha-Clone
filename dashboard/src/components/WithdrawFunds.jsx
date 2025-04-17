import { useState } from "react";
//importing axios api
import api from "../api/axios";


const WithdrawFunds = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleWithdrawFunds = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("User not found in localStorage");
      return;
    }
    const response = await api.patch(`/api/user/fund/withdraw/${userId}`, { amount });
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
