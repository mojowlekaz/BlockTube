import { ethers } from "ethers";
import {
  BlockTubeCA,
  BlockTubeABI,
} from "/Users/macbook/stuipfs/src/context/BlockTube.js";
import Web3Modal from "web3modal";

export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask");
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log("error");
  }
};

export async function ConnectWallet() {
  try {
    if (!window.ethereum) {
      // toast.error('Please install Metamask to have full access to the dApp');
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
}

async function FetchContract(signerOrprovider) {
  new ethers.Contract(BlockTubeABI, BlockTubeCA, signerOrprovider);
}

export async function connectingwithContract() {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = FetchContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
}
