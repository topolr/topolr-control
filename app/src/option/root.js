/**
 * @packet option.root;
 * @require app;
 */
Option({
    name:"boot",
    option:{
        override:{
            onendinit:function(){
                this.addChild({
                    type:"@app.main"
                });
            }
        }
    }
});