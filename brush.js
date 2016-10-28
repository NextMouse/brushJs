/**
 * brush.js
 *      基于jQuery的字符模版输出。
 * 特点：
 *      简单（也可以说粗暴）的实现了模版刷子。
 *      适用多种复杂场合
 * Created by litaiqing on 2016-10-27.
 * email : ltqaaa@qq.com (欢迎指正与批评不足。)
 */
+function($){
    var brush = {
        /**
         * 内部方法，除去匹配字符串两边的大括号
         * @param text
         * @returns {string}
         */
        strip : function(text){
            var trimLeft = /^\{[^\{]?\{/, trimRight = /\}[^\{]?\}$/;
            return text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
        },
        /**
         * 格式化批量输出一个模版，并执行模版中的代码
         * @param source
         * @param obj
         * @param length
         * @returns {string}
         */
        paste_data : function(source, obj, length){
            var goods = '';
            for(var i = 0; i < length; i++) {
                goods += $.brush.format(source, obj, i);
            };
            return goods;
        },
        /**
         * 格式化批量输出一个模版，并执行模版中的代码
         * @param source
         * @param list
         * @returns {*}
         */
        paste : function (source, list){
            if($.type(list) == 'object'){
                return $.brush.format(source, list);
            }else if($.type(list) == 'array'){
                if(list.length == 0){ return ''; } // 如果list不包含元素，则返回'';
                return $.brush.paste_data(source, list, list.length);
            }
            return '';
        },
        /**
         * 格式化输出一个模版，并执行模版中的代码
         * @param source
         * @param obj
         * @param i
         * @returns {*}
         */
        format : function (source, obj, i) {
            if($.isEmptyObject(obj)){ return ''; };
            var reg = new RegExp('(\{\{).*?(\}\})', 'g');
            var result = source.match(reg);
            for(var x = 0, l = result.length; x < l; x++){
                var item = result[x];
                var code = $.brush.strip(item);
                source = source.replace(item, function(){
                    return new Function('data', 'i', 'return ' + code + ' ;')(obj, i);
                });
            };
            return source;
        },
        isBlank : function( text ){
            if (text == null ||
                typeof (text) == 'undefined' ||
                text == undefined) {
                return true;
            } else if ($.type(text) == 'string' && text.replace(/^\s*|\s*$/g, '').length == 0) {
                return true;
            }
            return false;
        }
    };
    $.extend({brush : brush});
}($);
