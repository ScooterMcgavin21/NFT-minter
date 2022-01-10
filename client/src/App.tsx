import { ethers } from 'ethers'
import React from 'react'
import twitterLogo from './assets/twitter-logo.svg'
import useDetectWallet from './hooks/useDetectWallet'
import './styles/App.css'
import myEpicNft from './utils/MyEpicNFT.json'
// Constants
const TWITTER_HANDLE = '_buildspace'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

// const OPENSEA_LINK = ''
// const TOTAL_MINT_COUNT = 50

const App = () => {
  const { currentAccount, connectWallet } = useDetectWallet()

  const askContractToMintNft = async () => {
    const CONTRACT_ADDRESS = '0x3b2EB7686e60582fF59DEE88409594296E0feB77'

    try {
      const { ethereum } = window

      if (ethereum) {
        // eslint-disable-next-line prettier/prettier
        const provider = new ethers.providers.Web3Provider(ethereum as any)
        const signer = provider.getSigner()
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        )

        console.log('Going to pop wallet now to pay gas...')
        const nftTxn = await connectedContract.makeAnEpicNFT()

        console.log('Mining...please wait.')
        await nftTxn.wait()

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        )
      } else {
        console.log("Ethereum object doesn't exist!")
      }
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
              onClick={askContractToMintNft}
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
