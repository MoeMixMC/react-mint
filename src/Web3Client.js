// import NFTContractBuild from 'contracts/NFT.json';
import Web3 from 'web3'
import axios from 'axios'
import 'dotenv/config'

//const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
let NFT_CONTRACT_ADDRESS

let selectedAccount;

// let nftContract;
let nftContract;
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

};

export const getDetails = async (nftAddress) => {

	let methodArray = [];

	NFT_CONTRACT_ADDRESS = nftAddress
	let response = await axios.get('https://api.etherscan.io/api?module=contract&action=getabi&address=' + NFT_CONTRACT_ADDRESS + '&apikey=9SQVDEWPVU54IQW67IFQCNVG87H5EBTXJT');
	let data = response.data

	// create the smart contract JSON ABI
	let abi_r = data.result;
	let abi = JSON.parse(abi_r);
	console.log('ABI created')

	nftContract = new web3.eth.Contract(
		abi,
		// Dai contract on Rinkeby
		NFT_CONTRACT_ADDRESS
	);
	console.log(abi)

	for (let item of abi) {
		if (item.name) {
			methodArray.push(item)
			//console.log(item);
		}
	}
	//console.log(methodArray)
	return methodArray
};

export const getBalance = async () => {

	let number = await web3.eth.getBalance(selectedAccount)
	console.log(web3.utils.fromWei(`${number}`, 'ether'))
	return web3.utils.fromWei(`${number}`, 'ether')
}

export const call = async (sig, params) => {

	if (params.length == 0)
		return await nftContract.methods[sig]().call()

	return await nftContract.methods[sig](...params).call()
}

export const getGasEstimate = async (sig, params) => {
	return await nftContract.methods[sig](...params).estimateGas({ from: selectedAccount })
}

export const write = async (sig, params, gasAmount) => {

	console.log(web3.utils.fromWei(`${gasAmount}`, 'ether'))
	return await nftContract.methods[sig](...params).send({
		from: selectedAccount,
		gas: gasAmount,
		gasPrice: 250
	})
}

// export const mintToken = async () => {
// 	if (!isInitialized) {
// 		await init();
// 	}

// 	return nftContract.methods
// 		.mint(selectedAccount)
// 		.send({ from: selectedAccount });
// };