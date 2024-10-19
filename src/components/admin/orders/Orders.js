import React from "react";
import ListOfOrders from "../../../pages/order/ListOfOrders";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();

  const openOrderDetails = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <div className="container order">
      <h2>All Orders</h2>
      <p>
        Open an order to <b>Chnage Order Status.</b>
      </p>
      <br />
      <ListOfOrders openOrderDetails={openOrderDetails} />
    </div>
  );
};

export default Orders;
