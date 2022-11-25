(function(window, document, RSVP, rJS, jIO){

    function parseSearch(){
        var tab, elem, res = {};
        if (window.location.search){
            tab = window.location.search.split('?')[1].split('&');
            for (i in tab){
                elem = tab[i].split('=');
                res[elem[0]]=elem[1];
            }
            return res;
        }
        return {"page" : "menu"};
        
    }

    rJS(window)
    .ready(function () {
        var gadget = this;
        return gadget.getDeclaredGadget("jio_piece")
          .push(function(jio_gadget){
            return jio_gadget.createJio({
                "type": "replicate",
                "check_local_modification": false,
                "check_local_deletion": false,
                "check_local_creation": false,
                "conflict_handling": 2,
                "local_sub_storage":{
                    "type": "query",
                    "sub_storage":{
                        "type": "uuid",
                        "sub_storage":{
                            "type": "indexeddb",
                            "database": "piece"
                        }
                    }
                },
                "remote_sub_storage": {
                    "type": "crud",
                    "url": window.location.origin + window.location.pathname,
                    "entity": "piece"
                },
                "signature_sub_storage":{
                    "type": "query",
                    "sub_storage": {
                        "type": "indexeddb",
                        "database": "signature"
                    }
                }
            });
          });
    })
    .declareService(function(){

        return this.render(parseSearch());
    })
    .declareMethod('render', function (options){
        var gadget = this;
        return gadget.declareGadget("gadget_page_"+options.page+".html", {
            element: gadget.element.querySelector('.page'),
            scope: 'page'
        })
          .push(function (page){
            return page.render();
          });
    })

    // Public Aquisition //

    .allowPublicAcquisition('piece_allDocs', function(){
        var gadget = this;
        return gadget.getDeclaredGadget('jio_piece')
          .push(function (jio_piece){
            return jio_piece.allDocs();
          })
    })
    .allowPublicAcquisition('piece_get', function (argument){
        return this.getDeclaredGadget('jio_piece')
        .push(function (jio_piece){
            return jio_piece.get(argument[0]);
        })
    })
    .allowPublicAcquisition('repair', function (){
        return this.getDeclaredGadget('jio_piece')
        .push(function(jio_piece){
            return jio_piece.repair();
        })
    });
})(window, document, RSVP, rJS, jIO);