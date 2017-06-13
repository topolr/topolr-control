/**
 * @packet app;
 * @template template.temp;
 * @css style.loading;
 * @style style.main;
 * @style style.server;
 * @style style.popupname;
 * @require service.project;
 * @require icon.action;
 * @require icon.player;
 * @require pipe;
 */
Module({
    name:"main",
    extend:"viewgroup",
    layout:"@temp.main",
    className:"main",
    style:"@server",
    services: {"list": "@project.listservice"},
    autodom:true,
    option:{
        isstart:false,
        isdoing:false,
        listType:"@.list"
    },
    bind_add:function () {
        var ths=this;
        require("@pipe").command("browsefolder",null,function (path) {
            if(path.length>0) {
                ths.addChild({
                    type: "@.popupname",
                    option: {
                        override: {
                            event_done: function (e) {
                                var thss = this;
                                require("@pipe").command("addproject", {
                                    name: e.data,
                                    path: path[0]
                                }, function (result) {
                                    ths.triggerService("list.refresh");
                                    thss.remove();
                                });
                            }
                        }
                    }
                });
            }
        });
    },
    bind_play:function (dom) {
        var ths = this;
        if(!ths.option.isdoing) {
            ths.option.isdoing=true;
            if (dom.hasClass("main-isstart")) {
                require("@pipe").command("startserver", null, function () {
                    ths.option.isdoing=false;
                    ths.option.isstart = true;
                    ths.update(ths.option);
                });
            } else {
                require("@pipe").command("stopserver", null, function () {
                    ths.option.isdoing=false;
                    ths.option.isstart = false;
                    ths.update(ths.option);
                });
            }
        }
    }
});
Module({
    name: "list",
    extend: "view",
    className: "list",
    template: "@temp.list",
    style: "@main",
    option:{
        list:[]
    },
    services: {"list": "@project.listservice"},
    autodom:true,
    bind_remove:function (dom) {
        var ths=this;
        require("@pipe").command("removeproject",{
            name:dom.parent().cache().name
        },function () {
            ths.triggerService("list.refresh");
        })
    },
    bind_run:function (dom) {
        console.log(dom.parent().cache());
        var data=dom.parent().cache();
        require("@pipe").command("startbuilter",{path:data.path},function (a) {
            console.log(a);
        });
    }
});
Module({
    name:'popupname',
    extend:"view",
    template:"@temp.popupname",
    className:'popup',
    style:"@popupname",
    init:function () {
        this.render();
    },
    bind_ok:function () {
        var val=this.finders("input").val();
        if(val){
            this.finders("input").removeClass("popup-error");
            this.dispatchEvent('done',val);
        }else{
            this.finders("input").addClass("popup-error");
        }
    },
    bind_close:function () {
        this.remove();
    }
});