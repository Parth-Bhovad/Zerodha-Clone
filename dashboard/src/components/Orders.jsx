import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//importing axios api
import api from "../api/axios";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("User not found in localStorage");
      return;
    }
        const response = await api.get(`/api/user/get-orders/${userId}`);
          setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();

  }, []);


  return (
    <div className="orders">
      {orders.length > 0 ? (
        <div className="order-table">
          <h2>Your Orders</h2>
          <table>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price}</td>
                  <td>{order.mode}</td>
                </tr>
              ))}
          </table>
        </div>
      ) : (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;