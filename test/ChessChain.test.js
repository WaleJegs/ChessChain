const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const provider = ganache.provider();
const webtre = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let ChessChain;
let player1;
let player2;
let player3;
let player4;

beforeEach(async() => {
  // get list of all accounts and use one to deploy the contract
  accounts = await webtre.eth.getAccounts();

  chesschain = await new webtre.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode})
  .send({ from: accounts[0], gas: '1000000' })

  chesschain.setProvider(provider);

  player1 = await chesschain.methods.newPlayer("A")
    .send({
      from: accounts[1],
      value: webtre.utils.toWei('0.26', 'ether'),
      gas: '1000000'
    });

  player2 = await chesschain.methods.newPlayer("B")
    .send({
      from: accounts[2],
      value: webtre.utils.toWei('0.16', 'ether'),
      gas: '1000000'
    });

});

describe('ChessChain', () => {
  it('deploys a contract', () => {
    assert.ok(chesschain.options.address);
  });

  it('players can be created with proper ranks', async() => {
    const playerOneRank = await chesschain.methods.getPlayerInfo(accounts[1], 0).call();
    const playerTwoRank = await chesschain.methods.getPlayerInfo(accounts[2], 0).call();
    assert.equal(playerOneRank, 1500);
    assert.equal(playerTwoRank, 1300);
  });

  it('players can start a game and wager successfully', async() => {

    await chesschain.methods.newGame(accounts[2], 1)
        .send({
        from: accounts[1],
        value: webtre.utils.toWei('0.2', 'ether'),
        gas: '1000000'
        });

    await chesschain.methods.confirmWager(accounts[1])
        .send({
        from: accounts[2],
        value: webtre.utils.toWei('0.2', 'ether'),
        gas: '1000000'
        });
    const playerOneWager = await chesschain.methods.getPlayerInfo(accounts[1], 1).call();
    const playerTwoWager = await chesschain.methods.getPlayerInfo(accounts[2], 1).call();
    assert.equal(playerOneWager, '160000000000000000');
    assert.equal(playerTwoWager, '160000000000000000');
  });

});
