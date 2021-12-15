// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

import "truffle/Assert.sol";
import "../contracts/ToonFactory.sol";

contract ToonTest {
    function testInitialToonList() public {
        ToonFactory t = new ToonFactory();

        uint expected = 0;

        Assert.equal(t.getTotalToons(), expected, "List of toons should be empty");

    }


}
