const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController')
const userController = require('../controller/userController')

router.get('/books', bookController.getAllBooks);
router.get('/books/:bookId', bookController.findByBookId)
router.post('/books', userController.authorizeAdmin, bookController.save)
router.put('/books/:bookId', userController.authorizeAdmin, bookController.updateByBookId)
router.delete('/books/:bookId', userController.authorizeAdmin,  bookController.deleteByBookId)



module.exports = router;