(function () {
  'use strict';

  angular
    .module('books')
    .controller('BooksController', BooksController);

  BooksController.$inject = ['$scope', '$state', '$window', 'bookResolve', 'Authentication', 'Notification' ,'BooksService'];

  function BooksController($scope, $state, $window, book, Authentication, Notification) {
    var vm = this;

    vm.book = book;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.genres = ['Science fiction', 'Satire', 'Drama', 'Action', 'Romance', 'Mystery', 'Horror'];
    // Remove existing book
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.book.$remove(function () {
          $state.go('books.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> book deleted successfully!' });
        });
      }
    }

    // Save book
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bookForm');
        return false;
      }

      // Create a new book, or update the current instance
      vm.book.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('books.list'); // should we send the User to the list or the updated book's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> book saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> book save error!' });
      }
    }
  }
}());
