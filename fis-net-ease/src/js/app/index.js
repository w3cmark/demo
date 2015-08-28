Loader.show({
    iFileData: [//预加载图片资源（__uri是fis资源打包语法）
        'http://dummyimage.com/10x10/23d/79c',
        'http://dummyimage.com/10x10/22d/79c',
        'http://dummyimage.com/100x10/22d/79c',
        'http://dummyimage.com/10x100/22d/79c',
        __uri('../../img/bg.jpg'),
        __uri('../../img/button.png')

    ],
    bgColor: '#000',//loading背景色值，默认#000
    mainWrap: '#Jmain',//主题内容DOM，默认id值是Jmain
    defaultAnimation: true,//布尔值，默认值true。是否显示默认的loading动画
    customAnimation: function(curPer){//加载进度回调函数，取值0~1
        // console.log(curPer);
    },
    completeCallback: function(){//完成预加载回调函数

    }
})