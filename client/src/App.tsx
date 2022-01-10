import React from 'react'
import twitterLogo from './assets/twitter-logo.svg'
import useDetectWallet from './hooks/useDetectWallet'
import './styles/App.css'

// Constants
const TWITTER_HANDLE = '_buildspace'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

// const OPENSEA_LINK = ''
// const TOTAL_MINT_COUNT = 50

const App = () => {
  const { currentAccount, connectWallet } = useDetectWallet()

  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </button>
  )

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
              onClick={connectWallet}
              className="cta-button connect-wallet-button"
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
