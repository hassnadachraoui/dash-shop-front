import React, { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoupon,
  getCoupon,
  getCoupons,
} from "../../../redux/features/coupon/couponSlice";
import "../coupon/Coupon.scss";
import { FaTrashAlt } from "react-icons/fa";

const CouponList = () => {
  const { isLoading, coupons } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());
    //dispatch(getCoupon("PRESALE"));
  }, [dispatch]);

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Brand",
      message: "Are you sure to delete this Coupon ?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delCoupon(id),
        },
        {
          label: "Cancel",
         // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const delCoupon = async (id) => {
    await dispatch(deleteCoupon(id));
    await dispatch(getCoupons());
  };

  return (
    <div className="--mb2">
      <h3>All Coupons</h3>
      <div className="table">
        {coupons.length === 0 ? (
          <p>No coupon found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Discount</th>
                <th>Date Created</th>
                <th>Expiry Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => {
                const { _id, name, discount, expiresAt, createdAt } = coupon;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{discount}</td>
                    <td>{createdAt.substring(0, 10)}</td>
                    <td>{expiresAt.substring(0, 10)}</td>
                    <td>
                      <span>
                        <FaTrashAlt
                          size={20}
                          color={"red"}
                          onClick={() => confirmDelete(_id)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CouponList;
