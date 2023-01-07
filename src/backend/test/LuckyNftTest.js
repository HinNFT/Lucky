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
        nft = await LuckyNFT.deploy(token.address);
	    

	    await token.connect(deployer).transfer(addr3.address, toWei(500))
	    await token.connect(addr3).approve(nft.address, toWei(500))
	    await nft.connect(deployer).setPrice(toWei(10))
        await nft.connect(deployer).setMaxMintAmount(4)
		await nft.connect(deployer).setAccounts(addr1.address, addr2.address)
		await nft.connect(deployer).setRoyalty(5)
	    })


	describe('Deployment', () => {

		it('initializes the contract with the correct values', async () => {
			expect(await nft.name()).to.equal('LUCKY')
			expect(await nft.symbol()).to.equal('LUCKY')			
			expect(await nft.tokenSupply()).to.equal(10000)
			expect(await nft.tokenCount()).to.equal(0)
			expect(await nft.mintPrice()).to.equal(toWei(10))
			expect(await nft.maxMintAmount()).to.equal(4)
			expect(await nft.royaltyAddr()).to.equal(addr1.address)
			expect(await nft.fundsAddr()).to.equal(addr2.address)
		})
	})

	describe('Minting', () => {

		it('facilitates minting & sets nfts with correct values', async () => {
			await nft.connect(addr3).mint(addr3.address, 1)
			expect(await nft.tokenCount()).to.equal(1)			
			expect(await nft.ownerOf(1)).to.equal(addr3.address)
			expect(await nft.balanceOf(addr3.address)).to.equal(1)
			expect(await token.balanceOf(addr3.address)).to.equal(toWei(490))
			expect(await token.balanceOf(addr2.address)).to.equal(toWei(10))
			expect(await nft.tokenURI(1)).to.equal("https://susanoo.mypinata.cloud/ipfs/QmPnVcAvecgdbV5nSyQoQb3T1u1xsvrFWPmZyEK2Xuc3TY/1.json")

			await nft.connect(addr3).mint(addr3.address, 4)
			expect(await nft.tokenCount()).to.equal(5)			
			expect(await nft.ownerOf(3)).to.equal(addr3.address)
			expect(await nft.balanceOf(addr3.address)).to.equal(5)
			expect(await token.balanceOf(addr3.address)).to.equal(toWei(450))
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
			await nft.connect(addr3).mint(addr3.address, 1)
			expect(await nft.connect(addr3).transferFrom(addr3.address ,addr2.address, 1)).to.emit(nft, "Transfer").withArgs(
				addr3.address,
				addr2.address,
				1
				)
			expect(await nft.balanceOf(addr3.address)).to.equal(0)
			expect(await nft.balanceOf(addr2.address)).to.equal(1)
			expect(await nft.ownerOf(1)).to.equal(addr2.address)
		})

	})

	describe('handles approvals', () => {

		it('approves tokens for delegated transfer', async () => {
			await nft.connect(addr3).mint(addr3.address, 1)

			expect(await nft.connect(addr3).setApprovalForAll(addr1.address, true)).to.emit(nft, "ApprovalForAll").withArgs(
				addr3.address,
				addr1.address,
				true
				)

			expect(await nft.isApprovedForAll(addr3.address, addr1.address)).to.equal(true)

		})

		it('performs delegated transfers', async () => {
			await nft.connect(addr3).mint(addr3.address, 1)
			await nft.connect(addr3).setApprovalForAll(addr2.address, true)

			await nft.connect(addr2).transferFrom(addr3.address, addr1.address, 1)

			expect(await nft.balanceOf(addr3.address)).to.equal(0)
			expect(await nft.balanceOf(addr1.address)).to.equal(1)
			expect(await nft.ownerOf(1)).to.equal(addr1.address)
			
			//expect(await nft.getApproved(1)).to.equal(0x0)

			// should fail
			//await nft.connect(addr2).transferFrom(addr3.address, addr2.address, 1)
		})

	})
})