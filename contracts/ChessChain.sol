pragma solidity ^0.4.17;

contract ChessChain {
    address public master;
    address[] public players;
    uint playersCount = 0;

    struct Player {
        uint id;
        uint wins;
        uint losses;
        uint rank;
        string username;
        address[] games;
        bool[] outcomes;
    }

    mapping(address => Player) playersInfo;

    // one account to control the dissemination of funds to winners
    function ChessChain() public {
        master = msg.sender;
    }

    // creates a new player and stores player data in mapping
    // ranking is based on the amount of ether submitted
    function newPlayer (string _name) public payable returns (uint) {
        var player = playersInfo[msg.sender];
        player.id = playersCount;
        player.username = _name;
        player.wins = 0;
        player.losses = 0;
        if (msg.value > .25 ether) {
            player.rank = 1500;
        }
        else if (msg.value > .2 ether){
            player.rank = 1400;
        }
        else if (msg.value > .15 ether){
            player.rank = 1300;
        }
        else if (msg.value > .1 ether){
            player.rank = 1200;
        } else {
            player.rank = 1100;
        }
        players.push(msg.sender);
        playersCount += 1;
        return player.rank;
    }

    // places opponents address in each players struct to keep track of games
    function newGame(address opponent) public {
        playersInfo[msg.sender].games.push(opponent);
        playersInfo[opponent].games.push(msg.sender);
    }

    // only the master of the chesschain can peform function with this modifier
    modifier masterful() {
        require(msg.sender == master);
        _;
    }

    // true or false is entered into winner and losers struct at the end of each game
    // rating change based on elo scheme calculated off the blockchain to save gas
      function endGame(address winner, address loser, uint rd1, uint rd2) public masterful returns (uint) {
        var won = playersInfo[winner];
        var lost = playersInfo[loser];
        won.outcomes.push(true);
        lost.outcomes.push(false);
        won.rank += rd1;
        lost.rank -= rd2;
        return won.rank;
    }



}
