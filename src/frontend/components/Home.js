import { useState, useEffect} from 'react'
import luckylogo from './assets/luckylogo.png'
import lucky1 from './assets/lucky1.png'
import gift from './assets/gift.png'
import reward from './assets/reward.png'
import clock from './assets/clock.png'
import Lgame from './assets/Lgame.png'
import Lcasino from './assets/Lcasino.png'
import Ltrade from './assets/Ltrade.png'
import Lproduct from './assets/Lproduct.png'
import luckyy from './assets/luckyy.png'
import light from './assets/light.png'
import fallen from './assets/fallen.png'


const Home = () => {

  return (
  	   <div>
  	<div class="bgOrange"> 
<div className = "font-link-League">
  	   <div class="header-text">
            <div class="container">
                <div class="row">
                    <div class="left-text col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <p>♺ SUSTAINABLE ECO-SYSTEM</p>
                        <h1>SUPER <br/> AFFILIATE <br/> PLATFORM</h1>
                        <h3>Most powerful passive income platform <br/>
                           backed by strongest business.</h3>

                         <button className ="white-button"> R E G I S T E R</button>
                      
                    </div>
                    <div class="left-text col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    	<img src= {luckylogo} class ="responsive-lucky" />
                    </div>

                    
                    
                </div>
            </div>
        </div>
        </div>
        </div>
<div class="mid-text">
        <div class="container">
        	<div class="left-text col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        
          <h1>Discover the power of <br/> <strong>Passive Income</strong>  </h1>
          <h3>no experience required.</h3>
          <p>Lucky revenue sharing and affiliate program backed by <br/>
							some of the strongest businesses in the world across Web 2 & 3.</p>

             
                      
                    </div>
        </div>
        
        </div>

      <div class="container-lowermid">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="features-item">
                        <div class="features-icon">
                            
                            <img src={clock} width={50} height={50} />
                            
                            <p>Rewards payout by Weekly, no time wasted.</p>
                            
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                    data-scroll-reveal="enter bottom move 30px over 0.6s after 0.4s">
                    <div class="features-item">
                        <div class="features-icon">
                            
                            <img src={reward} width={50} height={50} />
                        
                            <p>Up to 45% commission pay out & <br/>
                            30% revenue sharing rate.</p>
                            
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                    data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                    <div class="features-item">
                        <div class="features-icon">
                           
                           <img src={gift} width={50} height={50} />
                          
                            <p>Daily free perks & airdrops  worth up to 30$.</p>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="lower-text">
        	<div class="text-center">
        	<div className = "font-link-League">
                        
          <h1>Backed by</h1>
           

          <img src ={Lcasino} height ="100"/>
          <img src ={Ltrade} height ="100" />
          <img src ={Lgame} height ="100" />
          <img src ={Lproduct} height ="100" />
          

             
               </div>       
          </div>
        
        </div>
        
        <div class="bgBlack">
        	<div class="text-center">
        	
        	<div className = "font-link-League">
                        
          <h1>Gallery</h1>
             </div>       
          </div>

          <div class="container-gallery">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="text-center">
                       <h3 style= {{color : '#F37021'}} >LUCKY</h3>

                            
                            <img src={luckyy} height={200} />
                            
                            
                            
                      
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                    data-scroll-reveal="enter bottom move 30px over 0.6s after 0.4s">
                    <div class="features-item">
                        <div class="text-center">
                       <h3 style= {{color : '#ffffa1'}} >LIGHT</h3>
                            
                             <img src={light} height={200} />
                        
                            
                            
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                    data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                    <div class="features-item">
                        <div class="text-center">
                       <h3 style= {{color : 'red'}} >FALLEN</h3>
                           
                            <img src={fallen} height={200} />
                          
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
      </div>

 



        <div class="bgOrange2"> 
<div className = "font-link-League">
  	 
            <div class="container">
                <div class="row">
                    <div class="left-text col-lg-6 col-md-12 col-sm-12 col-xs-12">
                       
                        <h1>PAYOUT REWARDS <br/> COUNTDOWN <br/> XX DAYS LEFT</h1>
                        <p>only available to nft minters before 7/02/2023.</p>
                  </div>
                    <div class="left-text col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    	<img src= {lucky1} class ="responsive-lucky1" />
                    </div>

                    
                    
                </div>
            </div>
      
        </div>
        </div>

        <footer class ="footerBG">
        <div class="container">
            <div class="row">
                
                <div class="col-lg-3 col-sm-6">
                    <div class="single-box">
                        <h2>INFO</h2>
                    <ul >
                        <li>BLOG</li>
                        <li>FAQ</li>
                    </ul>
                    </div>                    
                </div>
                <div class="col-lg-3 col-sm-6">
                    <div class="single-box">
                        <h2>PRODUCTS</h2>
                    <ul >
                        <li>LUCKY CASINO</li>
                        <li>LUCKY TRADE</li>
                        <li>LUCKY GAMING</li>
                        <li>LUCKY PRODUCT</li>
                        
                     
                    </ul>
                    </div>                    
                </div>
                <div class="col-lg-6 col-sm-6">
                    <div class="single-box">
                        <h2>2023 LUCKY <br/> ALL RIGHTS RESERVED </h2>
                        
                        
                        
                    </div>
                </div>
            </div>
        </div>
    </footer>
        
 </div>

   


	   
  )
}
export default Home

// <h2>Follow us on</h2>
//                         <p class="socials">
//                             <i class="fa fa-facebook"></i>
//                             <i class="fa fa-dribbble"></i>
//                             <i class="fa fa-pinterest"></i>
//                             <i class="fa fa-twitter"></i>
//                         </p>


