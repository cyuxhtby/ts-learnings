interface Transaction {
    from: string;
    to: string;
    value: number;
}

class Mempool {
    private transactions: Transaction[];

    constructor(){
        this.transactions = [];
    }

    addTransaction(transaction: Transaction): void{
        this.transactions.push(transaction);
    }

    removeTransaction(transaction: Transaction): void {
        const index = this.transactions.findIndex(
            (tx) => tx.from === transaction.from && tx.to === transaction.to && tx.value == transaction.value
        );

        if(index !== -1){
            this.transactions.splice(index, 1);
        }  
    }

    getTransactions(): Transaction[]{
        return this.transactions;
    }

    clear(): void{
        this.transactions = [];
    }
}

const mempool = new Mempool();

const transaction1: Transaction = {
    from: 'Alice.eth',
    to: 'Bob.eth',
    value: 10,
};

const transaction2: Transaction = {
    from: 'Bob.eth',
    to: 'Charlie.eth',
    value: 20,
};

const transaction3: Transaction = {
    from: 'Charlie.eth',
    to: 'Dave.eth',
    value: 30,
};

mempool.addTransaction(transaction1);
mempool.addTransaction(transaction2);
mempool.addTransaction(transaction3);
const transactions = mempool.getTransactions();

console.log("Add")
console.log(transactions);

mempool.removeTransaction(transaction3);
console.log("Remove")
console.log(transactions);

mempool.clear();
console.log("Clear")
console.log(transactions);

