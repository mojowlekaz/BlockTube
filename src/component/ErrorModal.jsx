import React, { useContext, useState } from "react";
import { CounterContext } from "/Users/macbook/stuipfs/src/context/Counter.js";
import "/Users/macbook/stuipfs/src/App.css";

const ErrorModal = () => {
  const { currentHash, currentTitle } = useContext(CounterContext);
  const [close, setClose] = useState(false);
  return (
    <div>
      {close == false ? (
        <div className="custom-error-alert">
          <div className="modal-content1">
            <p>wallet not detected!</p>
            <p></p>
            <div className="center">
              <button onClick={() => setClose(true)}>OK</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ErrorModal;
