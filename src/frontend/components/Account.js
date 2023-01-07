import { useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Axios from 'axios'
import { TwitterShareButton } from 'react-twitter-embed';
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon} from 'react-share';

const Account = ({lucky, loginData, openLogin}) => {

	const[data, setData] = useState({})
	const[viewData, setViewData] = useState(false)
	const[referCode, setReferCode] = useState('')




	const getData = () => {

		if(loginData.length === undefined) {
			openLogin()
			Axios.post("http://localhost:3001/refData", {
	      refCode: loginData.referralcode

	    }).then((response) => {
	        setData(response.data)	  
	             
	      })
		} else {
			Axios.post("http://localhost:3001/refData", {
	      refCode: loginData.referralcode
	    }).then((response) => {
	        setData(response.data)	        
	      })

		}	
		 setReferCode(loginData.referralcode)
	}
	
    const showData = () => {
    	setViewData(true)
    }
     


	useEffect(()=>{
		getData()
	}, [loginData])

  


  return (
  		<div className="container">
 
		<h3>Account: {loginData.email}</h3>
		<h3>Your Referrer: {loginData.referrercode}</h3>
		<h3>Registered Wallet Address: {loginData.walletaddress}</h3>
		<h3>Your Referral Code: {loginData.referralcode}</h3>
		<h3>Your signup referrals: {loginData.signupreferralcount}</h3>
		<h3>Your minting referrals : {loginData.mintreferralcount}</h3>
		
		<div>
			<button onClick={showData}> show referral data </button>
		</div>	

		<TwitterShareButton
    url={'https://www.google.com/'}
    options={{ text: `LUCKY my referral code `}}
  />
  <FacebookShareButton
     url={'https://www.google.com/'}     //eg. https://www.example.com
      quote={"CampersTribe - World is yours to explore"}
                hashtag="#getLucky"
                
   >
    <FacebookIcon size={40}/>
  </FacebookShareButton>  

  <WhatsappShareButton
  title = "Join me on lucky"
  separator = " "
  url = {'https://www.google.com/'}>
  	<WhatsappIcon size={40}/>
  </WhatsappShareButton>

	
	

		{viewData ? 
		(
	<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>referral code</th>
          <th>number of signup referrals</th>
          <th>number of mint referrals</th>
        </tr>
      </thead>
      <tbody>

      {Object.keys(data).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{data[key].referralcode}</td>
            <td>{data[key].signupreferralcount}</td>
            <td>{data[key].mintreferralcount}</td>

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

