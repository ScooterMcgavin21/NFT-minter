const { assert } = require('chai')

describe('MyEpicNFT Contract', async () => {
  let nft
	let nftContractAddress
	let tokenId

  // deploys MyEpicNFT contract before each test
  beforeEach('Setup Contract', async () => {
    const MyEpicNFT = await ethers.getContractFactory('MyEpicNFT')
    nft = await MyEpicNFT.deploy()
    await nft.deployed()
    nftContractAddress = await nft.address
  })

  // tests address for MyEpicNFT contract 
  it('Should have an address', async () => {
    assert.notEqual(nftContractAddress, 0x0)
		assert.notEqual(nftContractAddress, '')
		assert.notEqual(nftContractAddress, null)
		assert.notEqual(nftContractAddress, undefined)
  })

  // Tests name for the token of MyEpicNFT contract
  it('Should have a name', async () => {
    const name = await nft.collectionName()
    assert.equal(name, 'SquareNFT')
  })
  
  // Tests name for the token of MyEpicNFT contract
  it('Should have a symbol', async () => {
    const name = await nft.collectionSymbol()
    assert.equal(name, 'SQUARE')
  })

  // Tests for NFT minting function using tokenID of the minted NFT
  it('Should be able to mint NFT', async () => {
    // mints NFT
    let txn = await nft.makeAnEpicNFT()
    let tx = await txn.wait()

    // tokenID of the minted NFT
    let event = tx.events[0]
    let value = event.args[2]
    tokenId = value.toNumber()

    assert.equal(tokenId, 0)

    // Mints another NFT
    txn = await nft.makeAnEpicNFT()
    tx = await txn.wait()

    // tokenID of the minted NFT
    event = tx.events[0]
    value = event.args[2]
    tokenId = value.toNumber()

    assert.equal(tokenId, 1)
  })

})
