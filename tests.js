(function ($, ko){
    $(function () {
        module("paging view model");
        
            var observableArray = ko.observableArray([]);
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
          
        test("inital pages are empty", function () {
            QUnit.deepEqual(pager.pagedItems(), [], "paged items");
        });
        test("inital page is 1", function () {
            QUnit.equal(pager.page(), 1, "page");
        });
        test("inital itemsPerPage is 10", function () {
            QUnit.equal(pager.itemsPerPage(), 10, "itemsPerPage");
        });
        test("inital allowChangePageSize is false", function () {
            QUnit.equal(pager.allowChangePageSize(), false, "allowChangePageSize");
        });
        test("inital totalPages is 0", function () {
            QUnit.equal(pager.totalPages(), 0, "totalPages");
        });
        test("inital relativePages are empty", function () {
            QUnit.deepEqual(pager.relativePages(), [], "relativePages");
        });
        test("pager updates with observableArray", function(){
            expect(2);
            var array = [0, 1, 2, 3, 4, 5];
            observableArray(array);
            QUnit.deepEqual(pager.pagedItems(), array, "paged items");
            QUnit.deepEqual(pager.relativePages(), [1], "relativePages");
        });
        test("page cannot go below 1", function () {
            expect(2);
            pager.page(0);
            QUnit.equal(pager.page(), 1, "page");
            pager.page(-1);
            QUnit.equal(pager.page(), 1, "page");
        });
        test("page cannot go past last page", function () {
            expect(2);
            pager.page(2);
            QUnit.equal(pager.page(), 1, "page");
            pager.page(10);
            QUnit.equal(pager.page(), 1, "page");
        });
    });
}(jQuery, ko));
