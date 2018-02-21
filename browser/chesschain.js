import web3 from './web3';

const address = '0x1b79435d096f5f0bcb919958adf633a0b1ef9e52';
const abi = [{
        constant: false,
        inputs: [{ name: 'opponent', type: 'address' }],
        name: 'confirmWager',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            { name: 'opponent', type: 'address' },
            { name: 'w', type: 'uint256' }
        ],
        name: 'newGame',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            { name: 'player', type: 'address' },
            { name: 'prop', type: 'uint8' }
        ],
        name: 'getPlayerInfo',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            { name: 'winner', type: 'address' },
            { name: 'loser', type: 'address' },
            { name: 'rd1', type: 'uint256' },
            { name: 'rd2', type: 'uint256' }
        ],
        name: 'endGame',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: '_name', type: 'string' }],
        name: 'newPlayer',
        outputs: [{ name: '', type: 'uint256' }],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'master',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ name: '', type: 'uint256' }],
        name: 'players',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
    }
];

export default new web3.eth.Contract(abi, address);