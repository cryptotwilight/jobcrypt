const iJCPaymentManagerAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_postingOwner",
				"type": "address"
			}
		],
		"name": "getPaidPostings",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_postingAddreses",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_txRef",
				"type": "uint256"
			}
		],
		"name": "getPaymentData",
		"outputs": [
			{
				"internalType": "address",
				"name": "_posting",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_product",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_erc20",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_reference",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_posting",
				"type": "address"
			}
		],
		"name": "isPaid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_paidOn",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_postingAddress",
				"type": "address"
			}
		],
		"name": "payForPosting",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_txRef",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_feature",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_posting",
				"type": "address"
			}
		],
		"name": "payForPostingFeature",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_txRef",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	}
]