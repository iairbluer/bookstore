'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Book = mongoose.model('Book'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Book
 */
exports.create = function (req, res) {
  var book = new Book(req.body);
  book.title = req.body.title;
  book.description = req.body.description;
  book.publicationDate = req.body.publicationDate;
  book.author = req.body.author;
  book.ISBN = req.body.ISBN;
  book.genre = req.body.genre;
  book.price = req.body.price;

  book.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(book);
    }
  });
};

/**
 * Show the current book
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var book = req.book ? req.book.toJSON() : {};

  // Add a custom field to the book, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the book model.
  book.isCurrentUserOwner = !!(req.user && book.user && book.user._id.toString() === req.user._id.toString());

  res.json(book);
};

/**
 * Update a book
 */
exports.update = function (req, res) {
  var book = req.book;
  book.title = req.body.title;
  book.description = req.body.description;
  book.publicationDate = req.body.publicationDate;
  book.author = req.body.author;
  book.ISBN = req.body.ISBN;
  book.genre = req.body.genre;
  book.price = req.body.price;




  book.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(book);
    }
  });
};

/**
 * Delete a book
 */
exports.delete = function (req, res) {
  var book = req.book;

  book.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(book);
    }
  });
};

/**
 * List of books
 */
exports.list = function (req, res) {
  Book.find().sort('-created').populate('user', 'displayName').exec(function (err, books) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(books);
    }
  });
};

/**
 * Book middleware
 */
exports.bookByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Book is invalid'
    });
  }

  Book.findById(id).populate('user', 'displayName').exec(function (err, book) {
    if (err) {
      return next(err);
    } else if (!book) {
      return res.status(404).send({
        message: 'No book with that identifier has been found'
      });
    }
    req.book = book;
    next();
  });
};
