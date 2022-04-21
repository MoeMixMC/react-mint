import React, { useState } from 'react'
import { init, getOwnBalance } from './Web3Client'

function App() {

  const [balance, setBalance] = useState(0)

  const fetchBalance = () => {
    getOwnBalance().then(balance => {
      setBalance(balance)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="App">
      <p> Balance is {balance} </p>
      <button onClick={() => fetchBalance()}>Refresh Balance</button>
    </div>
  );
}

export default App;
