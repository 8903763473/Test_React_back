// routes/categoryRoutes.js

const express = require('express');
const CategoryController = require('../controller/categoryController');

const router = express.Router();

router.get('/getAllCategories', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/createCategory', CategoryController.createCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/deleteCategory/:id', CategoryController.deleteCategory);

module.exports = router;
