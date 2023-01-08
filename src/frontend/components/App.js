import { useState, useEffect } from 'react'
import { ethers } from 'ethers'; 
import './App.css'
import Web3Modal from 'web3modal'
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink"

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navigation from './nav'
import Mint from "./Mint"
import Account from "./Account"
import Home from "./Home"
import LogReg from "./modalPopups/LogReg"

import LuckyAbi from '../contractsData/LuckyNFT.json'
import LuckyAddress from '../contractsData/LuckyNFT-address.json'
import LIMETokenAbi from '../contractsData/LIMEToken.json'
import LIMEAddress from '../contractsData/LIMEToken-address.json'


function App() {

  const[nft, setNft] = useState({})
  const[token, setToken] = useState({})
  // const[addressReg, setAddressReg] = useState('')
  const[openModal, setOpenModal] = useState(false)
  const[loginData, setLoginData] = useState({})
  const[login, setLogin] = useState(false)
  const[account, setAccount] = useState(null)


 const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(accounts[0])
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    loadContracts(signer)
   }
  

  const loadContracts = async (signer) => {
    const Lucky = new ethers.Contract(LuckyAddress.address, LuckyAbi.abi, signer)
    setNft(Lucky)
    const Lime = new ethers.Contract(LIMEAddress.address, LIMETokenAbi.abi, signer)
    setToken(Lime) 
  }

 
  useEffect(()=> {
    web3Handler()
  }, [])

  const settingLoginData = (loginData) => {
    setLoginData(loginData)
    setLogin(true)
  }

  const openLogin = () => {
    setOpenModal(true)
  }

  const closeLogReg = () => {
    setOpenModal(false)
  }
  

  return (
    <BrowserRouter>
 
    <div>    
      <LogReg openModal = {openModal}  closeLogReg ={closeLogReg} settingLoginData = {settingLoginData} />
    </div>

  
    <div >
    

    <Navigation Mint = {Mint} Account = {Account}  openLogin ={openLogin} loginData = {loginData} /> 
 
  
<Routes>
      <Route path = "/" element = { 
            <Home /> 
          } />
      <Route path = "/Mint" element = { 
            <Mint nft = {nft} token = {token} web3Handler = {web3Handler} account = {account} login = {login} openLogin = {openLogin}/> 
          } />
      <Route path = "Account" element = { 
            <Account  nft = {nft} loginData = {loginData} openLogin ={openLogin} login = {login} web3Handler = {web3Handler}/> 
          } />

  
          </Routes>
          
</div>
</BrowserRouter>
  
  )
}

export default App;
