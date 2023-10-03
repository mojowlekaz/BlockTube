"use client";
import React, { useContext, useState, useEffect } from "react";
import "/Users/macbook/stuipfs/src/App.css";
const Info = () => {
  // Check if the Info component should be displayed
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [close, setClose] = useState(false);
  useEffect(() => {
    // Check if the Info component has been shown before
    const hasBeenShown = localStorage.getItem("infoShown");

    // If it hasn't been shown, display the Info component and mark it as shown
    if (!hasBeenShown) {
      setShouldDisplay(true);
      localStorage.setItem("infoShown", "true");
    }
  }, []);

  return (
    <div>
      {shouldDisplay && (
        <div className="custom-error-alert">
          <div className="modal-content11">
            <p>
              This dApp is deployed on CORE Testnet. Click on the link below to
              set up the network in your MetaMask, or it will be automatically
              added to MetaMask when you connect your wallet.
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <a
                href="https://chainlist.org/chain/1115"
                target=" _blank"
                rel="noopener noreferrer"
              >
                COREDAO Testnet Setup
              </a>
              <a href="https://scan.test.btcs.network/faucet " target="_blank">
                COREDAO FAUCET
              </a>
            </div>
            <p></p>
            <div className="center">
              <button onClick={() => setShouldDisplay(false)}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
