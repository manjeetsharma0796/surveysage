document.addEventListener('DOMContentLoaded', function () {
    const createPollForm = document.getElementById('create-poll-form');
    const pollOptionsContainer = document.getElementById('poll-options-container');
    const addOptionButton = document.getElementById('add-option-button');
    const successMessage = document.getElementById('success-message');

    addOptionButton.addEventListener('click', () => {
        const optionInput = document.createElement('input');
        optionInput.type = 'text';
        optionInput.className = 'poll-option-input';
        optionInput.placeholder = 'Poll Option';
        optionInput.required = true;
        pollOptionsContainer.appendChild(optionInput);
    });

    createPollForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Collect poll data
        const pollQuestion = document.getElementById('poll-question').value;
        const pollOptions = Array.from(document.querySelectorAll('.poll-option-input')).map(input => input.value);

        // Create poll (example logic, replace with your own backend call)
        console.log('Poll Question:', pollQuestion);
        console.log('Poll Options:', pollOptions);
        transfer();
        // Show success message
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);

        // Reset form
        createPollForm.reset();
        pollOptionsContainer.innerHTML = '';
        const initialOptionInput = document.createElement('input');
        initialOptionInput.type = 'text';
        initialOptionInput.className = 'poll-option-input';
        initialOptionInput.placeholder = 'Poll Option';
        initialOptionInput.required = true;
        pollOptionsContainer.appendChild(initialOptionInput);
    });
});


const transfer = async () => {

    const abi = Token.abi;
    const charge = 1;
    console.log(charge, "=========deposit=========");
    const contractAddress = "0xfd34179CCa56e3BA2D43dd57a26C9766D76E6Ae1"
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const bounceContract = new ethers.Contract(contractAddress, abi, signer)
    try {
        await (await bounceContract.transfer("0xe1b3df92a983bD27c4798867A1F425B3fA7c71a8", ethers.utils.parseUnits(charge.toString(), 18))).wait();

    } catch (error) {
        alert(error.message.split('[')[0] + '\n');
        console.error(error)
    }
}

