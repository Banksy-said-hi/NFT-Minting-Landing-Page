import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {ethers} from "ethers";

function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState("Wallet not connected");
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const handleMint = () => {
    console.log("An NFT token is going to be minted!");
  }

  const connectWalletHandler = () => {
    if (window.ethereum) {
        window.ethereum.request({method: "eth_requestAccounts"})
        .then(result => {
            accountChangedHandler(result[0]);
        })
    } else {
        setErrorMessage("Please install Metamask Please :)");
    }
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  }

  const getUserBalance = (address) => {
      window.ethereum.request({method: "eth_getBalance", params: [address, "latest"]})
      .then(balance => {
          setUserBalance(ethers.utils.formatEther(balance, "ETH"));
      })
  }

  const chainChangedHandler = () => {
    window.location.reload(); 
  }

  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);


  return (
    <div className="App">

      <header className="App-header">
        <h1>JugJug</h1>
        <h2>Sina</h2>
        <h3>{errorMessage}</h3>
        <h3>{defaultAccount}</h3>
      </header>
      <h3>{userBalance}</h3>

      <button onClick={handleMint}>Mint</button>
      <button onClick={connectWalletHandler}>{connButtonText}</button>

    </div>
  );
}

export default App;
