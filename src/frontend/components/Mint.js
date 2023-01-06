import { useState, useEffect} from 'react'
import Axios from 'axios'

const Mint = ({lucky, loginData}) => {


	const mint = async () => {
		await lucky.mintReferralNFT(loginData.walletaddress)
	}



	

  


  return (
  		<div className="container">
  		<h1>price $250</h1>
 
		<button onClick = {mint}> mint!</button>
		<button onClick = {mint}> crossmint</button>
		
	</div>
      

	   
  )
}
export default Mint