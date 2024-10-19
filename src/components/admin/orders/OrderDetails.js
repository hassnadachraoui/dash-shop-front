import React from "react";
import OrderDetailsComp from "../../../pages/order/OrderDetailsComp";
import ChnageOrderStatus from "../ChangeOrderStatus/ChnageOrderStatus";

const OrderDetails = () => {
    
  return (
  <>
  <OrderDetailsComp orderPageLink={"/admin/orders"} />;
  <ChnageOrderStatus/>
  </>
  )
};

export default OrderDetails;
