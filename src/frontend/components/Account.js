import { useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Axios from 'axios'

const Account = ({lucky, loginData}) => {


	const mint = async () => {
		await lucky.mintReferralNFT(loginData.walletaddress)
	}

	const getData = async () => {
		console.log(loginData.referralcode)
		await Axios.post("http://localhost:3001/refData", {
	      refCode: loginData.referralcode
	    }).then((response) => {
	        console.log(response.data)
	      })

	}

	// useEffect(()=>{
	// 	getData()
	// }, [])

	

  


  return (
  		<div className="container">
 
		<h3>Account: {loginData.email}</h3>
		<h3>Registered Wallet Address: {loginData.walletaddress}</h3>
		<h3>Your Referral Code: {loginData.referralcode}</h3>
		
		<div>
			<button onClick={mint}> mint nft </button>
		</div>	
		<div>
			<button onClick={getData}> getData </button>
		</div>

		<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>referral code</th>
          <th>number of referrals</th>
          <th>has minted nft?</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        
      </tbody>
    </Table>
	</div>
      

	   
  )
}
export default Account
