//加载img的所有图片列表
var img_list = __resload('img');
Loader.show({
    iFileData: img_list,
    bgColor: '#000',//loading背景色值，默认#000
    mainWrap: '#Jmain',//主题内容DOM，默认id值是Jmain
    defaultAnimation: true,//布尔值，默认值true。是否显示默认的loading动画
    customAnimation: function(curPer){//加载进度回调函数，取值0~1
        // console.log(curPer);
    },
    completeCallback: function(){//完成预加载回调函数
        Index.init();
    }
})

var _chose;
var Index = function(){
    var _ua = navigator.userAgent.toLowerCase(),
        _isWx = /micromessenger/i.test(_ua),
        $main = $('#Jmain'),
        _messaudio = $("#Jaudiomess").get(0),
        $audio = $("#Jaudio"),
        $stages = $main.find('.stage'),
        $slidebtn = $('#Jslidebtn'),
        $messbtn = $('#Jmessbtn'),
        $messinputTxt = $('#Jmessinputtxt'),
        $messwin = $('#Jmesswin'),
        _isSent = false,
        _imgClass = '',
        _isClickAudio = false,
        _isPlaying = false,        
        dummyStyle = document.createElement('div').style,
        vendor = (function () {
            var vendors = 't,webkitT,MozT,msT,OT'.split(','),
                t,
                i = 0,
                l = vendors.length;
            for ( ; i < l; i++ ) {
                t = vendors[i] + 'ransform';
                if ( t in dummyStyle ) {
                    //alert(vendors[i])
                    return vendors[i].substr(0, vendors[i].length - 1);
                }
            }
            return false;
        })(),
        /**样式兼容**/
        _css3pre = vendor ? '-' + vendor.toLowerCase() + '-' : '',
        csstrans = {},
        _audioTimeout,
        _messName = '',
        _dataArr = {
            'gril':{
                'name':[
                    '貂蝉',
                    '小乔',
                    '大乔'
                ],
                '貂蝉':{
                    'icon':'s-icon-dc',
                    'txt0':'布布，你的臂孔武有力，你的胸宽广伟岸，你就是我心目中的英雄。',
                    'txt1':[
                        '我就是你的吕布，跟我走吧。',
                        '我不是吕布，你认错人了。'
                    ],
                    'txt2':[
                        ['布布，我要追随你到天涯海角。',
                        '我就知道你一定会来找我的。'],
                        ['布布不在身边，每一天都很难熬，你能帮我找到布布吗？',
                        '那你帮我把我的心声传达给布布吗？']
                    ],
                    'txt3':[
                        '别怕，我一定会好好对你的。',
                        '我尽力帮你去找，只是万一找不到呢？'
                    ],
                    'audio':[
                        '/data/dc1.mp3',
                        '/data/dc2.mp3'
                    ],
                    'audio_time':[
                        '3',
                        '8'
                    ],
                    'audio_txt':[
                        '官人，你就从了我吧。',
                        '此等良辰美景，官人还在等待什么？春宵一刻值千金啊'
                    ]
                },
                '小乔':{
                    'icon':'s-icon-xq',
                    'txt0':'无论多少年，周公谨都是我心中的唯一。',
                    'txt1':[
                        '周公瑾有什么好？跟我走吧',
                        '你真是个痴情的女子，愿你一切都好。'
                    ],
                    'txt2':[
                        ['我与周公瑾的感情旁人不懂。',
                        '他的好，他的笑一直铭记在我的脑海里。此生此世，永生永世无法忘怀'],
                        ['你真好，余生那么长，一定会有一个人让你难忘。',
                        '谢谢官人，我只是在恰当的时候遇到了合适的他而已。']
                    ],
                    'txt3':[
                        '你真是个痴情的女子。',
                        '爱笑的女孩运气都不会太差哦。'
                    ],
                    'audio':[
                        '/data/xq1.mp3',
                        '/data/xq2.mp3'
                    ],
                    'audio_time':[
                        '9',
                        '5'
                    ],
                    'audio_txt':[
                        '呵呵，就这样，我去洗澡了',
                        '只怪余生太长，只怨你好难忘。'
                    ]
                },
                '大乔':{
                    'icon':'s-icon-dq',
                    'txt0':'孙郎去后我本想一生守寡，奈何长夜漫漫，孤独寂寞冷，现诚意招亲，欢迎广大高富帅报名参与。',
                    'txt1':[
                        '你怎么能如此放荡不羁？我喜欢，我报名。',
                        '世风日下，人心不古。悲哀悲哀。'
                    ],
                    'txt2':[
                        ['只愿我这朵红杏攀得了你家的墙。',
                        '待君晨起绕床来，妾将挽发笑开颜。'],
                        ['谁规定只有男人才能三妻四妾？女人就不能寻找真爱？',
                        '我只做我的大乔。无关风月，无关闲语。']
                    ],
                    'txt3':[
                        '乔儿，真乖。',
                        '你如果相信我的话，我愿意带你和你妹妹走。'
                    ],
                    'audio':[
                        '/data/dq1.mp3',
                        '/data/dq2.mp3'
                    ],
                    'audio_time':[
                        '4',
                        '7'
                    ],
                    'audio_txt':[
                        '洞房花烛，温床软语，美人在卧，官人还来不睡吗？',
                        '你，会是我的英雄吗？'
                    ]
                }
            },
            'boy':{
                'name':[
                    '张飞',
                    '诸葛亮',
                    '王司徒'
                ],                
                '张飞':{
                    'icon':'s-icon-zf',
                    'txt0':'何为大将，就是造反。谁敢与我决一死战。',
                    'txt1':[
                        '你这么man，家里人知道吗？',
                        '你这么凶，一定是单身狗无疑了'
                    ],
                    'txt2':[
                        ['其实我偶尔也是可以柔情似水的，姑娘么么哒~',
                        '家父必然是知道的。'],
                        ['这是重点吗？',
                        '你愿意帮我渡明年的七夕劫吗？']
                    ],
                    'txt3':[
                        '你说什么？我的手机有点卡，看不清你的字。',
                        '你这么一说我突然想起来20年没过七夕了。'
                    ],
                    'audio':[
                        '/data/zf1.mp3',
                        '/data/zf2.mp3'
                    ],
                    'audio_time':[
                        '6',
                        '3'
                    ],
                    'audio_txt':[
                        '你泡不到男神，钓不到马子，你就连本飞的语音都收不到，你能不能换个手机？',
                        '姑娘，咱们七夕不见不散啊~'
                    ]
                },
                '诸葛亮':{
                    'icon':'s-icon-zg',
                    'txt0':'我奉召饶舌，饶舌，饶舌，饶舌，舌，舌，舌....',
                    'txt1':[
                        '真有节奏感，你是未来的rap之星。',
                        '乱七八糟，不知所云。'
                    ],
                    'txt2':[
                        ['谢姑娘美誉，这是在下的荣幸。',
                        '我可以教你啊，一对一教学，童叟无欺。'],
                        ['你不懂我如王司徒般无情无义，我真的好伤心。',
                        '孔明从不做无利益之事，你已经中了我的迷魂计。']
                    ],
                    'txt3':[
                        '真的吗？',
                        '我这么善良单纯可爱，你怎么忍心伤害我？'
                    ],
                    'audio':[
                        '/data/zg1.mp3',
                        '/data/zg2.mp3'
                    ],
                    'audio_time':[
                        '6',
                        '10'
                    ],
                    'audio_txt':[
                        '（鬼畜魔性节奏感笑声）当然，哈哈哈哈哈',
                        '在下诸葛孔明，我一不拼爹二不坑妈三不家暴，我只是个儒雅的军师。yeah~'
                    ]
                },
                '王司徒':{
                    'icon':'s-icon-wst',
                    'txt0':'我竟从未见过如此厚颜无耻之人',
                    'txt1':[
                        '酸酸甜甜就是我，我就是厚颜无耻之人。',
                        '你太讨厌了，从没有人说过我无耻。'
                    ],
                    'txt2':[
                        ['是在下输了。',
                        '我王朗才疏学浅，你让我大开眼界。'],
                        ['姑娘莫生气，王朗并非要羞辱姑娘。',
                        '王朗有幸成为第一人，甚是喜悦。']
                    ],
                    'txt3':[
                        '我皮厚我自豪，我出门不戴遮阳帽。',
                        '真的不想理你。really。'
                    ],
                    'audio':[
                        '/data/wst1.mp3',
                        '/data/wst2.mp3'
                    ],
                    'audio_time':[
                        '10',
                        '7'
                    ],
                    'audio_txt':[
                        '你还要听多少遍，是在下输了。是在下输了。是在下...',
                        '转告诸葛村夫，我的低调绝不是他装B的资本。'
                    ]
                }
            }
        },
        shareInfo = {
            title: $('#share_title').html(),//分享标题
            desc: $('#share_desc').html(),//分享正文
            url: window.location.href,//分享URL
            imgurl: $('#share_pic').attr('data-src')//分享图片
        },
    init = function(){
        initScreen();

        $(window).bind('touchmove',function(e){
            e.preventDefault();
        })

        showEle($stages.eq(0));
        // stage0
        $stages.eq(0).find('.m-bigbtn-btns').bind('touchend',function(){
            $stages.eq(0).find('.icon-round').hide();
            if($(this).hasClass('m-left-btn')){
                $stages.eq(0).addClass('stage-left').removeClass('stage-right');
                _chose = 'gril';
            }else{
                $stages.eq(0).addClass('stage-right').removeClass('stage-left');
                _chose = 'boy';
            }
        })

        $stages.eq(0).find('.m-btn').bind('touchend',function(){
            if(_chose == undefined){
                // console.log(_chose);
                showTips('请点击阴阳八卦，选择您的性别喔！');
                return;
            }
            $stages.eq(0).hide();
            showEle($stages.eq(1));
            _messaudio.play();
            _messName = _dataArr[_chose]['name'][randomNum(0,2)];
            _imgClass = _dataArr[_chose][_messName]['icon'];
            $stages.eq(4).find('.p1').html('炫耀一下'+ _messName +'给你的说的悄悄话吧');
            $stages.eq(4).find('.p2').html('我还要穿越到三国和'+ _messName +'玩一会~');

            $('#Jmessname').html(_messName+'发来一段语音');
            $messwin.find('p .s-icon').addClass(_imgClass);
            $messwin.find('p .s-txt').html(_dataArr[_chose][_messName]['txt0']);
            choseMess();
            // console.log()
        })
        // stage1
        // 解锁
        $slidebtn[0].addEventListener('touchstart', _events, false);
        $slidebtn[0].addEventListener('touchmove', _events, false);
        $slidebtn[0].addEventListener('touchend', _events, false);

        $messbtn[0].addEventListener('touchstart', _events, false);
        $messbtn[0].addEventListener('touchmove', _events, false);
        $messbtn[0].addEventListener('touchend', _events, false);

        // stage3        
        $stages.eq(3).find('.m-messinput-tool').bind('touchend',function(){
            if(_isSent){return};
            var $this = $(this).parent();
            if($this.hasClass('show')){
                $this.removeClass('show');
            }else{
                $this.addClass('show');
            }
        })

        $stages.eq(3).find('.m-messinput a').bind('touchend',function(){
            var txt = $messinputTxt.html(),
                num = $stages.eq(3).find('.m-messinput p.active').attr('data-num');
            if(txt == ''){
                showTips('请点击选择需要发送的内容！');
                return;
            }
            addMess(txt);
            _isSent = true;
            $stages.eq(3).find('.m-messinput').removeClass('show');
            $messinputTxt.html('');

            setTimeout(function(){                
                addMess(_dataArr[_chose][_messName]['txt2'][num][randomNum(0,1)]);
                _messaudio.play();
            },2000)

            setTimeout(function(){
                $messinputTxt.html(_dataArr[_chose][_messName]['txt3'][num]);
                var $messinput_tool = $stages.eq(3).find('.m-messinput-tool');
                $messinput_tool.addClass('m-messinput-toolA');
                $('#Jmesssent').bind('touchend',function(){
                    addMess(_dataArr[_chose][_messName]['txt3'][num]);
                    $messinput_tool.removeClass('m-messinput-toolA');
                    $messinputTxt.html('');
                    addAudio(_dataArr[_chose][_messName]['audio'][num],_dataArr[_chose][_messName]['audio_time'][num]);
                    $(this).unbind('touchend');

                    // share
                    shareInfo.title = _dataArr[_chose][_messName]['audio_txt'][num];
                    shareFun();
                })
                // addMess('');
            },3500)

            
        })
        // stage4
        $('#Jstage4btnA').bind('touchend',function(){            
            if(_isWx){
                showEle($('#Jstage4pop'));
            }else{
                showTips('请在微信客户端打开分享~');
            }
        })
        $('#Jstage4pop').bind('touchend',function(){
            $(this).hide();
        })

        // $('#Jstage4btnB').bind('touchend',function(){
        //     window.location.reload();
        // })
        onorientationchange();
        shareFun();
    },
    initScreen = function(){
        $("html").css("font-size",$(window).height()/$(window).width()<1.5 ? ($(window).height()/603*312.5+"%") : ($(window).width()/375*312.5+"%"));
        $('html,body,#Jmain').css("min-height",window.innerHeight);
    },
    showEle = function(ele){
        ele.show();
        setTimeout(function(){
            ele.addClass('show');
        },10)
    },
    hideEle = function(ele){
        ele.removeClass('show');
        setTimeout(function(){
            ele.hide();
        },300)
    },    
    addMess = function(txt){
        var ele_p = document.createElement('p');
        ele_p.innerHTML ='<span class="s-icon '+ _imgClass +'"></span>'
                        +    '<span class="s-txt">'+ txt +'</span>';
        $messwin.append(ele_p);
    },
    addAudio = function(url,time){
        setTimeout(function(){
            var p_html = '<p>'
                        +    '<span class="s-icon '+ _imgClass +'"></span>'
                        +    '<span class="s-yuyin"><em></em></span>'
                        +    '<span class="s-time"> '+ time +'"</span>'
                        +'</p>'; 
            $messwin.append(p_html);
            _messaudio.play();
            $audio.attr('src', __CDNPATH+url);
            $messwin.find('.s-yuyin').bind('touchend',function(){
                if(_isPlaying){return};
                var $this = $(this);
                $this.addClass('play');
                $audio.get(0).play();
                audioIsOver($audio.get(0));
                _isPlaying = true;
            })
        },1500)
    },
    audioIsOver = function(ele){
        clearTimeout(_audioTimeout);
        ele.addEventListener('ended', function () {
            // _isClickAudio = true;
            _isPlaying = false;
            $messwin.find('.s-yuyin').removeClass('play');
            _audioTimeout = setTimeout(function(){
                $stages.eq(3).hide();
                showEle($stages.eq(4));
            },2500)
        }, false);
    },
    choseMess = function(){
        var $mess_P = $stages.eq(3).find('.m-messinput p');
        $mess_P.eq(0).html(_dataArr[_chose][_messName]['txt1'][0]);
        $mess_P.eq(1).html(_dataArr[_chose][_messName]['txt1'][1]);
        $mess_P.bind('touchend',function(){
            var $this = $(this);
            $mess_P.removeClass('active');
            $this.addClass('active');
            $messinputTxt.html($this.text());
        })
    },
    audioInit = function(){
        var _this = this,
            hasTouch = 'ontouchstart' in window,
            startEvent = hasTouch ? 'touchstart' : 'mousedown',
            moveEvent = hasTouch ? 'touchmove' : 'mousemove',
            endEvent = hasTouch ? 'touchend' : 'mouseup',
            cancelEvent = hasTouch ? 'touchcancel' : 'mouseup',            
            isPlay = false;

        $('body').bind(startEvent,function(e){
            if(e.target.id == 'Jplaybtn'){
                _audio.pause();
                $audio_btn.removeClass('on');
                isPlay = false;
                _audio.setAttribute('src','');
            }else if(!isPlay){
                $audio_btn.addClass('on');
                _audio.play();
                isPlay = true;
            }            
        })

        $audio_btn.bind(startEvent, function() {
            var $this = $(this);
            if(!_audio.paused){
                _audio.pause();
                $this.removeClass('on');
            }else{
                _audio.play();
                $this.addClass('on');
            }
        });
    },
    randomNum = function(n,m){
        var c = m - n + 1;
        return Math.floor(Math.random() * c + n);
    },
    showTips = function(msg){
        var tips = document.getElementById('Jtips');
        if(!tips) {
            tips = document.createElement('div');
            tips.id = 'Jtips';
            tips.className = 'm-tips';
            tips.style.cssText = 'background:rgba(0,0,0,0.8); color: #fff;position: fixed; left: 50%; top: 40%; font-size: 0.28rem;width:4rem; padding: 0.6rem; line-height: 0.48rem; margin-top: -0.8rem;opacity: 0; display: none;z-index: 9999;text-align:center;border-radius:0.2rem;';
            document.body.appendChild(tips);
        }
        tips.innerHTML = msg;
        tips.style.display = 'block';
        if(arguments[1]){
             tips.style.width = arguments[1];
        }
        var tips_width = tips.clientWidth/2;
        tips.style.marginLeft = '-'+tips_width+'px';
        tips.style.opacity = 1;
        setTimeout(function(){
            tips.style.webkitTransition = 'all 0.3s ease-in';
            tips.style.opacity = 0;
            tips.style.marginTop = '-0.8rem';
            setTimeout(function(){
                tips.style.display = 'none';
                tips.style.marginTop = '-0.4rem';
            }, 300);
        }, 2000);
    },
    onorientationchange = function(){
        var $forhorview = $("#forhorview");
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(){
            if(window.orientation==90||window.orientation==-90){
                $forhorview.show();
            } 
            else{
                $forhorview.hide();    
            }
        }, false);
        
    },
    _events = {
        click_target: "",
        isScrolling:false,
        
        handleEvent: function(event) {
            switch (event.type) {
                case 'touchstart':
                    this.start(event);
                    break;
                case 'touchmove':
                    this.move(event);
                    break;
                case 'touchend':
                    this.end(event);
                    break;
            }
        },
        start: function(event) {
            var touches = event.touches[0];
            startP = {
                x: touches.pageX,
                y: touches.pageY,
                time: +new Date
            };
            delta = {
                x: 0,
                y: 0
            };
            this.click_target = "";
        },
        move: function(event) {
            if (event.touches.length > 1 || event.scale && event.scale !== 1) {
                return;
            }
            
            var touches = event.touches[0];

            delta = {
                x: touches.pageX - startP.x,
                y: touches.pageY - startP.y
            }
            // console.log(delta.x)
            if(delta.x > 0){
                event.preventDefault();                
                csstrans[_css3pre+"transform"]="translate("+delta.x+"px,0)";
                if(event.target.id == 'Jslidebtn'){
                    $slidebtn.css(csstrans);
                }else{
                    $messbtn.css(csstrans);
                }
            }
            
        },
        end: function(event) {
            var isChgX = delta.x > 30;
            if (isChgX) {
                $stages.eq(1).hide();
                setTimeout(function(){
                    showEle($stages.eq(2));
                    Unlock.init();
                },50)
            }else{
                csstrans[_css3pre+"transform"]="translate(0px,0)";
                if(event.target.id == 'Jslidebtn'){
                    $slidebtn.css(csstrans);
                }else{
                    $messbtn.css(csstrans);
                }
            }
            
        }
    },
    shareFun = function(){
        nie.use(["nie.util.mobiShare"],function(){
            $(function(){
                MobileShare.setting({//设置分享文案
                    title: shareInfo.title,//分享标题
                    desc: shareInfo.desc,//分享正文
                    url: shareInfo.url,//分享URL
                    imgurl: shareInfo.imgurl,//分享图片
                    callback:function(o){
                        //o.type：-1是分享失败，0是取消分享，1是分享到朋友圈，2是发送给好友
                    }//分享后的回调
                 })
            });
        });
    };
    return{
        init: init
    }
	
}();

// Index.init();