"use client";
import React, { createContext, useEffect, useRef, useState } from "react";
import {
  CheckIfWalletConnected,
  ConnectWallet,
  connectingwithContract,
} from "@/utils/apiFeatures";
import { BlockTubeCA, BlockTubeABI } from "./BlockTube";
// import ipfsClient from "ipfs-http-client";
// import { create } from "ipfs-http-client";
import { ethers } from "ethers";
export const BlockTubeContext = createContext();

const projectId = "2W7stzNUfAKJ8AcYvk4XLGTkfK1";
const projectSecret = "e40161a07fe52c406969228155f78882";
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

const ipfs = create({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization: authorization, // Include the authorization header
  },
});

export function BlockTubeProvider({ children }) {
  useEffect(() => {
    fetchData();
    Connectwallet();
    switchN();
    loadVideos();
    CheckIfWalletConnected();
  }, []);
  const [walletaddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [event, setEvent] = useState("");
  const [invalidNetworkError, setinvalidNetworkError] = useState("");
  const [validNetwork, setvalidNetwork] = useState("");
  const [hash, setHash] = useState(null);
  const [account, setAccount] = useState(""); // Initialize account state with an appropriate value
  const [currentHash, setCurrentHash] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videosCount, setVideosCount] = useState(0);
  const [IdCounter, setIdCounter] = useState(0);
  const [videos, setVideos] = useState([]);

  const onSubmitHandler = async (event, title) => {
    event.preventDefault();
    const form = event.target;
    const files = form[0].files;
    if (!files || files.length === 0) {
      return alert("No files selected");
    }
    if (!title || title.length === 0) {
      return alert("Give a Title");
    }
    setLoading(true);
    const totalVideos = files.length;

    const uploadPromises = Array.from(files).map(async (file, index) => {
      try {
        const result = await ipfs.add(file);
        const { cid } = result;
        // console.log(`Uploaded video with IPFS hash: ${cid.toString()}`);

        // Update the current video and overall progress
        setCurrentVideo(index + 1);
        setProgress(((index + 1) / totalVideos) * 100);

        return {
          cid: cid.toString(),
          path: result.path,
        };
      } catch (error) {
        console.error(`Error uploading video: ${error.message}`);
        setError(error.message);
        return null;
      }
    });

    // Wait for all uploads to complete
    const uploadedVideos = await Promise.all(uploadPromises);

    // Extract CIDs from uploadedVideos
    const cids = uploadedVideos.map((video) => video.cid);

    // ... rest of the code

    const uploadVideoPromises = cids.map(async (cid) => {
      try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = await provider.getSigner();
        const connectAccount = await ConnectWallet();
        let contract = new ethers.Contract(BlockTubeCA, BlockTubeABI, signer);

        const uploadVideoResult = await contract.Uploadvideo(cid, title);
        // console.log("video result", uploadVideoResult);

        // Move these lines here
        setCurrentHash(cid);
        setLoading(false);
      } catch (error) {
        console.error(`Error uploading video to contract: ${error.message}`);
      }
    });

    // Wait for all contract upload operations to complete
    await Promise.all(uploadVideoPromises);
  };

  //FECTH DATA TIME OF PAGE LOAD
  const fetchData = async () => {
    try {
      //GET CONTRACT
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = await provider.getSigner();
      let contract = new ethers.Contract(BlockTubeCA, BlockTubeABI, signer);
      //Fetch user Balance for iceToken
      const ReturnEvent = await contract.Uploaded();
      setEvent(ReturnEvent);
      console.log(ReturnEvent);
    } catch (error) {
      // setError(error.message);
    }
  };
  async function switchN() {
    const provider = window.ethereum;
    const CoreChainId = "0x45b";

    if (!provider) {
      console.log("Metamask is not installed, please install!");
    } else {
      const chainId = await provider.request({ method: "eth_chainId" });

      if (chainId === CoreChainId) {
        console.log("Bravo!, you are on the correct network");
        setvalidNetwork("You are connected to the right network");
      } else {
        console.log("oulalal, switch to the correct network");
        setinvalidNetworkError(
          "You are connected to the wrong network, please switch your Network to Core Mainnet follow metamask Prompt"
        );
        try {
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: CoreChainId }],
          });
          console.log("You have succefully switched to Binance Test network");
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            console.log(
              "This network is not available in your metamask, please add it"
            );
            try {
              await provider.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x45b",
                    chainName: "CORE test network",
                    rpcUrls: ["https://rpc.test.btcs.network/"],
                    blockExplorerUrls: ["https://scan.test.btcs.network/"],
                    nativeCurrency: {
                      symbol: "tcore", // 2-6 characters long
                      decimals: 18,
                    },
                  },
                ],
              });
            } catch (addError) {
              // handle "add" error
              console.log(addError);
            }
          }
        }
      }
    }
  }

  async function Connectwallet() {
    try {
      const connectAccount = await ConnectWallet();
      // console.log("Connected account:", connectAccount);
      setWalletAddress(connectAccount);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError(error.message);
    }
  }

  async function loadVideos() {
    try {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = await provider.getSigner();
      const connectAccount = await ConnectWallet();
      let contract = new ethers.Contract(BlockTubeCA, BlockTubeABI, signer);

      // Call the IDCounter function and wait for the response
      const blocktubeBigNumber = await contract.IDCounter();

      // Convert the BigNumber to a JavaScript number
      const blocktube = blocktubeBigNumber.toNumber();

      setIdCounter(blocktube);
      // console.log("this is the blockctube:", blocktube);

      const loadedVideos = [];
      for (let i = blocktube; i >= 1; i--) {
        const video = await contract.videos(i);
        loadedVideos.push(video);
      }
      setVideos(loadedVideos);
      const latest = loadedVideos[0];
      setCurrentHash(latest.Hash);
      // console.log("This isthe currecnt Hash:", latest.Hash);
      setCurrentTitle(latest.title);
    } catch (error) {
      console.log("error while fetching videos:", error);
      setError(error.message);
    }
  }

  const changeVideo = (hash, title) => {
    setCurrentHash(hash);
    setCurrentTitle(title);
  };

  return (
    <BlockTubeContext.Provider
      value={{
        walletaddress,
        error,
        walletaddress,
        error,
        changeVideo,
        loading,
        currentTitle,
        progress,
        currentVideo,
        onSubmitHandler,
        currentHash,
        currentTitle,
        videos,
      }}
    >
      {children}
    </BlockTubeContext.Provider>
  );
}
