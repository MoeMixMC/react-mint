import React, { useEffect } from 'react'
import { init } from './Web3Client'
import WalletBalance from './components/WalletBalance'
import MintingForm from './components/MintingForm'
import './App.css'

function App() {

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="App">

      <div className="AppContainer">
        <MintingForm />
        <WalletBalance />
      </div>

    </div>
    
  );
}

export default App;
