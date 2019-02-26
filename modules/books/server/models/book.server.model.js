'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

/**
 * Book Schema
 */
var BookSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  publicationDate: {
    type: Date,
    default: Date.now,
    required: 'Publication Date cannot be blank'
  },
  genre: {
    type: String,
    enum : ['Science fiction', 'Satire', 'Drama', 'Action', 'Romance', 'Mystery', 'Horror'],
    required: 'Genre cannot be blank'

  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true,
    required: 'Description cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  ISBN: {
    type: Number,
    default: 0,
    required: 'ISBN cannot be blank'
  },
  price: {
    type: Number,
    default: 0,
    required: 'Price cannot be blank'
  },
  author: {
    type: String,
    default: '',
    trim: true,
    required: 'Author cannot be blank'
  },

});

mongoose.model('Book', BookSchema);