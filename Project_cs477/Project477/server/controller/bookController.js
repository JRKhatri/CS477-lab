const Book = require('../models/bookModel')

module.exports.getAllBooks = (req, res, next) => {
    res.status(200).json(Book.listAll())
}


exports.save = (req, res, next) => {
    //req.body = //{title:"", ISBN:"", publishedDate:"", author:""}
    const book = new Book(null, req.body.title, req.body.isbn, req.body.publishedDate, req.body.author, req.body.price)
    res.json(book.save());
}

exports.findByBookId = (req, res, next) => {
    const book = req.params.bookId;
    res.json(Book.findById(book))
}

exports.updateByBookId = (req, res, next) => {
    const book = req.body;
    const updateBook = new Book(req.params.bookId, book.title, book.isbn, book.publishedDate, book.author, book.price).update();
    res.status(200).json(updateBook)

}
exports.deleteByBookId = (req, res, next) => {
    Book.deleteById(req.params.bookId);
    res.status(200).end();
}
//console.log(module.exports)