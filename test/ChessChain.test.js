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

  it('players can be created with proper ranks', async() => {
  const player1 = await chesschain.methods.newPlayer("A")
      .send({
        from: accounts[1],
        value: web3.utils.toWei('0.26', 'ether')
      });
  const player2 = await chesschain.methods.newPlayer("B")
        .send({
            from: accounts[0],
            value: web3.utils.toWei('0.16', 'ether')
        });
  assert.equal(player1, 1500);
  assert.equal(player2, 1300);
  });

  it('players can start a game and wager successfully', async() => {
    const player1 = await chesschain.methods.newPlayer("A")
            .send({
                from: accounts[1],
                value: web3.utils.toWei('0.2', 'ether')
            });

    const player2 = await chesschain.methods.newPlayer("B")
            .send({
                from: accounts[1],
                value: web3.utils.toWei('0.2', 'ether')
            });

    await chesschain.methods.newGame(accounts[0], 1)
        .send({
        from: accounts[1],
        value: web3.utils.toWei('0.2', 'ether')
        });

    await chesschain.methods.confirmWager(accounts[1])
        .send({
        from: accounts[0],
        value: web3.utils.toWei('0.2', 'ether')
        });

    assert.equal(chesschain.playersInfo[accounts[1]].wv, true);
    assert.equal(chesschain.playersInfo[accounts[0]].wv, true);
  });

});
