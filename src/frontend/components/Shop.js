import { useState, useEffect } from 'react'
import prodImg from './assets/products/sample1.jpeg'
import { Row, Col, Card } from 'react-bootstrap'
import { ethers } from 'ethers'; 
import Axios from 'axios'


const Shop = ({lucky}) => {
  const [products, setProducts] = useState([])
  const [referrerAddr, setReferrerAddr] = useState('')
  const [refCode, setRefCode] = useState('FF_au1X68')

  const toWei = (num) => ethers.utils.parseEther(num.toString())

  useEffect(() => {
    loadProducts() 
  }, [])


  const loadProducts = async() => {
    const res = await fetch('http://localhost:5000/products')
    const data = await res.json()
    setProducts(data)
  }
  

  const buyItem = async(price) => {
    console.log(price)
    await returnReferrerAddr(refCode)  
    console.log(referrerAddr)
    await lucky.purchaseItem(referrerAddr, {value: toWei(price)})
    } 
    
  const returnReferrerAddr = (refCode) => {
    Axios.post("http://localhost:3001/referral", {
      referralCode: refCode 
    }).then((response) => {
      if(response.data.message){
        console.log(response.data.message)
      } else {
        setReferrerAddr(response.data[0].walletaddress)
      }
    })
  }

	
  return (
    <div className="flex justify-center">
       <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">

            {products.map((prod, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={prodImg} />
                  <Card.Footer>{prod.productName}</Card.Footer>
                  <Card.Footer>{prod.price} ETH</Card.Footer>
                  <input onChange={(e)=> {setRefCode(e.target.value)}} placeholder="refcode"/>

                  <button name={prod.price} 
                  onClick={(event) => buyItem(event.target.name, prod.price)} 
                  variant="outline-light" size="small"> 
                  buy
                  </button>
                </Card>
              </Col>
              ))}
            
          </Row>
        </div>

    </div>

   
    )
}
//     
 

export default Shop
