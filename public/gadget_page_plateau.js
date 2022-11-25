(function (window, rJS, RSVP){

    rJS(window)
    .declareAcquiredMethod("piece_allDocs", "piece_allDocs")
    .declareAcquiredMethod("piece_get", "piece_get")
    .declareMethod('render', function (){
        var gadget = this;
        return gadget.piece_allDocs({"include_docs": true})
          .push(function(result){
            let plateau = document.createElement('div');
            plateau.setAttribute('class', 'plateau');
            result.data.rows.forEach(row => {
                gadget.piece_get(row.id)
                    .push(function (doc){
                        let div = document.createElement('div');
                        div.setAttribute('style', 'grid-column: '+ (doc.x + 2) + ' / ' + (doc.x + doc.largeur + 2) + ';grid-row: '+
                            (doc.y + 2 ) + ' / ' + (doc.y + doc.longueur + 2));
                        div.textContent = doc.nom;
                        div.setAttribute('piece_id', row.id);
                        plateau.appendChild(div);
                    });
            });
            gadget.element.appendChild(plateau);
          });
    });
})(window, rJS, RSVP);