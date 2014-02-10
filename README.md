knockout.pager
==============

a paging foreach binding for knockout


USAGE:

Instead of 
```HTML
data-bind="foreach: observableArray"
```
use 
```HTML
data-bind="pagedForeach: observableArray"
```

Somewhere also 
```HTML
data-bind="pageLinks: observableArray"
```

Example / Run Unit Tests: https://rawgithub.com/nathanrobinson/knockout.pager/master/tests.html

You can bind to an observableArray or a computed that returns an array.

Available bindings:

```
  pagedForeach: displays a single page of items using an inline template (just like foreach).
  pageLinks: displays the paging links inside the current block (first page, page numbers, and last page).
  pageSizeControl: displays a select list with common page sizes (10, 25, 50, 100).
  pageSize: (in combination with any of the previous bindings) sets/updates the number of items per page.
```
_The first three bindings should be bound to the same **observableArray**, **computed**, or **function** which returns an array. The **function** should have the signature: function (itemsPerPage, page){} which returns an array of items for the current page. If your server method is asyncronous, you can bind pageLinks and pageSizeControl to serverMethod and use a normal foreach bound to an observable array and update the observable array using the server method (see examples in **tests.html** and **tests.js**._

To Do: 
- [X] Add change page callback to support server-side paging.
