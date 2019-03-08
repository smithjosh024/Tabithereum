const {BlockChain, Transaction} = require('./blockchain');

let Tabithereum = new BlockChain();
Tabithereum.createTransaction(new Transaction('address1', 'address2', 100));
Tabithereum.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
Tabithereum.minePendingTransaction('josh-address');

console.log('\nBalance of Josh is ', Tabithereum.getBalanceOfAddress('josh-address'));

console.log('\n Starting the miner again...');
Tabithereum.minePendingTransaction('josh-address');

console.log('\nBalance of Josh is ', Tabithereum.getBalanceOfAddress('josh-address'));
