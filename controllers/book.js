const Book = require('../models/book')

exports.getBooks = (req, res) => {
    Book.find((err, books) => {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            books: books
        })
    })
}

exports.createBook = (req, res) => {
    const book = new Book(req.body);
    console.log("CREATING USER: ", req.body);
    book.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            book: result,
            message: "Create book successfully"
        })
    })
}

exports.updateBook = (req, res) => {
    Book.update({_id: req.params.id}, req.body, (err, book) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            message : "Book updated successfully"
        })
    })
}

exports.deleteBook = (req, res) => {
    User.delete({_id: req.params.id}, (err, book) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            message: "Book deleted succesfully"
        })
    })
}