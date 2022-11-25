(function (window, rJS, document){
    rJS(window)
    .declareMethod('render', function (){
        return this.repair()
        .push(function(){
            window.location.search = "?page=plateau";
        });
    })
    .declareAcquiredMethod("repair", "repair");

})(window, rJS, document);