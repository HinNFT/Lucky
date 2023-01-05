// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import './LuckyNFT.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LUCKY is Ownable, ReentrancyGuard, LuckyNFT {

	LuckyNFT public nft;
	address payable admin;
	uint16 referralRate;


	constructor(LuckyNFT _nft, uint16 _referralRate) {
		nft = _nft;
		referralRate = _referralRate;
		admin = payable(msg.sender);		
	}

    struct User {
	    bool hasReceivedReferralNFT;
	    uint256 referredPurchaseCount;
		uint256 commsBalance;
		address[] referredUsers;
    }

   event ReferPurchased(
	   	address indexed referrer, 
	   	address indexed referral
   	);

   event Withdrawal(
	   	address indexed referrer, 
	   	uint amount
   	);

	mapping (address => User) public users;

	
	function mintReferralNFT(address _user) public {
	  User storage user = users[_user];
	  // Check if the referral has already received an NFT
	  require(!user.hasReceivedReferralNFT, "already minted");	  
	  // Mint the NFT and set the user's hasReceivedReferralNFT flag to true
	  user.hasReceivedReferralNFT = true;
	  nft._mint(admin);
	}

	function purchaseItem(address referrer) payable public {
		uint commission = msg.value * referralRate / 100; 
	    // retrieve the referrer's referral info
	    User storage user = users[referrer];
	    // increment the referrer's referral count
	    user.commsBalance += commission;
	    user.referredPurchaseCount++;
	    user.referredUsers.push(msg.sender);
	    emit ReferPurchased(referrer, msg.sender);
	  }
	

    function withdraw(address referrer) payable public nonReentrant {
    	address payable _user = payable(referrer);
    	User storage user = users[referrer];
    	uint _amount = user.commsBalance;
    	require(user.hasReceivedReferralNFT, "user did not mint nft");
        require(_amount > 0, "no balance to withdraw");
        _user.transfer(user.commsBalance);
        user.commsBalance = 0;
        emit Withdrawal(referrer, _amount);   	
    }
	

}