import { useState, useEffect} from 'react'
import Axios from 'axios'
import { ethers } from 'ethers'; 
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import luckymint from './assets/luckymint.png'
import m1 from './assets/m1.jpeg'
import m2 from './assets/m2.jpeg'
import m3 from './assets/m3.jpeg'
import m4 from './assets/m4.jpeg'


const Mint = ({nft, loginData, token, web3Handler, login, openLogin}) => {

	const[amount, setAmount] = useState(0)
	const[account, setAccount] = useState('')
	const price = 5

	const toWei = (num) => ethers.utils.parseEther(num.toString())



	const mint = async () => {

		if(amount < 1 ){
			window.alert("Please input mint amount.")
		}

		if(login == false) {
			openLogin()
		} else {
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(accounts[0])
		await nft.mint(account, amount)
		Axios.post("http://localhost:3001/mintref", {
	  	mintAmount: amount,
	  	referralcode: loginData.referralCode      
    })
			
  } 	
	}

  const getData = () => {
  	if(login == false) {
			openLogin()
			web3Handler()
		} 
  }

	const approveToken = async() => {
		await token.approve(nft.address, toWei(30000))
	}

	useEffect(()=>{
		getData()
	}, [loginData])



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
        quantity: amount,
        totalPrice: (amount * price).toString(),
        _mintAmount: amount
        // your custom minting arguments...
    }}/>
    
</div>


          <div className = "mint-input-container">
          <input
          type = "text"
            className="mint-input"

            placeholder="M I N T  A M O U N T"
            onChange={(e)=> {setAmount(e.target.value)}}
          />
          </div>

          <div>
          	<h1 className ="qtymint"> Max Quantity 4</h1>
          </div>

         

		
	</div>
	</div>
	
      

	   
  )
}
export default Mint