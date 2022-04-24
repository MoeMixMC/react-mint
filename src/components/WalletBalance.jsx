import React, { useState } from 'react'
import { getBalance } from '../Web3Client'
import '../App.css'

function WalletBalance() {

  const [balance, setBalance] = useState(0)

  const fetchBalance = () => {
        getBalance().then(balance => {
          setBalance(balance)
        }).catch(err => {
          console.log(err)
        })
      }

  return (
    <div className="WalletBalance">
      <span> Your Balance</span>
      <span>{balance} </span>
      <span>ETH</span>
      <button type="button" className="btn btn-success" onClick={() => fetchBalance()} style={{width: 100}}>Refresh</button>
    </div>
  );
}

export default WalletBalance;
