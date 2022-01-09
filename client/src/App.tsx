import React, { useEffect, useState } from 'react'
import twitterLogo from './assets/twitter-logo.svg'
import './styles/App.css'

// Constants
const TWITTER_HANDLE = '_buildspace'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

// const OPENSEA_LINK = ''
// const TOTAL_MINT_COUNT = 50

const App = () => {
  const [currentAccount, setCurrentAccount] = useState('')
  /**
   * check if ethereum object is in window
   */
  const detectWallet = async () => {
    const { etherum } = window
    if (!etherum) {
      console.log('install metamask')
      return
    } else {
      console.log('eth detected', etherum)
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    if (accounts.length !== 0) {
      const accounts = accounts[0]
      console.log('Found Account:', account)
      setCurrentAccount(account)
    } else {
      console.log('No account Found')
    }
  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert('Get MetaMask')
        return
      }
      // request access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }
  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </button>
  )
  /**
   * run upon page load
   */
  useEffect(() => {
    detectWallet()
  }, [])
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">NFT Collection</p>
          <p className="sub-text">Discover NFT today</p>
          {currentAccount === '' ? (
            renderNotConnectedContainer()
          ) : (
            <button
              onClick={null}
              className="cta-button connecct-wallet-button"
            >
              Mint NFT
            </button>
          )}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  )
}
export default App
