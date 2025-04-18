import { useState, useContext } from "react";
import { Link } from "react-router-dom";

//importing axios api
import api from "../api/axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, price }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  // const [stockPrice, setStockPrice] = useState(0.0);

  const generalContext = useContext(GeneralContext);
  console.log(price);
  
  const handleBuyClick = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("User not found in localStorage");
      return;
    }
    let response = await api.get(`/api/user/fund/${userId}`);
    let balance = response.data.margin;
    if (price > balance) {
      alert("Insufficient funds");
      return;
    }

    let res = await api.post(`/api/user/order/${userId}`, {
      name: uid,
      qty: stockQuantity,
      price,
      mode: "BUY",
    });
    console.log(res.data);
    generalContext.closeBuyWindow();
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              readOnly
              value={Number(price) * Number(stockQuantity) || 0}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;