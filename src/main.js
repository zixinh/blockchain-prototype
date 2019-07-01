const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const { Blockchain, Transaction } = require('./blockchain');

const myKey = ec.keyFromPrivate(
  'f2db8dd5870c7616737482f976ceb15b7e07a9f4623e6433433a7405eaed378c'
);
const myWalletAddress = myKey.getPublic('hex');

let huangCoin = new Blockchain(2);

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
huangCoin.addTransaction(tx1);

console.log('\n Starting the miner...');
// miner is the sender
huangCoin.minePendingTransactions(myWalletAddress);

console.log(
  '\n Balance of xavier is',
  huangCoin.getBalanceOfAddress(myWalletAddress)
);

huangCoin.minePendingTransactions(myWalletAddress);
console.log(
  '\n Balance of xavier is',
  huangCoin.getBalanceOfAddress(myWalletAddress)
);
