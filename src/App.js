import React, { useState } from 'react'
import { getBalance, init } from './Web3Client'

function App() {

  const [balance, setBalance] = useState(0)

  const fetchBalance = () => {
    getBalance().then(balance => {
      setBalance(balance)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="App">
      <p> Your Balance is {balance} ETH </p>
      <button onClick={() => fetchBalance()}>Refresh Balance</button>

      <input className='nft_contract_address' type='text'></input>
      
      
      
    </div>
  );
}

export default App;
