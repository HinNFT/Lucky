import { useState, useEffect} from 'react'
import Axios from 'axios'
import { ethers } from 'ethers'; 
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";

const Mint = ({nft, loginData, token, web3Handler, account}) => {

	const[amount, setAmount] = useState(0)
	const[refCode, setRefCode] = useState('')
	const price = 5

	const toWei = (num) => ethers.utils.parseEther(num.toString())




	const mint = async () => {
		web3Handler()


		if (refCode == '') {
			await nft.mint(account, amount)
		} else {
			const tx = await nft.mint(account, amount)
			tx.on((err, res) => {
            if (err) {
            window.alert(err);
    // Perform action here
  }
	   //      await Axios.post("http://localhost:3001/mintref", {
	  	// mintAmount: amount,
	  	// referralcode: refCode      
    // })
	      })
	  	
	}
}

	const approveToken = async() => {
		await token.approve(nft.address, toWei(30000))
	}


  return (
  		<div className="text-center">
  		<div className="text-center">
  			<h1> price $5 / 5 usdc </h1>
  			<h1> maximum 4 mints per tx </h1>

  		</div>

  		<input
            type="text"
         
            placeholder="Referral code"
            onChange={(e)=> {setRefCode(e.target.value)}}
          />

          <input
            type="number"
            min="1"
            max="4"
           
            placeholder="Mint qty"
            onChange={(e)=> {setAmount(e.target.value)}}
          />

		<button onClick = {mint}> mint with wallet</button>
		<button onClick = {approveToken}> approve usdc</button>
	
		<CrossmintPayButton
    clientId="32027041-87fe-4f33-be68-32358a45c333"
    environment="production"
    mintConfig={{
        quantity: "1",
        totalPrice: "1",
        _mintAmount: "1"
        // your custom minting arguments...
    }}
/>
	
		
	</div>
      

	   
  )
}
export default Mint