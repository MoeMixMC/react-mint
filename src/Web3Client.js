// import NFTContractBuild from 'contracts/NFT.json';
import Web3 from 'web3'
import axios from 'axios'
import 'dotenv/config'

//const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
const NFT_CONTRACT_ADDRESS = '0xf8D4fEf9af82De6E57F6aABAFd49ff9730242d75'

let selectedAccount;

// let nftContract;
let nftContract;

let isInitialized = false;
let provider = window.ethereum;
let web3

export const init = async () => {

	if (typeof provider !== 'undefined') {
		provider
			.request({ method: 'eth_requestAccounts' })
			.then((accounts) => {
				selectedAccount = accounts[0];
				console.log(`Selected account is ${selectedAccount}`);
			})
			.catch((err) => {
				console.log(err);
				return;
			});

		window.ethereum.on('accountsChanged', function (accounts) {
			selectedAccount = accounts[0];
			console.log(`Selected account changed to ${selectedAccount}`);
		});
	}

	web3 = new Web3(provider);

	//const networkId = await web3.eth.net.getId();

	// nftContract = new web3.eth.Contract(
	// 	NFTContractBuild.abi,
	// 	NFTContractBuild.networks[networkId].address
	// );

	 /* const abi = [
		{
			constant: true,
			inputs: [
				{
					name: '_owner',
					type: 'address'
				}
			],
			name: 'balanceOf',
			outputs: [
				{
					name: 'balance',
					type: 'uint256'
				}
			],
			payable: false,
			stateMutability: 'view',
			type: 'function'
		}
	];  */

    let response = await axios.get('https://api.etherscan.io/api?module=contract&action=getabi&address=' + NFT_CONTRACT_ADDRESS + '&apikey=9SQVDEWPVU54IQW67IFQCNVG87H5EBTXJT');
    let data = response.data

    // create the smart contract JSON ABI
    let abi = data.result;
    console.log('ABI created')

	nftContract = new web3.eth.Contract(
		JSON.parse(abi),
		// Dai contract on Rinkeby
		NFT_CONTRACT_ADDRESS
	);

	isInitialized = true;
};

export const getMaxSupply = async () => {
	if (!isInitialized) {
		await init();
	}

	return nftContract.methods
		.maxSupply()
		.call()
};

export const getBalance = async () => {
    if (!isInitialized) {
		await init();
	}

    let number = await web3.eth.getBalance(selectedAccount)
    console.log(web3.utils.fromWei(`${number}`, 'ether'))
    return web3.utils.fromWei(`${number}`, 'ether')
}

export const mintTokens = async () => {
    if (!isInitialized) {
		await init();
	}

    return nftContract.methods
		.mint()
		.send()
}

// export const mintToken = async () => {
// 	if (!isInitialized) {
// 		await init();
// 	}

// 	return nftContract.methods
// 		.mint(selectedAccount)
// 		.send({ from: selectedAccount });
// };