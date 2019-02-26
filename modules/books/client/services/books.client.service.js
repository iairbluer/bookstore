(function () {
  'use strict';

  angular
    .module('books.services')
    .factory('BooksService', BooksService);

  BooksService.$inject = ['$resource', '$log'];

  function BooksService($resource, $log) {
    var Book = $resource('/api/books/:bookId', {
      bookId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Book.prototype, {
      createOrUpdate: function () {
        var book = this;
        return createOrUpdate(book);
      }
    });

    return Book;

    function createOrUpdate(book) {
      if (book._id) {
        return book.$update(onSuccess, onError);
      } else {
        return book.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(book) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
