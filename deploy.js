const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'relax round horn blame away autumn cruel balance insect city letter unhappy',
    'https://rinkeby.infura.io/w6ukAhmhEmjsBjr1oE4Q'
);

const web3 = new Web3(provider);