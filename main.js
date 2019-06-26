const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = '';
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }

}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2019", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}


let newCoin = new Blockchain();
newCoin.addBlock(new Block(1, "10/07/2019", { amount: 10 }));
newCoin.addBlock(new Block(2, "12/07/2019", { amount: 20 }));
newCoin.addBlock(new Block(3, "15/07/2019", { amount: 50 }));

// visualize our chain
console.log(JSON.stringify(newCoin.chain, null, 4));

console.log('verify if newCoin is valid:');
console.log('Is blockchain valid? ' + newCoin.isChainValid());

console.log('change the data of a block, test validity:')
newCoin.chain[1].data = { amount: 5 };
console.log('Is blockchain valid? ' + newCoin.isChainValid());

console.log('change the hash of a block, test validity:')
newCoin.chain[1].hash = newCoin.chain[1].calculateHash();
newCoin.chain[1].data = { amount: 10 };
console.log('Is blockchain valid? ' + newCoin.isChainValid());


