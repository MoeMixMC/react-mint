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
    <div>
      <p> Your Balance is {balance} ETH </p>
      <button onClick={() => fetchBalance()}>Refresh Balance</button>
    </div>
  );
}

export default WalletBalance;
