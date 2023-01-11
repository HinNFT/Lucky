import { useState, useEffect} from 'react'
import './App.css';
import { ethers } from 'ethers'; 
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import luckymint from './assets/luckymint.png'
import m1 from './assets/m1.jpeg'
import m2 from './assets/m2.jpeg'
import m3 from './assets/m3.jpeg'
import m4 from './assets/m4.jpeg'
import Home from './assets/Home.png'
import LuckyAbi from '../contractsData/LuckyNFT.json'
import LuckyAddress from '../contractsData/LuckyNFT-address.json'
import LIMETokenAbi from '../contractsData/LIMEToken.json'
import LIMEAddress from '../contractsData/LIMEToken-address.json'
import { Spinner } from 'react-bootstrap'






const Mint = ({nft, loginData, token, web3Handler, login, openLogin, account}) => {

  const[amount, setAmount] = useState(0)
  const[busy, setBusy] = useState(false)

  const searchParams = new URLSearchParams(document.location.search)

  const toWei = (num) => ethers.utils.parseEther(num.toString())

  

  const mint = async () => {
    await web3Handler()
     
    const allowance = await token.allowance(account, nft.address)
    const balance = await token.balanceOf(account)
 
    if(amount < 1 ){
      window.alert("Please input mint amount.")
    }  else if (allowance < amount * 250000000){
      window.alert("Please approve USDC first.")
    }else if (balance < amount * 250000000) {
      window.alert("Insufficient balance to mint. 1 USDC is required.")
    }else{
    setBusy(true)   
    
    await nft.mint(account, amount)
    tracker()
  }   
    }
// Axios.post("http://localhost:3001/mintref", {
	 //  	mintAmount: amount,
	 //  	referralcode: loginData.referralCode      
    // })
    



  const tracker = async() => {
    console.log("tracker bot...")

    nft.on('Transfer', (from, to, value, data) => {

     if(to.toLowerCase() == account){
      window.alert('Successful mint!')
      setBusy(false)
     } 
})
}
const whArgs = {
    referral: searchParams.get('ref'),
    amount: amount 
  };
  const whArgsSerialized = JSON.stringify(whArgs);

  
 

  
  const approveToken = async() => {
    web3Handler()
    await token.approve(nft.address, toWei(30000))
  }

  const checkLogin = () => {
    if(login === false){
      openLogin()
    }
  }

  useEffect(()=> {
    checkLogin()
  }, [])


  return (
 
    <div className="bg">
   
     
      
      <div className="text-center">

      <div>
      
      <img src ={luckymint} width ={150}/>
      </div>

      <div className="mint-img">
      <img src={m1} className="lucky-img"/>
      <img src={m2} className="lucky-img"/>
      <img src={m3} className="lucky-img"/>
      <img src={m4} className="lucky-img"/>

      </div>
      

          {account ?( busy ? (
            <div className ="mintbutton-container">
               <Spinner animation="border" style={{ display: 'flex', color: 'white'}} />
               <p className='mx-3 my-0 minting'> Please do not close tab when minting </p> 
               </div> ) 
: 
     (<><div className ="mintbutton-container">
      <button className = "button4" onClick = {approveToken}> Approve USDC</button> 
        <button className = "button4" onClick = {mint}> MINT </button>
        
    <h2 className="font-link-League"> or </h2>

          <CrossmintPayButton
              clientId="6814ea16-8898-434a-bdc1-2df101298664"
              environment="production"
              mintConfig={{
                quantity: amount,
                  totalPrice: (1 * amount).toString(),
                  _mintAmount: amount,
                  whPassThroughArgs: whArgsSerialized
                  
                  // your custom minting arguments...
              }}
          /> 
          
          </div>  

          <div className="price">
  <p>1 POLYGON USDC / $1 for 1 Lucky Boo NFT </p>
</div>
</>
               
)
    
    ): (<><div className ="mintbutton-container" ><button className = "button4" onClick = {web3Handler} >Connect Wallet </button> <h2 className="font-link-League"> or </h2> 
<CrossmintPayButton
    clientId="6814ea16-8898-434a-bdc1-2df101298664"
    environment="production"
    mintConfig = {{
               quantity: amount,
        totalPrice: (1 * amount).toString(),
        _mintAmount: amount,
        whPassThroughArgs: whArgsSerialized
        // your custom minting arguments...
    }}
/>
</div>
<div className="price">
  <p>1 POLYGON USDC / $1 for 1 Lucky Boo NFT </p>
</div>
</>)}




          <div className = "mint-input-container">
          <input
          type = "text"
            className="mint-input"

            placeholder="M I N T  A M O U N T"
            onChange={(e)=> {setAmount(e.target.value)}}
          />
          </div>

          <div>
            <h1 className ="qtymint"> Max Quantity 4 </h1>

          </div>   

  </div>
  </div>

     
  )
}

export default Mint;

 // <a href="https://www.lucky.boo/"><img src ={Home} width ={150}/></a>

