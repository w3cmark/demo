### 用于协助trueLoad（HTML5专题loading效果）组件，把外链css、外链js抽出来，显示完loading logo再发出外链请求

>   属于Fis的插件

```javascript
	//在javascript文件中
	//如果是测试环境，__DEBUG为true，否则为false
    if(__DEBUG){
        console.log(1);
    }
    //获取cdn的值，具体要看是测试或者发布环境
    var img = __CDNPATH + "images/1.jpg";
```

```javascript
    //配置
    postprocessor : {
        replace : {
            local_cdn : 'http://127.0.0.1',
            debug_cdn : 'http://www.163.com/test',
            release_cdn : 'http://www.163.com/release'
        }
    }
```
