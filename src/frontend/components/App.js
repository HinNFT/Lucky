import { useState, useEffect } from 'react'
import { ethers } from 'ethers'; 
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navigation from './nav'
import Mint from "./Mint"
import LogReg from "./modalPopups/LogReg"

import LuckyAbi from '../contractsData/LuckyNFT.json'
import LuckyAddress from '../contractsData/LuckyNFT-address.json'
import LIMETokenAbi from '../contractsData/LIMEToken.json'
import LIMEAddress from '../contractsData/LIMEToken-address.json'


function App() {

  const[nft, setNft] = useState({})
  const[token, setToken] = useState({})
  const[openModal, setOpenModal] = useState(false)
  const[loginData, setLoginData] = useState({})
  const[login, setLogin] = useState(false)
  const[account, setAccount] = useState('')
  const[accountReg, setAccountReg] = useState('')
  const[provider, setProvider] = useState({})


 const web3Handler = async () => {
 
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccountReg(accounts[0])
    setAccount(accounts[0])

     window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
        chainId: "0x89",
        rpcUrls: ["https://polygon-rpc.com/"],
        chainName: "Matic Mainnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        blockExplorerUrls: ["https://explorer.matic.network"]
    }]
});
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const signer = provider.getSigner()
    loadContracts(signer)
   }
  

  const loadContracts = async (signer) => {
    const Lucky = new ethers.Contract(LuckyAddress.address, LuckyAbi.abi, signer)
    setNft(Lucky)
    const Lime = new ethers.Contract(LIMEAddress.address, LIMETokenAbi.abi, signer)
    setToken(Lime) 
  }


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
      <LogReg openModal = {openModal}  closeLogReg ={closeLogReg} settingLoginData = {settingLoginData} accountReg ={accountReg} web3Handler = {web3Handler}/>
    </div>

  
    <div >
    
    <Navigation login = {login} Mint = {Mint}  openLogin ={openLogin} loginData = {loginData} /> 
 
 
<Routes>

      <Route path = "/" element = { 
            <Mint provider = {provider} nft = {nft} token = {token} web3Handler = {web3Handler} account = {account} login = {login} openLogin = {openLogin} loginData = {loginData}/> 
          } />
  
          </Routes>
          
</div>
</BrowserRouter>
  
  )
}

export default App;
