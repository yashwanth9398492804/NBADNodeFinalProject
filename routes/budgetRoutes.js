// budgetRoutes.js
const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/FinancialController');
const budgetCapController = require('../controllers/BudgetLimitController');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware.authenticateToken);

router.get('/capacity/:month?', budgetCapController.getBudgetCap);

router.get('/capacity', budgetCapController.getBudgetCap);

router.get('/getAllBudgets/:month?', budgetController.getAllBudgets);

router.post('/', budgetController.addBudget);

router.post('/capacity', budgetCapController.addBudgetCap);

module.exports = router;
