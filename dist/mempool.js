var Mempool = /** @class */ (function () {
    function Mempool() {
        this.transactions = [];
    }
    Mempool.prototype.addTransaction = function (transaction) {
        this.transactions.push(transaction);
    };
    Mempool.prototype.removeTransaction = function (transaction) {
        var index = this.transactions.findIndex(function (tx) { return tx.from === transaction.from && tx.to === transaction.to && tx.value == transaction.value; });
        if (index !== -1) {
            this.transactions.splice(index, 1);
        }
    };
    Mempool.prototype.getTransactions = function () {
        return this.transactions;
    };
    Mempool.prototype.clear = function () {
        this.transactions = [];
    };
    return Mempool;
}());
var mempool = new Mempool();
var transaction1 = {
    from: 'Alice.eth',
    to: 'Bob.eth',
    value: 10,
};
var transaction2 = {
    from: 'Bob.eth',
    to: 'Charlie.eth',
    value: 20,
};
var transaction3 = {
    from: 'Charlie.eth',
    to: 'Dave.eth',
    value: 30,
};
mempool.addTransaction(transaction1);
mempool.addTransaction(transaction2);
mempool.addTransaction(transaction3);
var transactions = mempool.getTransactions();
console.log("Add");
console.log(transactions);
mempool.removeTransaction(transaction3);
console.log("Remove");
console.log(transactions);
mempool.clear();
console.log("Clear");
console.log(transactions);
