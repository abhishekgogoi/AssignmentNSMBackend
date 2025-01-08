const transactions = require("../data/transactions.json")

const getAllTransactions = (req, res) => {
    try {
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
    }
};

const searchTransactions = (req, res) => {
    try {
        const searchTerm = req.query.search?.toLowerCase();
        if (!searchTerm) {
            return res.json(transactions);
        }

        const filteredTransactions = transactions.transactions.filter(
            transaction =>
                transaction.phase.toLowerCase().includes(searchTerm) ||
                transaction.subPhase.toLowerCase().includes(searchTerm)
        );

        res.json({ transactions: filteredTransactions });
    } catch (error) {
        res.status(500).json({ message: 'Error searching transactions' });
    }
};

const filterTransactions = (req, res) => {
    try {
        const { stageStatus, startDate, endDate } = req.query;
        let filteredTransactions = [...transactions.transactions];

        if (stageStatus) {
            filteredTransactions = filteredTransactions.filter(
                transaction => transaction.status === stageStatus
            );
        }

        if (startDate && endDate) {
            filteredTransactions = filteredTransactions.filter(transaction => {
                const [day, month, year] = transaction.date.split('.');
                const transactionDate = new Date(`${year}-${month}-${day}`);
                const start = new Date(startDate);
                const end = new Date(endDate);

                return transactionDate >= start && transactionDate <= end;
            });
        }

        res.json({ transactions: filteredTransactions });
    } catch (error) {
        console.error('Filter error:', error);
        res.status(500).json({ message: 'Error filtering transactions' });
    }
};

module.exports = {getAllTransactions, searchTransactions, filterTransactions}