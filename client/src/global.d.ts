import { MetaMaskInpageProvider } from '@metamask/providers'

// eslint-disable-next-line prettier/prettier
declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}
