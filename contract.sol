pragma solidity ^0.4.11;

contract CryptoFlag {
    string public name;
    string public symbol;
    uint playersCount = 0;
    mapping (address => uint256) balanceOf;

    // player struct
    struct Player {
        string name;
        uint points;
        string team;
        uint rank;
        address addr;
        uint time;
    }

    // team struct, each player will be assigned to a team
    struct Team {
        string element;
        string color;
        uint bases;
        uint players;
    }

    // mapping for players and teams so that you can access information for functions
    //arrays that are used for storing the keys in the mappings
    mapping(address => Player) players;
    address[] public playerAccts;
    mapping(string => Team) teams;

    // creates player and stores into iterable mapping with string as key and struct as variable
    function newPlayer(address _addr, string _name, uint _points, string _team) internal {
        var player = players[_addr];
        player.name = _name;
        player.points = _points;
        player.team = _team;
        player.rank = 1;
        playersCount += 1;
        playerAccts.push(_addr) - 1;
        teams[_team].players += 1;
    }

    // adds players to specified teams and removes them from old team
    function joinTeam(address playerAddr, string newTeam) internal {
        var player = players[playerAddr];
        var old = teams[player.team];
        old.players -= 1;
        player.team = newTeam;
        teams[newTeam].players += 1;
    }

    // challenge for flag based on power points and proportional
    // transfer of ETH from
    function challengeFlag(address pred, address prey) internal {
        require(players[pred].points > players[prey].points);
        uint diff = (players[pred].points - players[prey].points) / 10;
        uint value = balanceOf[prey] * diff/100;
        balanceOf[prey] -= value;
        balanceOf[pred] += value;
    }


}
