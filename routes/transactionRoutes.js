const express = require("express")
const router = express.Router()
const {getAllTransactions, searchTransactions, filterTransactions} = require("../controllers/transactionController")

router.get('/list', getAllTransactions)
router.get('/search', searchTransactions)
router.get('/filter', filterTransactions);

module.exports = router