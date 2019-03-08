const {BlockChain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('35372388d9f3e7975317cb79804108a9c90e3f9049507f426fb9f3900723b674');
const myWalletAddress = myKey.getPublic('hex');

let Tabithereum = new BlockChain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
Tabithereum.addTransaction(tx1);


console.log('\n Starting the miner...');
Tabithereum.minePendingTransaction(myWalletAddress);

console.log('\nBalance of Josh is ', Tabithereum.getBalanceOfAddress(myWalletAddress));

Tabithereum.chain[1].transactions[0].amount = 1;

console.log('Is Chain Valid: ', Tabithereum.isChainValid());