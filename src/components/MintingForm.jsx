import {getDetails, mint} from '../Web3Client'
import {useState} from 'react'
function MintingForm() {

    const [details, setDetails] = useState(0)
    const [nftAddress, setNFTAddress] = useState('0x')
    
    const mintTokens = () => {
        mint().then()
    }

    const fetchDetails = (nftAddress) => {
        getDetails(nftAddress).then(details => {
          setDetails(details)
        }).catch(err => {
          console.log(err)
        })
      }
    
    let detailsKeys = Array.from(details)
    var detailsOutput = detailsKeys.map(item => (<div><span key={item}>{item}</span><br /></div>))
    /* var detailsOutput = details.forEach(function (item, index) {
        <span>{item}</span>
      }); */
    return (
        <div className="MintingForm">
            <div className='NFTInfo'>
                <div>
                    <input onInput= {e => setNFTAddress(e.target.value)} className='nft_contract_address' type='text' />
                    <button onClick={() => fetchDetails(nftAddress)}>Retrieve</button>
                </div>
                
                <div className='Methods' style={{width:700}}>
                    {detailsOutput}
                </div>
            </div>

            <div className='MintingButton'>
                <button onClick={() => mintTokens()}>Mint</button>
            </div>
        </div>
    )
}

export default MintingForm