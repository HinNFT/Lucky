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
import Axios from 'axios'






const Mint = ({nft, loginData, token, web3Handler, login, openLogin, account}) => {

  const[amount, setAmount] = useState(0)
  const[busy, setBusy] = useState(false)
  const[ReferrerPercent, setReferrerPercent] = useState(0)

  const[Percent, setPercent] = useState(0)
  const[refCode, setRefCode] = useState('')
  const price = 250

  const searchParams = new URLSearchParams(document.location.search)

  const toWei = (num) => ethers.utils.parseEther(num.toString())

  

  const mint = async () => {
    console.log(refCode)
  //checking for refcode availability
    if (refCode === null) {
      window.alert('LuckyBoo is in referral minting stage. Please get referral link from a user to mint!')
    } else {

       await Axios.post("http://localhost:3306/checkreferrerpercent", {
      referrer: refCode,
    }).then(async (response) => {
      if(response === "Invalid referral link."){
        window.alert(response)
      } else {    

    const allowance = await token.allowance(account, nft.address)
    const balance = await token.balanceOf(account)
 
    if(amount === 0 ){
      window.alert("Please input mint amount.")
    } else if (amount > 4){
      window.alert("Only 4 LuckyBoo can be minted at a time.")
    } else if (allowance < amount * 250000000){
      window.alert("Please approve USDC first.")
    }else if (balance < amount * 250000000) {
      window.alert("Insufficient balance to mint. 1 USDC is required.")
    }else{
    setBusy(true)   
    
    await nft.mint(account, amount)
    tracker()
  } 
       
           }
      })

    }
     
    }












    
const checkPercent = async () => { 
  
   await Axios.post("http://localhost:3306/checkreferrerpercent", {
      referrer: refCode,
    }).then((response) => {
      if(response.data){
        console.log(response.data)

      } else {
        console.log(response)
        // setReferrerPercent()
           }
      })
  

  }



  const tracker = async() => {
    console.log("mint tracker...")
   

    nft.on('Transfer', async (from, to, value, data) => {

     if(to.toLowerCase() == account) {
       await checkPercent()

    // const claimable = (amount * price * percent)

//      await Axios.post("http://localhost:3306/addclaimable", {
//       claimable: claimable,
             // amount: amount,
//       referrer: refCode
//     }).then((response) => {
//       if(response.data.message){
//         console.log(response.data.message)
//       } else {
//         console.log(response.data)
// 
//       window.alert('Successful mint!')
//       setBusy(false)
//            }
//       })
     } 
})
}


const whArgs = {
    referral: refCode,
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

  // useEffect(()=> {
  //   checkLogin()
  // }, [])

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
                quantity: amount,
                  totalPrice: (250 * amount).toString(),
                  _mintAmount: amount,
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
               quantity: amount,
        totalPrice: (250 * amount).toString(),
        _mintAmount: amount,
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



