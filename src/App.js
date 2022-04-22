import React, { useEffect, useState } from 'react'
import { getBalance, getMaxSupply, init, mint } from './Web3Client'

function App() {

  const [balance, setBalance] = useState(0)
  const [maxSupply, setMaxSupply] = useState(0)

  useEffect(() => {
    init()
  }, [])

  const fetchBalance = () => {
    getBalance().then(balance => {
      setBalance(balance)
    }).catch(err => {
      console.log(err)
    })
  }

  const fetchMaxSupply = () => {
    getMaxSupply().then(maxSupply => {
      setMaxSupply(maxSupply)
    }).catch(err => {
      console.log(err)
    })
  }

  const mintTokens = () => {
    mint().then()
  }

  return (
    <div className="App">
      <p> Your Balance is {balance} ETH </p>
      <button onClick={() => fetchBalance()}>Refresh Balance</button>

      <div>
        <input className='nft_contract_address' type='text'></input>
        <button onClick={() => fetchMaxSupply()}>Get Max Supply</button> <p>Max Supply: {maxSupply}</p>
      </div>

      <div>
        <input className='param1' type='text'></input>
        <button onClick={() => mintTokens()}>Mint</button>
      </div>
      
      
      
    </div>
  );
}

export default App;
