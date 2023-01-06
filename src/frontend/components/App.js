import { useState, useEffect } from 'react'
import { ethers } from 'ethers'; 

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navigation from './nav'
import Mint from "./Mint"
import Account from "./Account"
import LogReg from "./modalPopups/LogReg"

import LuckyAbi from '../contractsData/LUCKY.json'
import LuckyAddress from '../contractsData/LUCKY-address.json'


function App() {

  const[lucky, setLucky] = useState({})
  const[addressReg, setAddressReg] = useState('')
  const[openModal, setOpenModal] = useState(true)
  const[loginData, setLoginData] = useState({})


  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAddressReg(accounts[0])
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    loadContracts(signer)
   }
 
   const loadContracts = async (signer) => {
    const Lucky = new ethers.Contract(LuckyAddress.address, LuckyAbi.abi, signer)
    setLucky(Lucky)
  
  }

  const settingLoginData = (loginData) => {
    setLoginData(loginData)
  }

  useEffect(() => {
      web3Handler() 
    }, [])


  


  return (
    <BrowserRouter>
    <div>    
      <LogReg openModal = {openModal} web3Handler ={web3Handler} addressReg = {addressReg} onClose ={()=> setOpenModal(false)} settingLoginData = {settingLoginData} />
    </div>

  
    <div >
    

    <Navigation Mint = {Mint} Account = {Account} /> 
 

<Routes>
      <Route path = "/" element = { 
            <Mint Mint = {Mint} lucky = {lucky}/> 
          } />
      <Route path = "Account" element = { 
            <Account  lucky = {lucky} loginData = {loginData}/> 
          } />

  
          </Routes>
          
</div>
</BrowserRouter>
  
  )
}

export default App;
