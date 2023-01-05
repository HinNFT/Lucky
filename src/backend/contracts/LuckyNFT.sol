// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LuckyNFT is ERC721 {

    uint public tokenCount;
    uint public tokenSupply = 100;

    constructor() ERC721("Lucky", "LUCKY") {}

    function _mint(address _minter) public returns(uint) {
        tokenCount++;
        require(tokenCount <= tokenSupply, "supply minted out!");
        _safeMint(_minter, tokenCount); 
        return tokenCount;
    }



}