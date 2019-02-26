(function () {
  'use strict';

  angular
    .module('books')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Books',
      state: 'books',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'books', {
      title: 'List Books',
      state: 'books.list',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'books', {
      title: 'Add A Book',
      state: 'books.create',
      roles: ['*']
    });
  }
}());
