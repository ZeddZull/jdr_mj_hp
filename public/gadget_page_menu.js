(function (window, rJS, document){

    function createMenu(gadget, menu){
        let a, li;
        for (i in menu){
            a = document.createElement('a');
            li = document.createElement('li');
            a.href = window.location.origin + window.location.pathname + '?page=' + menu[i].page;
            a.textContent = menu[i].text;
            li.appendChild(a);
            gadget.element.querySelector('ul').appendChild(li);
        }
    }

    rJS(window)
    .declareMethod('render', function (){
        return createMenu(this, [{
            "text": "Nouvelle Partie",
            "page": "new_game"
        },{
            "text": "Continuer",
            "page": "plateau"
        }]);
    });

})(window, rJS, document);