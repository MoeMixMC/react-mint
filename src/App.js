import React, { useEffect, useState } from 'react'
import { getMaxSupply, init, mint } from './Web3Client'
import WalletBalance from './components/WalletBalance'
import './App.css'

function App() {

  const [maxSupply, setMaxSupply] = useState(0)

  useEffect(() => {
    init()
  }, [])

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
      
      <WalletBalance />

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
