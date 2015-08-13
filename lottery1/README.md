# 抽奖效果组件 v1

by lijun 20150812

## 功能

+ 抽奖效果

## 调用例子

### HTML


```html

<div class="lottery-wrap" id="Jlotterywrap">
        <a class="lottery-btn" href="javascript:;">
            立即抽奖<em >您还有<label class="lottery-remain">0</label>次机会</em>
        </a>
        <span data-num = "1" class="lottery-span0 lottery-award"></span>
        <span data-num = "2" class="lottery-span1 lottery-award"></span>
        <span data-num = "3" class="lottery-span2 lottery-award"></span>
        <span data-num = "4" class="lottery-span3 lottery-award"></span>
        <span data-num = "5" class="lottery-span4 lottery-award"></span>
        <span data-num = "6" class="lottery-span5 lottery-award"></span>
        <span data-num = "7" class="lottery-span6 lottery-award"></span>
        <span data-num = "8" class="lottery-span7 lottery-award"></span>
        <span data-num = "9" class="lottery-span8 lottery-award"></span>
        <span data-num = "10" class="lottery-span9 lottery-award"></span>
</div>
```

### CSS


```css

.lottery-wrap{position:relative; height:408px; background:#8c63ae; border:1px solid #8c63ae;}
.lottery-award,.lottery-btn{position:absolute; display:block;background:#aaa; overflow:hidden;}
.lottery-btn{left:175px; top:135px; width:352px; height:136px; background:#f60;}
.lottery-btn em{text-indent: 0;position: absolute;left: 0;top: 89px;width: 100%;text-align: center;color: #fff;font-size: 16px;font-style: normal;}
.lottery-btn:hover{background-position:-175px -541px;}
.lottery-award{width:174px; height:134px;}
.lottery-span0{left:0; top:0;}
.lottery-span1{left:176px; top:0;}
.lottery-span2{left:352px; top:0;}
.lottery-span3{left:528px; top:0;}
.lottery-span4{left:528px; top:136px;}
.lottery-span5{left:528px; top:272px;}
.lottery-span6{left:352px; top:272px;}
.lottery-span7{left:176px; top:272px;}
.lottery-span8{left:0; top:272px;}
.lottery-span9{left:0; top:136px;}
.lottery-award.current{background:#fff;}
```

### JS


```javascript

nie.use(['util.Lottery'],function(){
    // 实例化一
    var loA = Lottery.create({
        wrap: '#Jlotterywrap',      //抽奖主区域DOM【必填】
        awards: '.lottery-award',   //奖项DOM【必填】
        initCallback: function(){   //初始化回调【选填】
            // console.log('init1...');
        },
        successCallback: function(data){ //抽奖成功回调【选填】
            alert(data)
        }
    })

    $('#Jlotterywrap .lottery-btn').bind('click',function(){
        loA.startLottery();//开始抽奖
        $.ajax({
            url: 'http://xdw-lottery.webapp.163.com/user/lottery',//抽奖接口
            dataType: "jsonp",
            success: function (data) {
                if (data.success) {
                    loA.stopRotate(data.lottery);//结束抽奖
                }else{
                    loA.stopRotate();//结束抽奖
                    alert('抽奖失败');
                }
            },
            error: function () {                      
                alert('网络信号不好，请刷新再试');
            }
        });
    })
})

```

## 参数列表

参数        | 说明                                           | 备注
--------    |------------------------------------------------|------
wrap        | 奖项DOM                                     | 必填
awards      | 开始抽奖按钮DOM                             | 必填
initCallback| 初始化回调                                  | 选填
successCallback| 抽奖成功回调，返回参数是抽中奖项data     | 选填


## 方法列表

方法        | 说明                                           
--------    |---------------------------------------------
startLottery()  | 开始抽奖                          
stopRotate(data)    | 结束抽奖抽奖，参数data为抽中奖项，如果为空则是抽奖失败


> + 本组件在同一个页面可以多次实例化调用
> + 本组件是基于jq或者zepto，调用前请确保已经引入库类
> + PC或移动的抽奖效果都可以使用


## 效果图

![img](http://7te8aj.com1.z0.glb.clouddn.com/lottery.png)

> 使用过程如有疑问请反馈 grp.wzj@corp.netease.com