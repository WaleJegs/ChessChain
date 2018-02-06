pragma solidity ^0.4.17;

contract ChessChain {
    address public master;
    address[] public players;
    uint playersCount = 0;

     // one account to control the dissemination of funds to winners
    function ChessChain() public {
        master = msg.sender;
    }
}
