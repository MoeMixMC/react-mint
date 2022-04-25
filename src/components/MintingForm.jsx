import {getDetails, mint} from '../Web3Client'
import {useState} from 'react'
import { Dropdown, Option } from './Dropdown'
function MintingForm() {

    const [selectedMethod, setSelectedMethod] = useState("")
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
    
    const handleChange = (e) => {
        let item
        for(item of detailsKeys){
            if (item.name == e.target.value){
                setSelectedMethod(item)
            }
        }
    }
    
    let detailsKeys = Array.from(details)
    var detailsOutput = detailsKeys.map(item => (<Option key={item.signature} value={item}/>))
    var detailsBr = detailsKeys.map(item => (<><Option key={Object.create(item)} value={item}/><br /></>))
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
                    {
                        <Dropdown
                            formLabel='Choose a function'
                            buttonText='Send form'
                            onChange={handleChange}
                            action='/'
                        >
                            {detailsOutput}

                        </Dropdown> 
                    }
                    <p>You selected {selectedMethod.name}</p>
                </div>
            </div>

            <div className='MintingButton'>
                <button onClick={() => mintTokens()}>Mint</button>
            </div>
        </div>
    )
}

export default MintingForm