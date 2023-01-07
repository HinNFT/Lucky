// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";


contract LuckyNFT is ERC721URIStorage, Ownable, ERC721Royalty{
 
    IERC20 public payToken;
    uint public tokenCount;
    uint public tokenSupply;
    uint public mintPrice;
    uint public maxMintAmount;
    address public royaltyAddr;
    address public fundsAddr;


    constructor(address _payToken) ERC721("LUCKY", "LUCKY") {
        tokenCount = 0;
        tokenSupply = 10000;
        payToken = IERC20(_payToken);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "";
    }

    // The following functions are overrides required by Solidity.

       function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function _burn(uint256 tokenId) internal override(ERC721URIStorage, ERC721Royalty) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Royalty)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _feeDenominator() internal pure virtual override returns (uint96) {
        return 100;
    }

    function setRoyalty(uint96 _royaltyPercent) public onlyOwner {
        _setDefaultRoyalty(royaltyAddr, _royaltyPercent);
    }
    
    function setAccounts(address _royaltyAddr, address _fundsAddr) public onlyOwner {
        royaltyAddr = _royaltyAddr;
        fundsAddr = _fundsAddr;
    }

    function setPrice(uint _price) public onlyOwner {
        mintPrice = _price;
    }

    function setMaxMintAmount(uint _amount) public onlyOwner {
        maxMintAmount = _amount;
    }

      function mint(address _to, uint _mintAmount) public payable {
        require (_mintAmount <= 4, "only 4 allowed to mint at once!");
        require (tokenCount + _mintAmount <= tokenSupply, "not enough supply left");

         for (uint256 i = 1; i <= _mintAmount; i++) {
                payToken.transferFrom(msg.sender, fundsAddr, mintPrice);
                tokenCount++;
                _safeMint(_to, tokenCount);
                string memory _tokenURI = string(abi.encodePacked('https://susanoo.mypinata.cloud/ipfs/QmPnVcAvecgdbV5nSyQoQb3T1u1xsvrFWPmZyEK2Xuc3TY/', Strings.toString(tokenCount), '.json'));
                _setTokenURI(tokenCount, _tokenURI);
            }
        }        
        
    }
