const { expect } =  require("chai")

const toWei = (num) => ethers.utils.parseEther(num.toString())

describe('LuckyNFT', () => {

	let LimeToken
	let token
	let LuckyNFT
	let nft

	beforeEach(async () => {
		[deployer, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
		LIMEToken = await ethers.getContractFactory('LIMEToken');
        token = await LIMEToken.deploy(toWei(500));
        LuckyNFT = await ethers.getContractFactory('LuckyNFT');
        nft = await LuckyNFT.deploy(token.address, addr1.address, addr2.address);
	    

	    await token.connect(deployer).approve(nft.address, toWei(500))
	    await nft.connect(deployer).setPrice(toWei(10))
        await nft.connect(deployer).setMaxMintAmount(4)
	    })


	describe('Deployment', () => {

		it('initializes the contract with the correct values', async () => {
			expect(await nft.name()).to.equal('LUCKY')
			expect(await nft.symbol()).to.equal('LUCKY')			
			expect(await nft.tokenSupply()).to.equal(10000)
			expect(await nft.tokenCount()).to.equal(0)
			expect(await nft.mintPrice()).to.equal(toWei(10))
			expect(await nft.maxMintAmount()).to.equal(4)
		})
	})

	describe('Minting', () => {

		it('facilitates minting & sets nfts with correct values', async () => {
			await nft.connect(deployer).mint(1)
			expect(await nft.tokenCount()).to.equal(1)			
			expect(await nft.ownerOf(1)).to.equal(deployer.address)
			expect(await nft.balanceOf(deployer.address)).to.equal(1)
			expect(await token.balanceOf(deployer.address)).to.equal(toWei(490))
			expect(await token.balanceOf(addr2.address)).to.equal(toWei(10))
			expect(await nft.tokenURI(1)).to.equal("https://susanoo.mypinata.cloud/ipfs/QmPnVcAvecgdbV5nSyQoQb3T1u1xsvrFWPmZyEK2Xuc3TY/1.json")

			await nft.connect(deployer).mint(4)
			expect(await nft.tokenCount()).to.equal(5)			
			expect(await nft.ownerOf(3)).to.equal(deployer.address)
			expect(await nft.balanceOf(deployer.address)).to.equal(5)
			expect(await token.balanceOf(deployer.address)).to.equal(toWei(450))
			expect(await token.balanceOf(addr2.address)).to.equal(toWei(50))

			expect(await nft.tokenURI(2)).to.equal("https://susanoo.mypinata.cloud/ipfs/QmPnVcAvecgdbV5nSyQoQb3T1u1xsvrFWPmZyEK2Xuc3TY/2.json")
			expect(await nft.tokenURI(3)).to.equal("https://susanoo.mypinata.cloud/ipfs/QmPnVcAvecgdbV5nSyQoQb3T1u1xsvrFWPmZyEK2Xuc3TY/3.json")
			expect(await nft.tokenURI(4)).to.equal("https://susanoo.mypinata.cloud/ipfs/QmPnVcAvecgdbV5nSyQoQb3T1u1xsvrFWPmZyEK2Xuc3TY/4.json")
			expect(await nft.tokenURI(5)).to.equal("https://susanoo.mypinata.cloud/ipfs/QmPnVcAvecgdbV5nSyQoQb3T1u1xsvrFWPmZyEK2Xuc3TY/5.json")

			// await nft.connect(deployer).mint(5)
		})
	})

	describe('handles transfers', () => {

		it('transfers ownership', async () => {
			await nft.connect(deployer).mint(1)
			expect(await nft.connect(deployer).transferFrom(deployer.address ,addr2.address, 1)).to.emit(nft, "Transfer").withArgs(
				deployer.address,
				addr2.address,
				1
				)
			expect(await nft.balanceOf(deployer.address)).to.equal(0)
			expect(await nft.balanceOf(addr2.address)).to.equal(1)
			expect(await nft.ownerOf(1)).to.equal(addr2.address)
		})

	})

	describe('handles approvals', () => {

		it('approves tokens for delegated transfer', async () => {
			await nft.connect(deployer).mint(1)

			expect(await nft.connect(deployer).setApprovalForAll(addr2.address, true)).to.emit(nft, "ApprovalForAll").withArgs(
				deployer.address,
				addr2.address,
				true
				)

			expect(await nft.isApprovedForAll(deployer.address, addr2.address)).to.equal(true)

		})

		it('performs delegated transfers', async () => {
			await nft.connect(deployer).mint(1)
			await nft.connect(deployer).setApprovalForAll(addr2.address, true)

			await nft.connect(addr2).transferFrom(deployer.address, addr3.address, 1)

			expect(await nft.balanceOf(deployer.address)).to.equal(0)
			expect(await nft.balanceOf(addr3.address)).to.equal(1)
			expect(await nft.ownerOf(1)).to.equal(addr3.address)
			
			//expect(await nft.getApproved(1)).to.equal(0x0)

			// should fail
			//await nft.connect(addr2).transferFrom(addr3.address, addr2.address, 1)
		})

	})
})