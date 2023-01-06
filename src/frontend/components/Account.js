import { useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Axios from 'axios'

const Account = ({lucky, loginData}) => {
	const[data, setData] = useState({})
	const[viewData, setViewData] = useState(true)


	const mint = async () => {
		await lucky.mintReferralNFT(loginData.walletaddress)
	}

	const getData = () => {
		Axios.post("http://localhost:3001/refData", {
	      refCode: loginData.referralcode
	    }).then((response) => {
	        setData(response.data)
	        
	      })
	}
	
// 	const tableRow = () => {
// 		for(var i; i < data.length; i++) {
// 			let info = data[i]
// 
// 	    info.map((Data) => {
// 			return (
// 		  <tr>
// 	        <td>{Data.referralcode}</td>
// 	        <td>{Data.id}</td>
// 	      </tr>
// 	      )
// 	      })
// 		}
// 	}
	
	

    


	useEffect(()=>{
		getData()
	}, [loginData])

	

  


  return (
  		<div className="container">
 
		<h3>Account: {loginData.email}</h3>
		<h3>Registered Wallet Address: {loginData.walletaddress}</h3>
		<h3>Your Referral Code: {loginData.referralcode}</h3>
		
		<div>
			<button onClick={mint}> mint nft </button>
		</div>	

	
	

		{viewData ? 
		(
	<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>referral code</th>
          <th>number of referrals</th>
        </tr>
      </thead>
      <tbody>

      {Object.keys(data).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{data[key].referralcode}</td>
            <td>{data[key].id}</td>

          </tr>))}

      </tbody>
    </Table>
			) : (
			null
			)

		}

		
	</div>
      

	   
  )
}
export default Account





// <tr>
//           <td>1</td>
//           <td>Mark</td>
//           <td>Otto</td>
//           <td>@mdo</td>
//         </tr>
//         <tr>
//           <td>2</td>
//           <td>Jacob</td>
//           <td>Thornton</td>
//           <td>@fat</td>
//         </tr>