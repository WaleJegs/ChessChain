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
            player.rank = 500;
        }
        else if (msg.value > .2 ether){
            player.rank = 400;
        }
        else if (msg.value > .15 ether){
            player.rank = 300;
        }
        else if (msg.value > .1 ether){
            player.rank = 200;
        } else {
            player.rank = 100;
        }
        players.push(msg.sender);
        playersCount += 1;
        return player.rank;
    }

}
