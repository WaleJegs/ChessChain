pragma solidity ^0.4.11;

contract Player {
    string public name;
    int public points;
    string public team;
    int public num;


    function Player(string _name, int _points, string _team, int _num) public {
        name = _name;
        points = _points;
        team = _team;
        num = _num;

    }

}

contract CryptoFlags {
    int public plc = 0;
    mapping(int => Player) players;

    function newPlayer(string _name, int _points, string _team) public returns (address player) {
        players[plc] = new Player(_name, _points, _team, plc);
        plc += 1;
        return players[plc - 1];
    }

}
