import { useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Axios from 'axios'
import { TwitterShareButton } from 'react-twitter-embed';
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon} from 'react-share';

const Account = ({lucky, loginData, openLogin, login}) => {

	const[data, setData] = useState({})
	const[viewData, setViewData] = useState(false)
	const[referCode, setReferCode] = useState('')




	const getData = () => {

		if(login == false) {
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
    	if(viewData == true) {
    		setViewData(false)
    	} else {
    		setViewData(true)
    	}
    	
    }

    const checkWallet = () => {
       if(loginData.walletaddress == null){
       	console.log(loginData.walletaddress)
       	return
       	<div>
       <h3 className="font-link-League">You have not set a wallet address. </h3>
       <button>connect wallet</button>
       </div>
     } else {
     	return
     	<div><h3 className="font-link-League">Registered Wallet address for rewards: {loginData.walletaddress}</h3></div>
     }
       	
     }
    
     


	useEffect(()=>{
		getData()
	}, [loginData])

  


  return (

  		<div className="container">

  		<div className="account-text">
		<h3>Account: {loginData.email}</h3>
		</div>

		<div className="refCode">
		<h1>YOUR REFFERAL CODE:   {loginData.referralcode}</h1>

	
			
		</div>


		
		

		<div class="container-cards">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                    data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                    <div class="features-item">
                        <div class="features-icon">
                            <h2>{loginData.signupreferralcount}</h2>
                            <img src="assets/images/features-icon-1.png" alt=""/>
                            <h4>Your Signup Referrals</h4>
                            
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                    data-scroll-reveal="enter bottom move 30px over 0.6s after 0.4s">
                    <div class="features-item">
                        <div class="features-icon">
                            <h2>{loginData.mintreferralcount}</h2>
                            <img src="assets/images/features-icon-2.png" alt=""/>
                            <h4>Your Mint Referrals</h4>
                            
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                    data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                    <div class="features-item"> 
                        <div class="features-icon">
                            <h2>Scout</h2>
                            <img src="assets/images/features-icon-3.png" alt=""/>
                            <h4>Your Rank</h4>
                            
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>

       {checkWallet}
       

        	<h3 className="font-link-League">Your Referrer: {loginData.referrercode}</h3>
		
		<div>
			<button onClick={showData}> show referral data </button>
		</div>	

		

	
	

		{viewData ? 
		(
	<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Referral code</th>
          <th>Signup referrals</th>
          <th>Mint referrals</th>
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

// 	<TwitterShareButton
//     url={'https://www.google.com/'}
//     options={{ text: `LUCKY my referral code `}}
//   />
//   <FacebookShareButton
//      url={'https://www.google.com/'}     //eg. https://www.example.com
//       quote={"CampersTribe - World is yours to explore"}
//                 hashtag="#getLucky"
//                 
//    >
//     <FacebookIcon size={40}/>
//   </FacebookShareButton>  
// 
//   <WhatsappShareButton
//   title = "Join me on lucky"
//   separator = " "
//   url = {'https://www.google.com/'}>
//   	<WhatsappIcon size={40}/>
//   </WhatsappShareButton>

