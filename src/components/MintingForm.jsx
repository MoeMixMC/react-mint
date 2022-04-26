import {getDetails, call, write, getGasEstimate} from '../Web3Client'
import {useState} from 'react'
import { Dropdown, Option } from './Dropdown'

function MintingForm() {

    const [appResult, setAppResult] = useState('')
    const [functionParams, setFunctionParams] = useState([])
    const [selectedMethod, setSelectedMethod] = useState("")
    const [details, setDetails] = useState(0)
    const [nftAddress, setNFTAddress] = useState('0x')
    
    const callFunction = () => {
        // make sure selectedMethod and functionParams are not default
        if(!(functionParams.length == 0 && selectedMethod == "")){
            console.log(selectedMethod)
            console.log(functionParams)
            call(selectedMethod.signature, functionParams).then(result => {
                setAppResult(result)
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })   
        }else{
            alert('Please input an NFT contract address and select a function')
        }
    }

    const writeFunction = () => {
        // make sure selectedMethod and functionParams are not default
        if(!(functionParams.length == 0 && selectedMethod == "")){
            getGasEstimate(selectedMethod.signature, functionParams).then(gasAmount => {
                write(selectedMethod.signature, functionParams, gasAmount).then(result => {
                    setAppResult(result)
                    console.log(result)
                })
                .catch(err => {
                    console.log('SENDING ERROR')
                    console.log(err)
                })
            })
            .catch(err => {
                console.log('ESTIMATE GAS ERROR')
                console.log(err)
            })
        }else {
            alert('Please input an NFT contract address and select a function')
        }
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
        for(item of contractAbi){
            if (item.name == e.target.value){
                setSelectedMethod(item)
                setFunctionParams([])
                setAppResult('')
            }
        }
    }
    
    let contractAbi = Array.from(details)
    let contractMethods = contractAbi.map(item => (<Option key={item.signature} value={item}/>))
    let methodParams = selectedMethod != 0 ? Array.from(selectedMethod.inputs).map((item, index) => (<input id={item.name} key={item.name} onInput={(e) => 
        {
            let tempParams = functionParams
            tempParams[index] = e.target.value
            setFunctionParams(tempParams)
        }
    } placeholder={item.name + ' (' + item.type + ')'}/>)) : []
    return (
        <div className="MintingForm">
            <div className='NFTInfo'>
                <div>
                    <input onInput= {e => setNFTAddress(e.target.value)} className='nft_contract_address' type='text' />
                    <button onClick={() => fetchDetails(nftAddress)}>Retrieve</button>
                </div>
                
                <div className='Methods'>

                    <Dropdown
                        formLabel='Choose a function'
                        buttonText='Send form'
                        onChange={handleChange}
                    >
                        {contractMethods}

                    </Dropdown> 
                    
                    <p>You selected {selectedMethod.name}</p>
                </div>
            </div>

            <div>
                {methodParams}
            </div>

            <div className='MintingButton'>
                <button type="button" className="btn btn-success btn-call" onClick={() => callFunction()}>Call</button>
                <button type="button" className="btn btn-success btn-write" onClick={() => writeFunction()}>Write</button>
            </div>
            <div>{appResult}</div>
        </div>
    )
}

export default MintingForm