const Token = {
    "_format": "hh-sol-artifact-1",
    "contractName": "SurveySage",
    "sourceName": "contracts/SurveySage.sol",
    "abi": [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "allowance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "needed",
                    "type": "uint256"
                }
            ],
            "name": "ERC20InsufficientAllowance",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "needed",
                    "type": "uint256"
                }
            ],
            "name": "ERC20InsufficientBalance",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "approver",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidApprover",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidReceiver",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidSender",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidSpender",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
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
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
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
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
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
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
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
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
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
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    "bytecode": "0x608060405234801561001057600080fd5b50336040518060400160405280601081526020016f29aaa92b22aca9a0a3a2902a27a5a2a760811b815250604051806040016040528060048152602001635341474560e01b815250816003908161006791906101a7565b50600461007482826101a7565b5050506001600160a01b0381166100a557604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6100ae816100b4565b50610266565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061013057607f821691505b60208210810361015057634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156101a2576000816000526020600020601f850160051c8101602086101561017f5750805b601f850160051c820191505b8181101561019e5782815560010161018b565b5050505b505050565b81516001600160401b038111156101c0576101c0610106565b6101d4816101ce845461011c565b84610156565b602080601f83116001811461020957600084156101f15750858301515b600019600386901b1c1916600185901b17855561019e565b600085815260208120601f198616915b8281101561023857888601518255948401946001909101908401610219565b50858210156102565787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6108cd80620002766000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806370a082311161008c57806395d89b411161006657806395d89b41146101aa578063a9059cbb146101b2578063dd62ed3e146101c5578063f2fde38b146101fe57600080fd5b806370a082311461015e578063715018a6146101875780638da5cb5b1461018f57600080fd5b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461011557806323b872dd14610127578063313ce5671461013a57806340c10f1914610149575b600080fd5b6100dc610211565b6040516100e99190610716565b60405180910390f35b610105610100366004610781565b6102a3565b60405190151581526020016100e9565b6002545b6040519081526020016100e9565b6101056101353660046107ab565b6102bd565b604051601281526020016100e9565b61015c610157366004610781565b6102e1565b005b61011961016c3660046107e7565b6001600160a01b031660009081526020819052604090205490565b61015c6102f7565b6005546040516001600160a01b0390911681526020016100e9565b6100dc61030b565b6101056101c0366004610781565b61031a565b6101196101d3366004610809565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b61015c61020c3660046107e7565b610330565b6060600380546102209061083c565b80601f016020809104026020016040519081016040528092919081815260200182805461024c9061083c565b80156102995780601f1061026e57610100808354040283529160200191610299565b820191906000526020600020905b81548152906001019060200180831161027c57829003601f168201915b5050505050905090565b6000336102b1818585610373565b60019150505b92915050565b6000336102cb858285610385565b6102d6858585610403565b506001949350505050565b6102e9610462565b6102f3828261048f565b5050565b6102ff610462565b61030960006104c5565b565b6060600480546102209061083c565b6000610327338484610403565b50600192915050565b610338610462565b6001600160a01b03811661036757604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b610370816104c5565b50565b6103808383836001610517565b505050565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146103fd57818110156103ee57604051637dc7a0d960e11b81526001600160a01b0384166004820152602481018290526044810183905260640161035e565b6103fd84848484036000610517565b50505050565b6001600160a01b03831661042d57604051634b637e8f60e11b81526000600482015260240161035e565b6001600160a01b0382166104575760405163ec442f0560e01b81526000600482015260240161035e565b6103808383836105ec565b6005546001600160a01b031633146103095760405163118cdaa760e01b815233600482015260240161035e565b6001600160a01b0382166104b95760405163ec442f0560e01b81526000600482015260240161035e565b6102f3600083836105ec565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0384166105415760405163e602df0560e01b81526000600482015260240161035e565b6001600160a01b03831661056b57604051634a1406b160e11b81526000600482015260240161035e565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156103fd57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516105de91815260200190565b60405180910390a350505050565b6001600160a01b03831661061757806002600082825461060c9190610876565b909155506106899050565b6001600160a01b0383166000908152602081905260409020548181101561066a5760405163391434e360e21b81526001600160a01b0385166004820152602481018290526044810183905260640161035e565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166106a5576002805482900390556106c4565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161070991815260200190565b60405180910390a3505050565b60006020808352835180602085015260005b8181101561074457858101830151858201604001528201610728565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461077c57600080fd5b919050565b6000806040838503121561079457600080fd5b61079d83610765565b946020939093013593505050565b6000806000606084860312156107c057600080fd5b6107c984610765565b92506107d760208501610765565b9150604084013590509250925092565b6000602082840312156107f957600080fd5b61080282610765565b9392505050565b6000806040838503121561081c57600080fd5b61082583610765565b915061083360208401610765565b90509250929050565b600181811c9082168061085057607f821691505b60208210810361087057634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156102b757634e487b7160e01b600052601160045260246000fdfea2646970667358221220400098ed2f6d1c4199d1d5521df8593a25c945a44c3867afbd73bcbe9c39ad7364736f6c63430008180033",
    "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100cf5760003560e01c806370a082311161008c57806395d89b411161006657806395d89b41146101aa578063a9059cbb146101b2578063dd62ed3e146101c5578063f2fde38b146101fe57600080fd5b806370a082311461015e578063715018a6146101875780638da5cb5b1461018f57600080fd5b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461011557806323b872dd14610127578063313ce5671461013a57806340c10f1914610149575b600080fd5b6100dc610211565b6040516100e99190610716565b60405180910390f35b610105610100366004610781565b6102a3565b60405190151581526020016100e9565b6002545b6040519081526020016100e9565b6101056101353660046107ab565b6102bd565b604051601281526020016100e9565b61015c610157366004610781565b6102e1565b005b61011961016c3660046107e7565b6001600160a01b031660009081526020819052604090205490565b61015c6102f7565b6005546040516001600160a01b0390911681526020016100e9565b6100dc61030b565b6101056101c0366004610781565b61031a565b6101196101d3366004610809565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b61015c61020c3660046107e7565b610330565b6060600380546102209061083c565b80601f016020809104026020016040519081016040528092919081815260200182805461024c9061083c565b80156102995780601f1061026e57610100808354040283529160200191610299565b820191906000526020600020905b81548152906001019060200180831161027c57829003601f168201915b5050505050905090565b6000336102b1818585610373565b60019150505b92915050565b6000336102cb858285610385565b6102d6858585610403565b506001949350505050565b6102e9610462565b6102f3828261048f565b5050565b6102ff610462565b61030960006104c5565b565b6060600480546102209061083c565b6000610327338484610403565b50600192915050565b610338610462565b6001600160a01b03811661036757604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b610370816104c5565b50565b6103808383836001610517565b505050565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146103fd57818110156103ee57604051637dc7a0d960e11b81526001600160a01b0384166004820152602481018290526044810183905260640161035e565b6103fd84848484036000610517565b50505050565b6001600160a01b03831661042d57604051634b637e8f60e11b81526000600482015260240161035e565b6001600160a01b0382166104575760405163ec442f0560e01b81526000600482015260240161035e565b6103808383836105ec565b6005546001600160a01b031633146103095760405163118cdaa760e01b815233600482015260240161035e565b6001600160a01b0382166104b95760405163ec442f0560e01b81526000600482015260240161035e565b6102f3600083836105ec565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0384166105415760405163e602df0560e01b81526000600482015260240161035e565b6001600160a01b03831661056b57604051634a1406b160e11b81526000600482015260240161035e565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156103fd57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516105de91815260200190565b60405180910390a350505050565b6001600160a01b03831661061757806002600082825461060c9190610876565b909155506106899050565b6001600160a01b0383166000908152602081905260409020548181101561066a5760405163391434e360e21b81526001600160a01b0385166004820152602481018290526044810183905260640161035e565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166106a5576002805482900390556106c4565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161070991815260200190565b60405180910390a3505050565b60006020808352835180602085015260005b8181101561074457858101830151858201604001528201610728565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461077c57600080fd5b919050565b6000806040838503121561079457600080fd5b61079d83610765565b946020939093013593505050565b6000806000606084860312156107c057600080fd5b6107c984610765565b92506107d760208501610765565b9150604084013590509250925092565b6000602082840312156107f957600080fd5b61080282610765565b9392505050565b6000806040838503121561081c57600080fd5b61082583610765565b915061083360208401610765565b90509250929050565b600181811c9082168061085057607f821691505b60208210810361087057634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156102b757634e487b7160e01b600052601160045260246000fdfea2646970667358221220400098ed2f6d1c4199d1d5521df8593a25c945a44c3867afbd73bcbe9c39ad7364736f6c63430008180033",
    "linkReferences": {},
    "deployedLinkReferences": {}
}
