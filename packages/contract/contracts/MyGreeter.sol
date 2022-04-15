//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MyGreeter is Ownable {
    // Variables
    bytes32 public rootHash;
    string private greeting;

    /**
     */
    constructor() {
        // N/A
    }

    /**
     */
    function greet() public view returns (string memory) {
        return greeting;
    }

    /**
     */
    function setGreeting(string memory _greeting, bytes32[] calldata _proof) public {
        bytes32 _address = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_proof, rootHash, _address), "Invalid Proof");
        greeting = _greeting;
    }

    /**
     */
    function setRootHash(bytes32 _rootHash) public onlyOwner {
        rootHash = _rootHash;
    }
}