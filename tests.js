(function ($, ko){
    $(function () {
        module("paging view model");
        test("inital pages are empty", function () {
          var observableArray = ko.observableArray([]);
          
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            
            QUnit.deepEqual(pager.pagedItems(), [], "paged items");
        });
        test("inital page is 1", function () {
          var observableArray = ko.observableArray([]);
          
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            
            QUnit.equal(pager.page(), 1, "page");
        });
        test("inital itemsPerPage is 10", function () {
          var observableArray = ko.observableArray([]);
          
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            
            QUnit.equal(pager.itemsPerPage(), 10, "itemsPerPage");
        });
        test("inital allowChangePageSize is false", function () {
          var observableArray = ko.observableArray([]);
          
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            
            QUnit.equal(pager.allowChangePageSize(), false, "allowChangePageSize");
        });
        test("inital totalPages is 0", function () {
          var observableArray = ko.observableArray([]);
          
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            
            QUnit.equal(pager.totalPages(), 0, "totalPages");
        });
        test("inital relativePages are empty", function () {
          var observableArray = ko.observableArray([]);
          
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            
            QUnit.deepEqual(pager.relativePages(), [], "relativePages");
        });
    });
}(jQuery, ko));
