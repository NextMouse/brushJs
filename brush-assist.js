/**
 * brush-assist.js
 *      brush.js辅助js。
 * Created by litaiqing on 2016-10-27.
 * email : ltqaaa@qq.com (欢迎指正与批评不足。)
 */
$().ready(function(){
    window.brush_templ = {};
    $.extend({
        cut_html : function(html){
                    return html.replace(/\n+/g,"")
                               .replace(/<!--.*?-->/ig,"")
                               .replace(/\/\*.*?\*\//ig,"")
                               .replace(/[ ]+</ig,"<");
                    },
        depot : {
                    root : 'b-view-',
                    /**
                     * 保存一个模版
                     */
                    set : function(key, value){
                        brush_templ[$.depot.root + key] = value;
                    },
                    /**
                     * 读取一个模版
                     */
                    get : function(key){
                        return brush_templ[$.depot.root + key];
                    },
                    /**
                     * 删除一个模版
                     */
                    rm : function(key){
                        try {
                            delete brush_templ[$.depot.root + key];
                        } catch (e) {
                            brush_templ[$.depot.root + key] = null;
                        }
                    }
                }
    });
    /**
     * 加载页面上所有模版
     */
    $('[b-view]').each(function(){
        var $view = $(this);
        var key = $view.attr('b-view');
        var html = $.cut_html($view.html());
        $.depot.set(key, html);
        $view.empty();
    });

});
