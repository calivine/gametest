// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import './ToonFactory.sol';
import './SafeMath.sol';


contract ToonManagement is ToonFactory {

    using SafeMath for uint;

    function getToon() public view returns (uint strength, string memory name, uint dna, uint level) {
        Toon memory t = toons[msg.sender];
        return (t.strength, string(t.name), t.dna, t.level);
    }

    function getToonLevel() public view returns (uint) {
        return toons[msg.sender].level;
    }

    function getToonStrength() public view returns (uint) {
        return toons[msg.sender].strength;
    }

    function getToonDna() public view returns (uint) {
        return toons[msg.sender].dna;
    }

    function getTotalToons() public view returns (uint) {
        return _totalToons;
    }

    function getWins() public view returns (uint) {
        return toons[msg.sender].wins;
    }

    function train() public payable {
        require(msg.value >= 0.00001 ether, "Training costs 0.00001 ether");
        //toons[msg.sender].level++;
        _increaseLevel(msg.sender);
        _increaseStrength(msg.sender);
    }

    function setStance() public returns (uint) {
        bool flag = toons[msg.sender].aggressive;
        toons[msg.sender].aggressive = !flag;
        return toons[msg.sender].aggressive ? 1 : 0;
    }

    function getStance() public view returns (uint) {
        // bool flag = toons[msg.sender].aggressive;
        // return flag == true ? 1 : 0;
        return toons[msg.sender].aggressive == true ? 1 : 0;
    }

    function getStanceFlag() public view returns (bool) {
        // bool flag = toons[msg.sender].aggressive;
        // return flag == true ? 1 : 0;
        return toons[msg.sender].aggressive;
    }

    function _increaseLevel(address _sender) private {
        toons[_sender].level = toons[_sender].level.add(1);
    }

    function _increaseStrength(address _sender) private {
        toons[_sender].strength = toons[_sender].strength.add(1);
    }







}
