const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const provider = ganache.provider();
const webtre = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let ChessChain;
beforeEach(async() => {
    // get list of all accounts and use one to deploy the contract
    accounts = await webtre.eth.getAccounts();

    chesschain = await new webtre.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [] })
        .send({ from: accounts[0], gas: '1000000' })

    chesschain.setProvider(provider);
});

describe('ChessChain', () => {
    it('deploys a contract', () => {
        assert.ok(chesschain.options.address);
    });

    it('a player can be created', async() => {
        const player = await chesschain.methods.newPlayer("beginner").call();
        assert.equal(player, 1100)
    })
});