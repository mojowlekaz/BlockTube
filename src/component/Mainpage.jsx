"use client";
import React, { useContext } from "react";
import "/Users/macbook/stuipfs/src/App.css";
import { CounterContext } from "/Users/macbook/stuipfs/src/context/Counter.js";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import ErrorModal from "./ErrorModal";

export default function Mainpage() {
  const { walletaddress, currentHash, videos, error, currentTitle } =
    useContext(CounterContext);
  const Style = {
    width: 1300,
    height: 500,
    paddingLeft: "20px",
  };

  return (
    <div className="">
      <div>
        <p className="container">
          Welcome &nbsp;
          <strong>
            {walletaddress.length > 0 ? (
              `${walletaddress.substring(0, 10)}${
                walletaddress.length > 18
                  ? `.....${walletaddress.substring(30, 60)}`
                  : ""
              }`
            ) : (
              <React.Fragment>
                <ErrorModal />
                <strong>--Anon--</strong>
              </React.Fragment>
            )}
          </strong>
          &nbsp; to BlockTube, upload and view your videos securely in a
          decentraliazed way.
        </p>

        <div className="embed">
          <ReactPlayer
            url={`https://gateway.ipfs.io/ipfs/${currentHash}`}
            controls={true} // Show player controls
            width="1300" // Set player width
            height="500"
          />
        </div>
        {/* <br /> */}
        <h1 style={{ paddingLeft: "20px" }}>Video Title: {currentTitle} </h1>
      </div>
    </div>
  );
}
