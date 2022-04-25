import {getDetails, mint} from '../Web3Client'
import {useState} from 'react'
import { Dropdown, Option } from './Dropdown'
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
    var detailsOutput = detailsKeys.map(item => (<Option key={item} value={item}/>))
    var detailsBr = detailsKeys.map(item => (<><Option key={item} value={Array.from(item.name)}/><br /></>))
    // key={item}
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
                
                <div className='Methods'>
                    <Dropdown 
                        formLabel='Choose a service'
                        buttonText='Send form'
                        action="/"
                    >
                    
                    <Option value="Choose a method" />
                    {detailsOutput}

                    </Dropdown>
                    {detailsBr}
                </div>
            </div>

            <div className='MintingButton'>
                <button onClick={() => mintTokens()}>Mint</button>
            </div>
        </div>
    )
}

export default MintingForm