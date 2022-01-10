import { useEffect, useState } from 'react'

interface Return {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentAccount: any
  // eslint-disable-next-line prettier/prettier
  error: string | null
  connectWallet: () => void
}

const useDetectWallet = (): Return => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // checking ethereum object has been injected into window by metamask
      const { ethereum } = window

      if (!ethereum) {
        console.log('Install metamask')
      } else console.log('object detected!', ethereum)

      // check for authorization
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ethereum.request({ method: 'eth_accounts' }).then((accounts: any) => {
        if (accounts.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const account = accounts[0] as any
          console.log(`Found an authorized account ${account}`)
          setCurrentAccount(account)
        } else {
          console.log('No authorized account found')
        }
      })
    } catch (error) {
      console.error(error)
      setError(error as string)
    }
  }, [])

  const connectWallet = async () => {
    try {
      // connect onClick and add account to state
      const { ethereum } = window

      if (!ethereum) {
        alert('Get Metamask foo')
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const accounts: any = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.error(error)
    }
  }

  return { currentAccount, error, connectWallet }
}

export default useDetectWallet
