const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")) {
            this.hash = this.calculateHash();   
            this.nonce++;
        }

        console.log("Block Mined: " + this.hash);
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0,"01/01/2019", "Genesis Block", "0")
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            } 
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let Tabithereum = new BlockChain();

console.log('Mining Black 1...');
Tabithereum.addBlock(new Block(1,"01/02/2019", {amount: 4}));

console.log('Mining Black 2...');
Tabithereum.addBlock(new Block(2,"01/03/2019", {amount: 10}));



// Tabithereum.chain[1].data = {amount: 100};
// Tabithereum.chain[1].hash = Tabithereum.chain[1].calculateHash();

// console.log('Is blockchain valid? ' + Tabithereum.isChainValid());
// console.log(JSON.stringify(Tabithereum, null, 4));