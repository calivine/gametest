// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ToonManagement.sol';
import './SafeMath.sol';

contract ToonBattle is ToonManagement {

    using SafeMath for uint;

    function challenge(address target) public {
        require(ownerToonCount[msg.sender] > 0);
        require(toons[msg.sender].aggressive && toons[target].aggressive);

        _fight(msg.sender, target);
    }

    function _fight(address _challenger, address _opponent) private {
        Toon storage challenger = toons[_challenger];
        Toon storage opponent = toons[_opponent];

        if (challenger.strength > opponent.strength) {
            challenger.wins = challenger.wins.add(1);
            opponent.losses = opponent.losses.add(1);
        }
        else {
            challenger.losses = challenger.losses.add(1);
            opponent.wins = opponent.wins.add(1);
        }


    }

    function contractAddress() public view returns (address) {
        return address(this);
    }
}
