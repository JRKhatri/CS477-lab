const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController')

router.get('/books',  bookController.getAllBooks);
router.post('/books', bookController.save )
router.get('/books/:bookId', bookController.findByBookId)
router.put('/books/:bookId', bookController.updateByBookId)
router.delete('/books/:bookId', bookController.deleteByBookId)





module.exports = router;