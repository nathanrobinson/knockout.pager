(function ($, ko){
    $(function () {
        module("paging view model");
        test("inital pages are empty", function () {
          var observableArray = ko.observableArray([]);
          
            var pager = new ko.bindingHandlers.pagedForeach.Pager(new Object());
            
            QUnit.equal(pager.pagedItems(), [], "paged items");
        });
    });
}(jQuery, ko));
