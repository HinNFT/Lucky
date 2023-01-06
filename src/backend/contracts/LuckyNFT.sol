// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract LuckyNFT is ERC721, ERC721URIStorage, Ownable {
    
    IERC20 public payToken;
    uint public tokenCount;
    uint public tokenSupply;
    uint public mintPrice;
    uint public maxMintAmount;
    address royaltyAddr;
    address fundsAddr;


    constructor(address _payToken, address _royaltyAddr, address _fundsAddr) ERC721("LUCKY", "LUCKY") {
        tokenCount = 0;
        payToken = IERC20(_payToken);
        royaltyAddr = _royaltyAddr;
        fundsAddr = _fundsAddr;
        tokenSupply = 10000;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "";
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function setPrice(uint _price) public onlyOwner {
        mintPrice = _price;
    }

    function setMaxMintAmount(uint _amount) public onlyOwner {
        maxMintAmount = _amount;
    }

      function mint(uint _mintAmount) public payable {
        require (_mintAmount <= 4, "only 4 allowed to mint at once!");
        require (tokenCount + _mintAmount <= tokenSupply, "not enough supply left");
        require (payToken.balanceOf(msg.sender) > mintPrice * _mintAmount, "Not enough USDC in wallet to mint");
        require (payToken.allowance(msg.sender, address(this)) > mintPrice * _mintAmount, "Not enough allowance. Please approve for minting first");

         for (uint256 i = 1; i <= _mintAmount; i++) {
                payToken.transferFrom(msg.sender, fundsAddr, mintPrice);
                tokenCount++;
                _safeMint(msg.sender, tokenCount);
                string memory _tokenURI = string(abi.encodePacked('https://susanoo.mypinata.cloud/ipfs/QmPnVcAvecgdbV5nSyQoQb3T1u1xsvrFWPmZyEK2Xuc3TY/', Strings.toString(tokenCount), '.json'));
                _setTokenURI(tokenCount, _tokenURI);
            }
        }        
        
    }
