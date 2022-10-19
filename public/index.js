(function(window, document, RSVP, rJS, jIO){
    rJS(window).ready(function () {
        var gadget = this;
        return gadget.render();
    })
    .declareMethod('render', function (options){
        var gadget = this;
        if (options === undefined) {
            gadget.element.innerHTML = "COUSCOUS";
        }
    });
})(window, document, RSVP, rJS, jIO);