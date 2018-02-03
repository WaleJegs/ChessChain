const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const provider = ganache.provider();
const webtre = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let player;
beforeEach(async() => {
    // get list of all accounts and use one to deploy the contract
    accounts = await webtre.eth.getAccounts();

    player = await new webtre.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Wale', 100, "red", 1] })
        .send({ from: accounts[0], gas: '1000000' })

    player.setProvider(provider);
});

describe('player', () => {
    it('deploys a contract', () => {
        assert.ok(player.options.address);
    });

    it('the points can be increased', async() => {
        const points = await player.methods.addPoints(100).call();
        assert.equal(points, 200)
    })
});