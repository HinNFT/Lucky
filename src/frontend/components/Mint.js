import { useState, useEffect} from 'react'
import Axios from 'axios'
import { ethers } from 'ethers'; 
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import luckymint from './assets/luckymint.png'
import m1 from './assets/m1.jpeg'
import m2 from './assets/m2.jpeg'
import m3 from './assets/m3.jpeg'
import m4 from './assets/m4.jpeg'


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
  	
  	<div className="bg">
  		

  		<div className="text-center">
  		<div>
  		
      <img src ={luckymint} width ={150}/>
      </div>

      <div className="mint-img">
      <img src={m1} width ={120}/>
      <img src={m2} width ={120}/>
      <img src={m3} width ={120}/>
      <img src={m4} width ={120}/>

      </div>

  

  		
          
<div className ="mintbutton-container">
		<button className = "button4" onClick = {mint}> M I N T</button>
		<button className = "button4" onClick = {approveToken}> Approve USDC</button>

		<CrossmintPayButton
    clientId="32027041-87fe-4f33-be68-32358a45c333"
    environment="production"
    mintConfig={{
        quantity: "1",
        totalPrice: "1",
        _mintAmount: "1"
        // your custom minting arguments...
    }}/>
    
</div>
<div className = "mint-input-container">
          <input
            type="text"
            className="mint-input"
         
            placeholder="Referral code"
            onChange={(e)=> {setRefCode(e.target.value)}}
          />
          </div>
          <div>
          	<h1 className ="qtymint"> Max Quantity 5</h1>
          </div>

<div className = "mint-input-container">
          <input
            type="text"
            className="mint-input"
            
           
            placeholder="N F T s"
            onChange={(e)=> {setAmount(e.target.value)}}
          />
          </div>

		
	
		
	
		
	</div>
	</div>
	
      

	   
  )
}
export default Mint