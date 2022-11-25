(function(jIO, RSVP){

    function CrudStorage(spec){
        if (spec.url === undefined) {
            throw new jIO.util.jIOError("you must set an url");
        }
        this.url = spec.url + spec.entity + '/';
    }

    CrudStorage.prototype.hasCapacity = function (name) {
        return name === "list";
    }

    CrudStorage.prototype.get = function (id) {
        var storage = this;
        return new RSVP.Queue()
            .push(function () {
                return jIO.util.ajax({
                    type: "GET",
                    url: storage.url + id
                });
            })
            .push(function (result) {
                return JSON.parse(result.target.response);
            });
    }

    CrudStorage.prototype.buildQuery = function () {
        var storage = this;
        return new RSVP.Queue()
            .push(function () {
                return jIO.util.ajax({
                    type: "GET",
                    url: storage.url
                });
            })
            .push(function (result) {
                return JSON.parse(result.target.response);
            });
    }

    jIO.addStorage("crud", CrudStorage);

}(jIO, RSVP));