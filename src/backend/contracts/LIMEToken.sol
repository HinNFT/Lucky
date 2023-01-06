// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LIMEToken is ERC20 {
    constructor(uint256 totalSupply) ERC20("LIMEToken", "$LIME") {
        _mint(msg.sender, totalSupply);
    }
}