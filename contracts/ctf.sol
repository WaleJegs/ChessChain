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

    function addPoints(int increase) public returns (int newPoints) {
        points += increase;
        return points;
    }

}

