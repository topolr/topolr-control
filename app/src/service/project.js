/**
 * @packet service.project;
 * @require pipe;
 */
Module({
    name: "listservice",
    extend: "publicservice",
    init: function () {
        var ths = this;
        require("@pipe").command("projectlist", null, function (a) {
            ths.data = {list:a};
            ths.start();
            ths.trigger();
        });
    },
    service_refresh:function () {
        var ths = this;
        this.stop();
        require("@pipe").command("projectlist", null, function (a) {
            ths.data = {list:a};
            ths.start();
            ths.trigger();
        });
    }
});