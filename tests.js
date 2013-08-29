(function ($, ko){
    $(function () {
        var array = [];
        for(var c=1;c<1000;c++){
            array.push( { key: 'key_' + c, value: 'value ' + c } );
        }
        var viewModel = {
            observableArray: ko.observableArray(array);
        };
        ko.applyBindings(viewModel, $('#testBinding')[0]);
        
        module("paging view model - empty initializer");
        
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
        
        
        module("paging view model - updates to observableArray");
            
        test("pager updates with observableArray", function(){
            var observableArray = ko.observableArray([]);
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            var array = [0, 1, 2, 3, 4, 5];
            observableArray(array);
            expect(2);
            QUnit.deepEqual(pager.pagedItems(), array, "paged items");
            QUnit.deepEqual(pager.relativePages(), [1], "relativePages");
        });
        test("page cannot go below 1", function () {
            var observableArray = ko.observableArray([0, 1, 2, 3, 4, 5]);
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            expect(2);
            pager.page(0);
            QUnit.equal(pager.page(), 1, "page");
            pager.page(-1);
            QUnit.equal(pager.page(), 1, "page");
        });
        test("page cannot go past last page with single page of data", function () {
            var observableArray = ko.observableArray([0, 1, 2, 3, 4, 5]);
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            expect(2);
            pager.page(2);
            QUnit.equal(pager.page(), 1, "page");
            pager.page(10);
            QUnit.equal(pager.page(), 1, "page");
        });
        test("pager updates with observableArray and only displays one page", function(){
            var observableArray = ko.observableArray([]);
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            var array = ko.utils.range(0,100);
            observableArray(array);
            expect(2);
            QUnit.deepEqual(pager.pagedItems(), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "paged items");
            QUnit.deepEqual(pager.relativePages(), [1, 2, 3, 4, 5], "relativePages");
        });
        test("relativePages only show available pages", function(){
            var observableArray = ko.observableArray([0, 1, 2, 3, 4, 5]);
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            expect(2);
            QUnit.deepEqual(pager.relativePages(), [1], "relativePages");
            var array = ko.utils.range(0, 25);
            observableArray(array);
            QUnit.deepEqual(pager.relativePages(), [1, 2, 3], "relativePages");
        });
        test("page can update with multiple pages of data", function () {
            var observableArray = ko.observableArray(ko.utils.range(0,100));
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            expect(2);
            pager.page(2);
            QUnit.equal(pager.page(), 2, "page");
            pager.page(3);
            QUnit.equal(pager.page(), 3, "page");
        });
        test("page cannot go past last page with multiple pages of data", function () {
            var observableArray = ko.observableArray(ko.utils.range(0,25));
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            expect(2);
            pager.page(4);
            QUnit.equal(pager.page(), 3, "page");
            pager.page(10);
            QUnit.equal(pager.page(), 3, "page");
        });
        test("changing the page updates the relativePages", function () {
            var observableArray = ko.observableArray(ko.utils.range(0,100));
            var pager = new ko.bindingHandlers.pagedForeach.Pager(observableArray);
            expect(2);
            pager.page(5);
            QUnit.deepEqual(pager.relativePages(), [3, 4, 5, 6, 7], "relativePages");
            pager.page(11);
            QUnit.deepEqual(pager.relativePages(), [7, 8, 9, 10, 11], "relativePages");
        });
        
        
        module("pagingForeach binding");
        
        
    });
}(jQuery, ko));
