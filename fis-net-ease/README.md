# FIS项目架构DEMO

## 更新说明：

#### 2015.4.20

*	修改`fis-postprocessor-include`插件，支持本地与测试环境，优先加载本地的`global_include`下的include文件，include中的路径要相对于文件本身
*	修改`fis-postpackager-supply`插件，支持`include`插件的补充，补充资源的路径问题

#### 2015.4.16

*	新增`fis-parser-html-ejs`插件，主要作用：将html文件中的ejs模板语言结合对应的json文件，编译成需要的html代码替换到对应位置上，主要解决本地数据与html结构分离，但又需要将结果放在页面中，利于SEO，ejs模板语言跟原生js语法一致

```javascript
	//需要在fis-conf.js中的parser的值中，添加html : 'html-ejs'，具体可以查看`fis-conf.js`
	parser : {
        less : 'less',
        tmpl : 'bdtmpl',
        html : 'html-ejs'
    }
```

编译之前的：

```html
	//index.html，type="text/ejs"，data-json="config/data.json"指定了用到的数据文件，只支持json后缀文件
	<div id="test">
        <script type="text/ejs" data-json="config/data.json">
            <%
                for(var i=0;i<list.length;i++){
                    %><img src="<%=list[i]%>" /><%
                }
            %>
        </script>
    </div>
```

```javascript
	//config/data.json，变量中的key需要有引号，例如下面的"list"
	{
		"list":["data/demo.png"]
	}
```

编译后：

```html
	//index.html
	<div id="test">
        <img src="data/demo.png" />
    </div>
```

#### 2015.2.12

*	新增`fis-postpackager-html-encode`插件，主要作用：将html文件中的非英文、标点符号、数字等替换为HTML转义符号，主要解决乱码问题（插件默认没有在配置文件中）

```javascript
	//在fis-conf.js中的postpackager的值中，添加html-encode
	postpackager : 'simple,supply,html-encode'
```

#### 2015.1.19

*	新增`fis-postprocessor-replace`插件，主要作用：替换`js`文件中的变量

```javascript
	//如果是测试环境，__DEBUG为true，否则为false
	if(__DEBUG){
		console.log(1);
	}
	//获取cdn-path或者cdn-path-release的值，具体要看是测试或者发布环境
	var img = __CDNPATH + "images/1.jpg";
```

*	新增`fis-postpackager-supply`，主要作用：修复html文件中的a标签资源不会替换路径问题

```html
	//源代码
	<a href="images/aa.jpg">我是一个资源</a>
	//编译后，可能是这样
	<a href="http://test.nie.163.com/zgmh/images/aa_09d76s.jpg">我是一个资源</a>
```

---

>   这里展示的一个FIS项目最基础的文件与文件夹结构，以及fis配置

##	项目目录结构

```
	src    //存放该项目源码
	|--css  //存在所有less文件和css文件
	|	|--_reset.less  //重置页面默认样式（可以直接使用）
	|	|--_common.less  //项目中通用样式（需要自行修改）
	|	|--index.less  //项目中对应模块或者页面的样式（这个只是例子，需要自行修改与添加）
	|--img  //存放所有图片文件
	|--data //存放不希望打包后的文件有版本号
    |--config //存在配置文件
	|--inline  //存在所有需要被引用的模块html文件（例如多个页面公用的header，footer等等，或者是一个页面太长了，将各自模块放于此）
	|--js	//所有js文件
	|	|--app   //与项目逻辑相关的js文件，例如`index.js`
	|	|--common   //项目中公用的js文件
	|	|--lib	 //项目中需要用到的第三方库与插件，例如`baiduTemplate.js`，`jquery.slider.js`等
	|--template		//项目中需要用到的模板
	|	|--index.tmpl  //示例模板文件
	|--index.html 	//项目中需要的页面html文件
```

##	项目发布后的结构
```
	dist	//存放需要发布的文件
	|--css	//这里是所有编译好的less转css的文件
	|--img 	//所有需要发布的img
	|--pkg	//这里是已经自动打包合并好的js和css文件，以及lib合并文件
	|--data  //这里是存不需要添加版本号的资源(img,css,js)
	|--index.html 	//修改完毕的html
```

##	FIS相关知识

>	如何安装FIS，如何使用来开发，如何使用来打包发布等

### 1.安装FIS与相关插件

