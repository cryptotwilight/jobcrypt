const iJCJobCryptAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_postingAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_appliedTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_applicationCount",
				"type": "uint256"
			}
		],
		"name": "JobApplied",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_postingAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_companyName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_postedTime",
				"type": "uint256"
			}
		],
		"name": "JobPosted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "feature",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_postingAddress",
				"type": "address"
			}
		],
		"name": "configureFeature",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_configured",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFeaturedJobs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_featuredJobAddresses",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getHotSearchTerms",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "_hotSearchTerms",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLatestJobs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_latestJobAddresses",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPopularJobs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_popularJobAddresses",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_jobApplicantAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_jobPostingAddress",
				"type": "address"
			}
		],
		"name": "logJobApplication",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_logged",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
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
		"name": "notifyPayment",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_recieved",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
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
		"name": "postJob",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_possted",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]