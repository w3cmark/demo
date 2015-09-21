var Index = function(){
    var _ua = navigator.userAgent.toLowerCase(),
        _isWx = /micromessenger/i.test(_ua),
        _isYx = /yixin/i.test(_ua),
        $main = $('#Jmain'),
        $share = $("#share"),
        $btn_close_sign,
        _audio = $("#Jaudio").get(0),
        _audioB = $("#JaudioB").get(0),
        $audio_btn = $("#Jaudiobtn"),
        $stages = $main.find('.stage'),
        $stage6pop = $('#Jstage6pop'),
        $slidebtn = $('#Jslidebtn'),
        _hasmove = false,
        _audioEnd = false,
        _audioTimeout,
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
        csstrans={},
    init = function(){
        initScreen();
        // audioInit();

        $(window).bind('touchmove',function(e){
            e.preventDefault();
        })

        showEle($stages.eq(0));
        // 解锁
        $slidebtn[0].addEventListener('touchstart', _events, false);
        $slidebtn[0].addEventListener('touchmove', _events, false);
        $slidebtn[0].addEventListener('touchend', _events, false);

        // $('#Jslidebtn').bind('touchmove',function(){
        //     $stages.eq(0).hide();
        //     setTimeout(function(){
        //         showEle($stages.eq(1));
        //     },50)
        // })

        // $('#Jslidebtn').bind('touchend',function(){
        //     $stages.eq(0).hide();
        //     setTimeout(function(){
        //         showEle($stages.eq(1));
        //     },50)
        // })

        $('#Jmessbtn').bind('touchend',function(){
            showEle($('#Jphonebtn'));
        })

        $('#Jphonebtn').bind('touchend',function(){
            $('#Jphonebtn').hide();
            showEle($('#Jpopphone'));            
        })
        // $('#Jpopphone .cacel-btn').bind('touchend',function(){
        //     hideEle($('#Jpopphone'));
        // })
        $('#Jpopphone .call-btn').bind('touchend',function(){
            $stages.eq(1).hide();
            showEle($stages.eq(2));
            _audio.play();//电话录音
            _audioTimeout = setTimeout(function(){
                if(_audioEnd){return}
                _audio.pause();
                $stages.eq(2).hide();
                showEle($stages.eq(3));
            },19000)
        })

        _audio.addEventListener('ended', function () {
            clearTimeout(_audioTimeout);
            _audioEnd = true;
            $stages.eq(2).hide();
            showEle($stages.eq(3));
        }, false);

        $('#Jphonecacelbtn').bind('touchend',function(){
            clearTimeout(_audioTimeout);
            _audio.pause();
            $stages.eq(2).hide();
            showEle($stages.eq(3));
        })

        $('#Jpopchose .pop-chose-con a').bind('click',function(){
            $stages.eq(3).hide();
            if($(this).index() == 1){
                showEle($stages.eq(4));
                _audioB.play();
            }else{
                showEle($stages.eq(5));
                setTimeout(function(){
                    showEle($stage6pop);
                },450)
                // setTimeout(function(){
                //     $stages.eq(5).hide();
                //     showEle($stages.eq(6));
                // },2500)
                // setTimeout(function(){
                //     $stages.eq(6).hide();
                //     showEle($stages.eq(7));
                // },5500)
            }
        })

        $stages.eq(4).bind('click',function(){
            _audioB.pause();
            $stages.eq(4).hide();
            showEle($stages.eq(8));
        })


        // $stages.eq(5).bind('touchend',function(){
        //     showEle($stage6pop);
        // })
        $stage6pop.find('a').bind('touchend',function(){
            $stages.eq(5).hide();
            showEle($stages.eq(6));
        })

        $stages.eq(6).bind('touchend',function(){
            $stages.eq(6).hide();
            showEle($stages.eq(7));
        })

        $('#Jstage8btn').bind('touchend',function(){
            showEle($('#Jstage8pop'));
        })

        $('#Jstage8pop').bind('touchend',function(){
            $stages.eq(7).hide();
            showEle($stages.eq(8));
        })
        // 分享按钮
        $('#Jsharebtn').bind('touchend',function(){
            if(_isWx){
                showEle($('#Jsharepop'));
            }else{
                showTips('请在微信客户端打开分享~');
            }
            
        })
        $('#Jsharepop').bind('touchend',function(){
            hideEle($(this));
        })
        onorientationchange();
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
    showTips = function(msg){
        var tips = document.getElementById('Jtips');
        if(!tips) {
            tips = document.createElement('div');
            tips.id = 'Jtips';
            tips.className = 'm-tips';
            tips.style.cssText = 'background:rgba(0,0,0,0.8); color: #fff;position: fixed; left: 50%; top: 40%; font-size: 0.28rem;width:3.6rem; padding: 0.6rem; line-height: 0.48rem; margin-top: -0.8rem;opacity: 0; display: none;z-index: 9999;text-align:center;border-radius:0.2rem;';
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
                $slidebtn.css(csstrans);
            }
            
        },
        end: function(event) {
            var isChgX = delta.x > 30;
            if (isChgX) {
                $stages.eq(0).hide();
                setTimeout(function(){
                    showEle($stages.eq(1));
                },50)
            }else{
                csstrans[_css3pre+"transform"]="translate(0px,0)";
                $slidebtn.css(csstrans);
            }
            
        }
    };
    return{
        init: init
    }
	
}();

Index.init();

//自定义分享设置
var shareInfo = {
    title: $('#share_title').html(),//分享标题
    desc: $('#share_desc').html(),//分享正文
    url: window.location.href,//分享URL
    imgurl: $('#share_pic').attr('data-src')//分享图片
};
wx.config({
    appId: '',
    timestamp: '',
    nonceStr: '',
    signature: '',
    jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareWeibo']
});
wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: shareInfo.title,
            desc: shareInfo.desc,
            link: shareInfo.url,
            imgUrl: shareInfo.imgurl,
            trigger: function () {
                if(shareData){
                    this.title = shareData.title;
                    this.desc = shareData.desc;
                }
            },
            success: function () {
            }
        });
        wx.onMenuShareTimeline({
            title: shareInfo.desc,
            link: shareInfo.url,
            imgUrl: shareInfo.imgurl,
            trigger: function () {
                if(shareData){
                    this.title = shareData.desc;
                }
            },
            success: function () {
            }
        });
        wx.onMenuShareQQ({
            title: shareInfo.title,
            desc: shareInfo.desc,
            link: shareInfo.url,
            imgUrl: shareInfo.imgurl,
            trigger: function () {
                if(shareData){
                    this.title = shareData.title;
                    this.desc = shareData.desc;
                }
            },
            success: function () { 
            },
            cancel: function () { 
            }
        });
        wx.onMenuShareWeibo({
            title: shareInfo.title,
            desc: shareInfo.desc,
            link: shareInfo.url,
            imgUrl: shareInfo.imgurl,
            trigger: function () {
                if(shareData){
                    this.title = shareData.desc;
                }
            },
            success: function () { 
            },
            cancel: function () { 
            }
        });
});