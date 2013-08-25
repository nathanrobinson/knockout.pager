(function (ko){

    function Pager(observableArray){
        var self = this;

        self.page = ko.observable(1);
        
        observableArray.subscribe(function () {
            self.page(1);
        });
        
        self.page.subscribe(function (newVal) {
            var n = (newVal + '').replace(/[^0-9]/g, '');
            if (n < 1) n = 1;
            else if (n > self.totalPages()) n = self.totalPages();
            if (n != newVal) {
                self.page(n);
            }
        });

        var array = observableArray();

        self.totalPages = ko.computed(function () {
            var array = observableArray();
            return Math.ceil(array.length / 10);
        });
        self.pagedItems = ko.computed(function () {
            var array = observableArray();
            var indexOfFirstItemOnCurrentPage = (((self.page() * 1) - 1) * 10);
            var pageArray = array.slice(indexOfFirstItemOnCurrentPage, indexOfFirstItemOnCurrentPage + 10);
            return pageArray;
        });

        self.relativePages = ko.computed(function () {
            var currentPage = self.page() * 1;
            var totalPages = self.totalPages();
            var pagesFromEnd = totalPages - currentPage;
            var extraPagesAtFront = Math.max(0, 2 - pagesFromEnd);
            var extraPagesAtEnd = Math.max(0, 3 - currentPage);
            var firstPage = Math.max(1, currentPage - (2 + extraPagesAtFront));
            var lastPage = Math.min(self.totalPages(), currentPage + (2 + extraPagesAtEnd));

            return ko.utils.range(firstPage, lastPage);
        });
    }
    
    // Template used to render the page links
    var templateEngine = new ko.nativeTemplateEngine();

    templateEngine.addTemplate = function (templateName, templateMarkup) {
        document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<" + "/script>");
    };

    templateEngine.addTemplate("ko_pager_links", "\
        <div class='pager' data-bind='if: totalPages() > 1'>\
            <span class='first-page-link'><a class='pager-button icon-fast-backward' data-bind='click: page.bind($data, 1), enable: page() > 1, css: {disabled: page() == 1}'></a></span>\
            <span class='pager-pages' data-bind='foreach: relativePages'>\
                <span class='pager-page'><a class='pager-button' href='#' data-bind='click: $parent.page.bind($parent, $data), text: $data, css: { selected: $parent.page() == $data }'></a></span>\
            </span>\
            <span id='last'><a class='pager-button icon-fast-forward' data-bind='click: page.bind($data, totalPages()), enable: page() < totalPages(), css: { disabled: page() == totalPages() }'></a></span>\
        </div>\
    ");

    function makeTemplateValueAccessor(pager) {
        return function (){
            return { 'foreach' : pager.pagedItems, 'templateEngine' : templateEngine };
        };
    }

    ko.bindingHandlers.pagedForeach = {
        init : function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
            var observable = valueAccessor();
            if (!observable.pager) observable.pager = new Pager(observable);
            var array = ko.utils.unwrapObservable(observable);
            return ko.bindingHandlers.template.init(element, makeTemplateValueAccessor(observable.pager));
        },
        update : function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
            var observable = valueAccessor();
            var array = ko.utils.unwrapObservable(observable);
            if (!observable.pager) observable.pager = new Pager(observable);
            return ko.bindingHandlers.template.update(element, makeTemplateValueAccessor(observable.pager), allBindingsAccessor, viewModel, bindingContext);
        }
    };

    ko.bindingHandlers.pageLinks = {
        init : function (){
            return { 'controlsDescendantBindings' : true };
        },
        update : function (element, viewModelAccessor, allBindingsAccessor){
            var observable = viewModelAccessor(), allBindings = allBindingsAccessor();
            var array = ko.utils.unwrapObservable(observable);
            if (!observable.pager) observable.pager = new Pager(observable);

            // Empty the element
            while (element.firstChild) ko.removeNode(element.firstChild);

            // Render the page links
            ko.renderTemplate('ko_pager_links', observable.pager, { templateEngine: templateEngine }, element, "replaceNode");
        }
    };
}(ko));
