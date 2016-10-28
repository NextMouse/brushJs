### brushJs 
**一把简单的模版输出刷子** 
brushJs 代码非常简单,未压缩前不足70行代码，使用起来也非常简单。
![输入图片说明](http://git.oschina.net/uploads/images/2016/1028/103039_3e267767_134294.png "在这里输入图片标题")
一共只有两个方法：
    1. $.brushJs.paste(source, list);
       接收一个模版source和一个数组对象list
    2. $.brushJs.paste_data(source, obj, length);
       接收一个模版source、一个对象obj以及这个对象循环的次数（用于标识当前循环的角标i）

### 使用实例
1. 首先在页面的最底端引入brush.js
```
<script src="../brush.js" type="text/javascript"></script>
```
2. 然后，你需要准备一个自定义模版，像这样
```
var source = "{{data.a}} + {{data.b}} = {{data.a+data.b}}";
```
3. 然后，你还要加点料，准备好数据，像这样
```
var data = { a : 1, b : 2 };
```
4. 最后，组合在一起, 获得结果
```
var result = $.brush.format(source, data);
```
5. 展示到页面吧
```
document.getElementsByTagName('body')[0].innerHTML = result;
```
如图：
![输入图片说明](http://git.oschina.net/uploads/images/2016/1028/101636_999c1f67_134294.png "输出模版实例")

### 注意点：
1. 传入什么样的数据格式，就用什么样的数据格式去取数据，否则取不到。
2. 如果一个非数组对象里面包含数组，并且要循环这个数组，一定要用paste_data去指定数组的长度，也就是要循环的次数。