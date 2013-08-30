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

Run Unit Tests: https://rawgithub.com/nathanrobinson/knockout.pager/master/tests.html

You can bind to an observableArray or a computed that returns an array.

Available bindings:

```
  pagedForeach: displays a single page of items using an inline template (just like foreach).
  pageLinks: displays the paging links inside the current block (first page, page numbers, and last page).
  pageSizeControl: displays a select list with common page sizes (10, 25, 50, 100).
  pageSize: (in combination with any of the previous bindings) sets/updates the number of items per page.
```
_The first three bindings should be bound to the same **observableArray** or **computed** which returns an array._

To Do: 
- [ ] Add change page callback to support server-side paging.
