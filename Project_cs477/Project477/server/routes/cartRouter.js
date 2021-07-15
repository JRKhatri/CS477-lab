const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController')
const userController = require('../controller/userController')
const cartController = require('../controller/cartController')

router.get('/carts/:username', userController.authorizeUsername, cartController.listItemCart);
router.post('/carts/:username', userController.authorizeUsername, cartController.addItemInCart);
router.delete('/carts/:username/:pid',userController.authorizeUsername, cartController.removeCartItem);
router.get('/total/:username', cartController.totalAmount);
router.get('/checkout/:username',userController.authorizeGuest, cartController.checkOut)

module.exports= router;

// router.get('/carts', bookController.getAllBooks);
// router.get('/books/:bookId', bookController.findByBookId)
// router.post('/books', userController.authorizeAdmin, bookController.save)
// router.put('/books/:bookId', userController.authorizeAdmin, bookController.updateByBookId)
// router.delete('/books/:bookId', userController.authorizeAdmin,  bookController.deleteByBookId)