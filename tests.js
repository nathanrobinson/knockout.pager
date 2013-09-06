(function ($, ko){
    $(function () {
        
        module("paging view model - empty initializer");
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
        
        
        module("paging view model - updates to observableArray");
            
        test("pager updates with observableArray", function(){
            var array = [0, 1, 2, 3, 4, 5];
            observableArray(array);
            expect(2);
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
        test("page cannot go past last page with single page of data", function () {
            expect(2);
            pager.page(2);
            QUnit.equal(pager.page(), 1, "page");
            pager.page(10);
            QUnit.equal(pager.page(), 1, "page");
        });
        test("relativePages only show available pages", function(){
            expect(2);
            QUnit.deepEqual(pager.relativePages(), [1], "relativePages");
            var array = ko.utils.range(0, 25);
            observableArray(array);
            QUnit.deepEqual(pager.relativePages(), [1, 2, 3], "relativePages");
        });
        test("page cannot go past last page with multiple pages of data", function () {
            var array = ko.utils.range(0,25);
            observableArray(array);
            expect(2);
            pager.page(4);
            QUnit.equal(pager.page(), 3, "page");
            pager.page(10);
            QUnit.equal(pager.page(), 3, "page");
        });
        test("pager updates with observableArray and only displays one page", function(){
            var array = ko.utils.range(0,100);
            observableArray(array);
            expect(2);
            QUnit.deepEqual(pager.pagedItems(), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "paged items");
            QUnit.deepEqual(pager.relativePages(), [1, 2, 3, 4, 5], "relativePages");
        });
        test("page can update with multiple pages of data", function () {
            expect(2);
            pager.page(2);
            QUnit.equal(pager.page(), 2, "page");
            pager.page(3);
            QUnit.equal(pager.page(), 3, "page");
        });
        test("changing the page updates the relativePages", function () {
            expect(2);
            pager.page(5);
            QUnit.deepEqual(pager.relativePages(), [3, 4, 5, 6, 7], "relativePages");
            pager.page(11);
            QUnit.deepEqual(pager.relativePages(), [7, 8, 9, 10, 11], "relativePages");
        });
        
        
        module("pagingForeach binding - observableArray");
        
        var array = [], array2 = [], array3 = [];
        for(var c=1;c<1000;c++){
            array.push( { key: 'key_1_' + c, value: 'value ' + c } );
            array2.push( { key: 'key_2_' + c, value: 'value ' + c } );
            array3.push( { key: 'key_3_' + c, value: 'value ' + c } );
        }
        var viewModel = { 
            observableArray: ko.observableArray(array),
            pageSize: ko.observable(25)
        };
        ko.applyBindings(viewModel, $('#testBinding')[0]);
        
        test("pageSizeControl binding adds a select with 4 options", function () {
            expect(2);
            QUnit.equal($('#testBinding').find('div.pager-size').children('select').length, 1, "pageSizeControl");
            QUnit.equal($('#testBinding').find('div.pager-size').children('select').children('option').length, 4, "pageSizeControl");
        });
        test("pageSize binding adds 25 rows", function () {
            QUnit.equal($('#testBinding').find('tbody').children('tr').length, 25, "pageSize");
        });
        test("pageSize binding updates", function () {
            expect(3);
            viewModel.pageSize(50);
            QUnit.equal($('#testBinding').find('tbody').children('tr').length, 50, "pageSize");
            viewModel.observableArray.pager.itemsPerPage(10);
            QUnit.equal($('#testBinding2').find('tbody').children('tr').length, 10, "pageSize");
            QUnit.equal(viewModel.pageSize(), 10, "pageSize");
        });
        test("pageLinks adds first page button", function () {
            QUnit.equal($('#testBinding').find('.first-page-link').children('a').length, 1, "pageLinks");
        });
        test("pageLinks adds last page button", function () {
            QUnit.equal($('#testBinding').find('.last-page-link').children('a').length, 1, "pageLinks");
        });
        test("pageLinks adds page number buttons", function () {
            QUnit.equal($('#testBinding').find('.pager-pages').children('.pager-page').children('a').length, 5, "pageLinks");
        });
        test("first page button is disabled on page 1", function () {
            QUnit.equal($('#testBinding').find('.first-page-link').children('a').hasClass('disabled'), true, "pageLinks");
        });
        test("first page button is not disabled on other pages", function () {
            viewModel.observableArray.pager.page(2);
            QUnit.equal($('#testBinding').find('.first-page-link').children('a').hasClass('disabled'), false, "pageLinks");
        });
        test("last page button is disabled on last page", function () {
            viewModel.observableArray.pager.page(100);
            QUnit.equal($('#testBinding').find('.last-page-link').children('a').hasClass('disabled'), true, "last page");
        });
        test("last page button is not disabled on other pages", function () {
            viewModel.observableArray.pager.page(99);
            QUnit.equal($('#testBinding').find('.last-page-link').children('a').hasClass('disabled'), false, "last page");
            viewModel.observableArray.pager.page(1);
        });
        test("$parent binding has correct scope", function () {
            expect(2)
            viewModel.pageSize(25);
            QUnit.equal($('#testBinding').find('.parentPageSize').first().text(), 25, "$parent");
            viewModel.pageSize(10);
            QUnit.equal($('#testBinding').find('.parentPageSize').first().text(), 10, "$parent");
        });
        
        module("pagingForeach binding - static array");
        
        var viewModel2 = { 
            array: array2,
            pageSize: ko.observable(10)
        };
        ko.applyBindings(viewModel2, $('#testBinding2')[0]);
        
        test("pageSizeControl binding adds a select with 4 options", function () {
            expect(2);
            QUnit.equal($('#testBinding2').find('div.pager-size').children('select').length, 1, "pageSizeControl");
            QUnit.equal($('#testBinding2').find('div.pager-size').children('select').children('option').length, 4, "pageSizeControl");
        });
        test("pageSize binding adds 10 rows", function () {
            QUnit.equal($('#testBinding2').find('tbody').children('tr').length, 10, "pageSize");
        });
        test("pageSize binding updates", function () {
            expect(3);
            viewModel2.pageSize(25);
            QUnit.equal($('#testBinding2').find('tbody').children('tr').length, 25, "pageSize");
            viewModel2.array.pager.itemsPerPage(10);
            QUnit.equal($('#testBinding2').find('tbody').children('tr').length, 10, "pageSize");
            QUnit.equal(viewModel2.pageSize(), 10, "pageSize");
        });
        test("pageLinks adds first page button", function () {
            QUnit.equal($('#testBinding2').find('.first-page-link').children('a').length, 1, "pageLinks");
        });
        test("pageLinks adds last page button", function () {
            QUnit.equal($('#testBinding2').find('.last-page-link').children('a').length, 1, "pageLinks");
        });
        test("pageLinks adds page number buttons", function () {
            QUnit.equal($('#testBinding2').find('.pager-pages').children('.pager-page').children('a').length, 5, "pageLinks");
        });
        test("first page button is disabled on page 1", function () {
            QUnit.equal($('#testBinding2').find('.first-page-link').children('a').hasClass('disabled'), true, "pageLinks");
        });
        test("first page button is not disabled on other pages", function () {
            viewModel2.array.pager.page(2);
            QUnit.equal($('#testBinding2').find('.first-page-link').children('a').hasClass('disabled'), false, "pageLinks");
        });
        test("last page button is disabled on last page", function () {
            viewModel2.array.pager.page(100);
            QUnit.equal($('#testBinding2').find('.last-page-link').children('a').hasClass('disabled'), true, "last page");
        });
        test("last page button is not disabled on other pages", function () {
            viewModel2.array.pager.page(99);
            QUnit.equal($('#testBinding2').find('.last-page-link').children('a').hasClass('disabled'), false, "last page");
            viewModel2.array.pager.page(1);
        });
        test("$parent binding has correct scope", function () {
            expect(2)
            viewModel2.pageSize(25);
            QUnit.equal($('#testBinding2').find('.parentPageSize').first().text(), 25, "$parent");
            viewModel2.pageSize(10);
            QUnit.equal($('#testBinding2').find('.parentPageSize').first().text(), 10, "$parent");
        });
        
        module("pagingForeach binding - static pageSize");
        
        var viewModel3 = { 
            observableArray: ko.observableArray(array3),
            pageSize: 25
        };
        ko.applyBindings(viewModel3, $('#testBinding3')[0]);
        
        test("pageSize binding adds 25 rows", function () {
            QUnit.equal($('#testBinding2').find('tbody').children('tr').length, 10, "pageSize");
        });
        test("user can still change page size", function () {
            viewModel3.observableArray.pager.itemsPerPage(10);
            QUnit.equal($('#testBinding2').find('tbody').children('tr').length, 10, "pageSize");
        });
        
        
    });
}(jQuery, ko));
