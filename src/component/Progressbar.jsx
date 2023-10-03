"use client";
import { useState, useContext } from "react";
import { CounterContext } from "/Users/macbook/stuipfs/src/context/Counter.js";
import { Watch } from "react-loader-spinner";
import "/Users/macbook/stuipfs/src/App.css";

const CustomModal = ({ isOpen, onClose }) => {
  const { walletaddress, onSubmitHandler, progress, loading, error } =
    useContext(CounterContext);
  return (
    <div className={`custom-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        {/* <button className="close-btn" onClick={onClose}>
          &times;
        </button> */}
        <h2>
          Video is getting uploaded, this might take a while. Wait for Metamask
          Notification
        </h2>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          {" "}
          <Watch
            height="80"
            width="80"
            radius="48"
            color="red"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
            value={progress}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
