import React from "react";
import ReactPlayer from "react-player";
import "/Users/macbook/stuipfs/src/App.css";

function VideoList({ videos, changeVideo }) {
  return (
    <div>
      {videos.map((video, key) => (
        <div
          className="custom-card mb-4 text-center"
          // style={{ width: "175px" }}
          key={key}
        >
          <div className="custom-card-title">
            <small>
              <p>{video.title}</p>
            </small>
          </div>

          <div onClick={() => changeVideo(video.Hash, video.title)}>
            <ReactPlayer
              url={`https://gateway.ipfs.io/ipfs/${video.Hash}`}
              controls={true}
              width="300px"
              height="150px"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
