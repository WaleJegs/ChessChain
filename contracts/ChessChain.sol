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
        bool wager;
        uint wv;
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
        player.wager = false;
        player.wv = 0;
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
    function newGame(address opponent, uint w) public payable {
        var plyr1 = playersInfo[msg.sender];
        var plyr2 = playersInfo[opponent];
        plyr1.games.push(opponent);
        if (w == 1) {
            plyr1.wager = true;
            var fifth = msg.value / 5;
            plyr1.wv = fifth * 4;
        }
        plyr2.games.push(msg.sender);
    }

      //wager confirmation
    function confirmWager(address opponent) public payable {
        var opp = playersInfo[opponent];
        var fifth = msg.value / 5;
        var wager = fifth * 4;
        require(opp.wager == true);
        require(wager >= opp.wv);
        playersInfo[msg.sender].wv = wager;
        playersInfo[msg.sender].wager = true;
    }

    // only the master of the chesschain can peform function with this modifier
    modifier masterful() {
        require(msg.sender == master);
        _;
    }

    function getPlayerInfo(address player, uint8 prop) public view returns(uint) {
        if (prop == 0) {
            return playersInfo[player].rank;
        } else if (prop == 1) {
            return playersInfo[player].wv;
        } else if (prop == 2) {
            return playersInfo[player].wins;
        } else if (prop == 3) {
            return playersInfo[player].losses;
        }
    }

    function payWinner(address winner, address loser) private {
        var payout = playersInfo[winner].wv + playersInfo[loser].wv;
        winner.transfer(payout);
        playersInfo[winner].wager = false;
        playersInfo[winner].wv = 0;
        playersInfo[loser].wager = false;
        playersInfo[loser].wv = 0;
    }

    // true or false is entered into winner and losers struct at the end of each game
    // rating change based on elo scheme calculated off the blockchain to save gas
      function endGame(address winner, address loser, uint rd1, uint rd2) public masterful returns (uint) {
        var won = playersInfo[winner];
        var lost = playersInfo[loser];
        won.outcomes.push(true);
        won.wins += 1;
        lost.outcomes.push(false);
        lost.losses += 1;
        won.rank += rd1;
        lost.rank -= rd2;
        if (won.wager && lost.wager) {
            payWinner(winner, loser);
        }
        return won.rank;
    }
}
