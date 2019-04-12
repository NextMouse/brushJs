/**
 * brush-assist.js
 *      brush.js辅助js。
 * Created by litaiqing on 2016-10-27.
 * email : ohbugs@foxmail.com
 */
$().ready(function () {
    window.brush_templ = {};
    $.extend({
        cut_html: function (html) {
            return html.replace(/\n+/g, "")
                .replace(/<!--.*?-->/ig, "")
                .replace(/\/\*.*?\*\//ig, "")
                .replace(/[ ]+</ig, "<")
                .trim();
        },
        depot: {
            root: 'b-view-',
            /**
             * 保存一个模版
             */
            set: function (key, value) {
                brush_templ[$.depot.root + key] = value;
            },
            /**
             * 读取一个模版
             */
            get: function (key) {
                return brush_templ[$.depot.root + key];
            },
            /**
             * 删除一个模版
             */
            rm: function (key) {
                try {
                    delete brush_templ[$.depot.root + key];
                } catch (e) {
                    brush_templ[$.depot.root + key] = null;
                }
            }
        }

    });
    $.extend($.brush, {
        // 快速刷新
        flush: function (name, data, i) {
            var dataObj = $.depot.get(name);
            $.brush.paste(dataObj.html, data, {
                i: i,
                name: dataObj.alias,
                callback: function (source, obj, setting) {
                    $('[b-view="' + name + '"]').html($('[b-view="' + name + '"]').html() + source)
                    return source;
                }
            })
        }
    });
    /**
     * 加载页面上所有模版
     */
    $('[b-view]').each(function () {
        var $view = $(this);
        var attr = $view.attr('b-view').split(' as ');
        attr[1] = attr[1] || 'data';
        var html = $.cut_html($view.html());
        $.depot.set(attr[0], {
            key: attr[0],
            alias: attr[1],
            html: html,
        });
        $view.empty();
    });

});