-	安装Nodejs，直接到官网下载安装[http://nodejs.org/](http://nodejs.org/)
-	安装FIS，在命令行下，输入：

```
	npm install -g fis
```

-	安装FIS需要的插件

```
	npm install -g lights
	npm install -g fis-postpackager-simple
	npm install -g fis-parser-less
	npm install -g fis-parser-bdtmpl
	npm install -g fis-postprocessor-include
	npm install -g fis-postprocessor-replace
	npm install -g fis-postpackager-supply
	npm install -g fis-postpackager-html-encode
    npm install -g fis-parser-html-ejs
```

###	2.如何初始化基于FIS的项目

>	希望基于FIS的项目，不需要手动自己去建立文件夹结构与下载`fis-conf.js`的配置文件

-	在空白文件夹中，输入命令：

```
	lights install fis-net-ease
```

-	修改`fis-net-ease`文件夹名为自己项目的名字


### 3.如何使用FIS

-	html文件，需要放在`src`根目录下

```html
	//表示将此html文件内容引用到该标签位置
	<link rel="import" href="inline/index.html?__inline">
	//script标签中有data-fixed属性，表示，该文件不会进行自动打包，其余的会合并成为一个js文件
	<script charset="gb2312" type="text/javascript" data-fixed="true" src="js/lib/baiduTemplate.js"></script>
```

-	less文件，放在`css`文件夹中
>	注意：带下划线`_`开头文件，不会编译成为单独文件，表示它会给`其他less`文件合并

-	css文件

	*	需要自动合并为雪碧图的图片，在引用文件名后添加`?__sprite`，单个`css文件`中所有添加此标记的，会合并成一个单独文件
	*	那些被合并的原图，文件名必须以下划线`_`开头，这样打包发布，就不会出现未合并之前的图片，详情参考源码

-	js文件
    *   `lib`文件夹下的js文件会全部合并复制到打包目录`pkg/`下，名为`lib.js`
    *   非lib文件夹的js，都会自动合并打包到`pgk`目录下
    *	如果非lib文件，页面引用总数量`只有一个`，那么需要自行修改配置，详见`第3点`

```javascript
	//引入模板，执行模板函数，返回拼接后的html，页面需要引用`baiduTemplate.js`文件
	var under = __inline('../../template/index.tmpl');
	under({title :'test'});
	//js中，需要引用到文件的，需要这样写，打包时候才会替换为CDN路径
	var img_url = __uri('../../data/demo.png');
```

###	4.FIS中需要自己修改的配置

>	这里列出配置文件中需要自己手动修改的配置，在`fis-conf.js`中有注释，未提到的，默认情况下不要修改

-	CDN路径：修改变量`cdn-path`，改为自己项目中的测试环境绝对路径，修改变量`cdn-path-release`，改为正式环境绝对路径
-	雪碧图倍数：移动端合并的雪碧图，不需要设置`background-size`，只需要修改变量`css-scale`值为`0.5`即可，默认是`1`
-	资源文件合并：目前只针对`js`文件，如果`lib文件`涉及引用顺序，需要修改变量`pack`中的数组，按顺序写合并文件即可，如果项目中只有一个非lib文件，则需要在`pack`中独立添加到pkg文件下
-	include文件的域名：页面中需要`include`新闻发布系统中的页面，修改`include-host`为include的域名


### 5.如何开始FIS

-	开发调试，进入项目的文件夹，输入命令：

```
	//这句是启动一个本地服务，输入完后，会自动打开浏览器，定位到：http://127.0.0.1:8080
	fis server start --type node
	//这句是编译源码`src`文件夹下的，然后监听文件变化，自动编译，以及开启livereload，自动刷新浏览器（IE不支持）
	fis release -wL
```

### 6.打包发布代码

*   更新线上最新的dist文件夹代码，如果没有，请无视
*	修改fis-conf.js中的配置，将`domain`中的值，修改为线上正式资源地址，末尾不能有`/`
*   `删除dist`文件夹（务必）
*   在项目目录下，输入以下命令：

```
    //发布打包，o表示压缩，m表示采用md5作为版本号，p代表打包，D表示修改cdn全路径，d表示发布到dist路径下
	fis release -ompDd dist //打为测试环境的包
	fis release -ompDd release //打为发布环境的包
```

*	输入完后，会自动打包到dist目录下
*	将除了html文件，都发布到静态资源服务器中，html就单独发布到项目对应的目录，如果出现文件相同，请选择跳过就好了，不需要知道自己具体修改了哪些文件

### 待补充

*	baidu的模板引擎官网：[http://baidufe.github.io/BaiduTemplate/](http://baidufe.github.io/BaiduTemplate/)
*	less使用：[http://less.bootcss.com/](http://less.bootcss.com/)