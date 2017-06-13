/**
 * @packet icon.iconpreviewer;
 * @require icon.action;
 * @require icon.direct;
 * @require icon.editor;
 * @require icon.files;
 * @require icon.loading;
 * @require icon.player;
 * @require icon.tm;
 * @require icon.weather;
 * @template icon.template.temp;
 * @css icon.style.style;
 */
$.TopolrIconsPreview=function(){
    if($(".mt-icon-previewer").length<=0) {
        var data = {};
        $("svg").each(function () {
            if ($(this).attr("packet")) {
                var t = [];
                $(this).find("symbol").each(function () {
                    var symbol = $(this);
                    var id = symbol.attr("id");
                    t.push({
                        id: id,
                        name: id
                    });
                });
                data[$(this).attr("packet")] = t;
            }
        });
        var templatestr = module.getTemplate("@temp", "previewer");
        var et=$($.template(templatestr).render(data)).appendTo("body");
        et.find(".mt-icon-previewer-arrow").click(function () {
            et.toggleClass("mt-icon-previewer-open");
        });
    }
};