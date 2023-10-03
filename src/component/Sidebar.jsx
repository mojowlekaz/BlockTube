"use client";
import React, { useEffect, useContext, useState } from "react";
import { CounterContext } from "/Users/macbook/stuipfs/src/context/Counter.js";
import Progressbar from "./Progressbar";
import ReactPlayer from "react-player";
import VideoList from "./VideoList";
import "/Users/macbook/stuipfs/src/App.css";

export default function Sidebar() {
  const {
    walletaddress,
    onSubmitHandler,
    changeVideo,
    progress,
    videos,
    loading,
    error,
  } = useContext(CounterContext);
  // const [uploadVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [buffer, setBuffer] = useState(null);
  const [account, setAccount] = useState(""); // Initialize account state with an appropriate value
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <br /> <br /> <br />
      {loading ? <Progressbar isOpen={isModalOpen} onClose={closeModal} /> : ""}
      <div className="customwidth  style ">
        <form onSubmit={(event) => onSubmitHandler(event, title)}>
          <input
            type="file"
            name="file"
            accept=".mp4, .mkv, .avi, .mov, video/*"
          />
          <input
            type="text"
            placeholder="title of your video"
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />

          <button
            style={{
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
            }}
            type="submit"
            onClick={openModal}
          >
            Upload file
          </button>
        </form>
      </div>
      <br />
      <hr className="rd-hr" />
      <br />
      <div className="outline list">
        <VideoList videos={videos} changeVideo={changeVideo} />
        <br />
      </div>
    </div>
  );
}

// mob_hid justify-between pt-[30px] items-center sidewidth  flex flex-col sidebg   h-screen  w-[258px]
