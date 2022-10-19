(function(jIO, RSVP){

    function CrudStorage(spec){
        if (spec.url === undefined) {
            throw new jIO.util.jIOError("you must set an url");
        }
        this.url = spec.url + '/' + spec.entity + '/';
    }

    CrudStorage.prototype.get = function (id) {
        return jIO.util.ajax({
            type: "GET",
            url: this.url + id
        });
    }

    CrudStorage.prototype.buildQuery = function () {
        return jIO.util.ajax({
            type: "GET",
            url: this.url + 'list'
        })
    }

    jIO.addStorage("crud", CrudStorage);

}(jIO, RSVP));