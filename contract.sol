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
        uint[] clans;
    }

    // team struct, each player will be assigned to a team
    struct Team {
        string element;
        string color;
        uint bases;
        uint players;
    }

    struct Clan {
        uint number;
        address[] heads;
    }

    // mapping for players and teams so that you can access information for functions
    //arrays that are used for storing the keys in the mappings
    mapping(address => Player) players;
    address[] public playerAccts;
    mapping(string => Team) teams;

    mapping(uint => Clan) clans;
    uint clan_c = 0;

    // creates player and stores into iterable mapping with string as key and struct as variable
    function newPlayer(address _addr, string _name, uint _points, string _team) internal {
        var player = players[_addr];
        player.name = _name;
        player.points = _points;
        player.team = _team;
        player.rank = 1;
        playersCount += 1;
        playerAccts.push(_addr);
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
    // transfer of ETH from one player to another
    function challengeFlag(address pred, address prey) internal {
        if (players[pred].points > players[prey].points) {
            uint diff = (players[pred].points - players[prey].points) / 10;
            uint value = balanceOf[prey] * diff/100;
            players[prey].points -= 5;
            players[pred].points += 5;
            balanceOf[prey] -= value;
            balanceOf[pred] += value;
            for (uint i = 0; i < players[pred].clans.length; i ++){
                for (uint j = 0; j < 3; j ++){
                    if (clans[players[pred].clans[i]].heads[j] != pred){
                        players[clans[players[pred].clans[i]].heads[j]].points += 5;
                    }
                }
            }
        }
    }

    function createClan(address one, address two, address three) internal {
        var cl = clans[clan_c].heads;
        cl[0] = one;
        cl[1] = two;
        cl[2] = three;
    }


}
