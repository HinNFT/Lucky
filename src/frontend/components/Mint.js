import { useState, useEffect} from 'react'
import './App.css';
import { ethers } from 'ethers'; 
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import luckymint from './assets/luckymint.png'
import m1 from './assets/m1.jpeg'
import m2 from './assets/m2.jpeg'
import m3 from './assets/m3.jpeg'
import m4 from './assets/m4.jpeg'

import { Spinner } from 'react-bootstrap'
import Axios from 'axios'


const Mint = ({provider, nft, loginData, token, web3Handler, login, openLogin, account}) => {

  const[busy, setBusy] = useState(false)
  const[refCode, setRefCode] = useState('')
  const price = 250

  const searchParams = new URLSearchParams(document.location.search)
  const toWei = (num) => ethers.utils.parseEther(num.toString())

  

  const mint = async () => {
    
    const allowance = await token.allowance(account, nft.address)
    const balance = await token.balanceOf(account)
  //checking for refcode availability
    if (refCode === '') {
      window.alert('LuckyBoo is in referral minting stage. Please get referral link from a user to mint!')
    } else {
     await Axios.post("https://lucky568booo0998boo.info/checkreferralcode", {
      referrer: refCode,
    }).then(async (response) => {
      if(response.data.message == "Invalid referral link!"){
        window.alert(response.data.message)

      } else {    
    
     if (allowance < price){
      window.alert("Please approve USDC first.")
    }else if (balance < price) {
      window.alert("Insufficient balance to mint. 250 USDC is required.")
    }else{
    setBusy(true)   
    
    await nft.mint(account, 1)
    tracker()
  } 
       
           }
      })

    }
     
    }

// const checkBal = async() => {
//  let bal = await nft.balanceOf(account)
//  console.log(bal.toString())
// }

// 
//   useEffect(()=> {
//     checkLogin()
//   }, [])

// const checkLogin = () => {
//   if(login == false) {
//     openLogin()
//   }
// }


const tracker = () => {


let processedEvents = new Set();

nft.on("Transfer", (event, to) => {
  if (processedEvents.has(event.blockNumber)) {
    return;
  }
  processedEvents.add(event.blockNumber);
  console.log("tracking")


  if(to.toLowerCase() == account) {

      Axios.post("https://lucky568booo0998boo.info/addClaimable", {
      referrer: refCode,
      price: price

    })
      window.alert('Successful mint!')
      setBusy(false)

           } 
});
}




     



const whArgs = {
    referrer: refCode,
      price: price
   
  };
const whArgsSerialized = JSON.stringify(whArgs);

  
 
  
  const approveToken = async() => {
    web3Handler()
    await token.approve(nft.address, toWei(30000))
  }



useEffect(()=> {
    setRefCode(searchParams.get('ref'))
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
                quantity: 1,
                  totalPrice: "250",
                  _mintAmount: 1,
                  whPassThroughArgs: whArgsSerialized
                  
                  // your custom minting arguments...
              }}
          /> 
          
          </div>  

          <div className="price">
  <p>250 POLYGON USDC / $250 for 1 Lucky Boo NFT </p>
</div>
</>
               
)
    
    ): (<><div className ="mintbutton-container" ><button className = "button4" onClick = {web3Handler} >Connect Wallet </button> <h2 className="font-link-League"> or </h2> 
<CrossmintPayButton
    clientId="6814ea16-8898-434a-bdc1-2df101298664"
    environment="production"
    mintConfig = {{
               quantity: 1,
        totalPrice: "250",
        _mintAmount: 1,
        whPassThroughArgs: whArgsSerialized
        // your custom minting arguments...
    }}
/>
</div>
<div className="price">
  <p>250 POLYGON USDC / $250 for 1 Lucky Boo NFT </p>
</div>
</>)}



          <div className = "mint-input-container">
          <input
          type = "text"
            className="mint-input"
            value= {refCode}
            readOnly
          />
           </div>

           

  </div>
  </div>

     
  )
}

export default Mint;



