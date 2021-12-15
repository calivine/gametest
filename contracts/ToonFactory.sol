// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ToonFactory {

    uint internal _totalToons;

    event ToonCreated(uint dna);

    struct Toon {
        uint strength;
        bytes name;
        uint dna;
        uint level;
        bool aggressive;
        uint wins;
        uint losses;
        
    }

    mapping(bytes => address) internal toonToOwner;
    mapping(address => uint) internal ownerToonCount;
    mapping(address => Toon) internal toons;

    constructor () {
        _totalToons = 0;
    }

    function createRandomToon(string memory _name) public {
        require(ownerToonCount[msg.sender] == 0);
        _createToon(bytes(_name), _generateRandomDna(_name));
    }

    function _createToon(
        bytes memory _name,
        uint _dna
    ) internal {
        Toon memory t = Toon(10, _name, _dna, 1, false, 0, 0);
        _totalToons++;

        toons[msg.sender] = t;
        toonToOwner[_name] = msg.sender;
        ownerToonCount[msg.sender]++;
        emit ToonCreated(_dna);
    }

    function _generateRandomDna(string memory _str) private pure returns (uint) {
        return uint(keccak256(abi.encodePacked(_str))) % (10 ** 16);
    }

    function totalToons() public view returns (uint) {
        return _totalToons;
    }



}
