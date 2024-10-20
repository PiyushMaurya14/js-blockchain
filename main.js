
const SHA256 = require('crypto-js/sha256');

class block {
    constructor(index, timestamp, data, previoushash = '') 
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.calculatehash();
    }

    calculatehash() {
        return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data)).toString();


    }
}

class blockchain {
    
    constructor()
     {
        this.chain = [this.createGenesisBlock()]

    }

    createGenesisBlock() 
    {
        return new block(0, "20/10/2024", "genesis block ", "0")
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];

    }
    addNewBlock(newBlock) 
    {
        newBlock.previoushash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculatehash();
        this.chain.push(newBlock);

    }

    isChainValid() 
    {
        for (let i = 1; i < this.chain.length; i++) 
            {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculatehash()) {
                return false;

            }

            if (currentBlock.previoushash !== previousBlock.hash) {
                return false;
            }

            return true;
        }  
    }
}

let picoin = new blockchain();
picoin.addNewBlock(new block(1, "20/10/2024", { amount: 4 }));
picoin.addNewBlock(new block(2, "20/10/2024", { amount: 10 }));

console.log(JSON.stringify(picoin, null, 4));

console.log('is chain valid?' + picoin.isChainValid());








