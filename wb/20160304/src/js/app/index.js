var _chose;
var Index = function(){
    var _ua = navigator.userAgent.toLowerCase(),
        _isWx = /micromessenger/i.test(_ua),
        $main = $('#Jmain'),
        _messaudio = $("#Jaudiomess").get(0),
        _unlockaudio = $("#Jaudiounlock").get(0),
        _video = $('#Jvideo')[0],
        $stages = $main.find('.stage'),
        $slidebtn = $('#Jslidebtn'),
        $messbtn = $('#Jmessbtn'),
        $messinputTxt = $('#Jmessinputtxt'),
        _isSent = false,
        _imgClass = '',
        _isClickAudio = false,
        _isPlaying = false,
        _hitnum = 0,
        _mess_int,
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
        // _shareTxt = [

        //     // '林更新微信表白，露骨聊天记录曝光！',
        //     // '白色情人节，看林更新大胆告白',
        //     // '在爱情的世界里，林更新是受虐狂？',
        //     // '林更新高调表白，我委婉拒绝！',

        //     '分享 林更新 的微博',
        //     '肿么办！要林更新还是要免单？好难选',
        //     '林更新密友再更新，公开表白视频',
        //     '林更新进军歌坛？白色情人节首曝痴心单曲'
        // ],
        // _shareDesc = [
        //     '这一次我是认真的，有些话一次说………',
        //     '肿么办！要林更新还是要免单？好难选',
        //     '林更新密友再更新，公开表白视频',
        //     '林更新进军歌坛？白色情人节首曝痴心单曲'
        // ],
        // _shareImage = [
        //     // 'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/weixin.jpg',
        //     // 'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/toutiao.jpg',
        //     // 'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/weibo.jpg',
        //     // 'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/xinwen.jpg',

        //     'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/share-weibo.jpg',
        //     'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/share-kaola.jpg',
        //     'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/share-xinwen.jpg',
        //     'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/share-yinyue.jpg'

        // ],
    init = function(){

        initScreen();

        fixScreenTime();

        $(window).bind('touchmove',function(e){
            e.preventDefault();
        })
        // stage1
        showAppMess();
        // stage2

        // stage3
        $('#Jstage4btnA').bind('touchend',function(){
            // if(_isWx){
            if(true){
                // showEle($('#NIE-share-m'));
                $('.new-share-pop').show();
            }else{
                showTips('请在微信客户端打开分享~');
            }
        })
        $('#NIE-share-m').bind('touchend',function(){
            $(this).hide();
        })

        onorientationchange();
        // shareFun();
        // shareSDK.init();
    },
    fixScreenTime = function() {

        var dayList = [
            '日',
            '一',
            '二',
            '三',
            '四',
            '五',
            '六'
        ];

        var time   = new Date();
        var month  = time.getMonth() + 1;
        var date   = time.getDate();
        var day    = dayList[time.getDay()];
        var hour   = time.getHours();
        var minute = time.getMinutes();

        var time = '<p>' + hour + ':' + minute + '</p>';

        $('.stage-time .time-num1').addClass('type-' + Math.floor(hour / 10));
        $('.stage-time .time-num2').addClass('type-' + hour % 10);

        $('.stage-time .time-num3').addClass('type-' + Math.floor(minute / 10));
        $('.stage-time .time-num4').addClass('type-' + minute % 10);

        var date = month + '月' + date + '日 星期' + day;

        $('.stage-time p').html(date);
    },
    showAppMess = function(){
        var len = $stages.eq(0).find('.m-mess').length,
            cur = 0;

        _unlockaudio.load();

        showEle($stages.eq(0));
        // playGame();
        // jumpLastStage();
        _mess_int = setInterval(function(){
            cur++;
            // console.log(cur);
            if(cur == len){
                clearInterval(_mess_int);
                return;
            }
            _messaudio.play();
        },800)
        _messaudio.play();

        // 解锁
        $messbtns = $('#Jmain .stage1 .m-mess');
        $messbtns.each(function(i){
            var $this = $(this);
            $this[0].addEventListener('touchstart', _events, false);
            $this[0].addEventListener('touchmove', _events, false);
            $this[0].addEventListener('touchend', _events, false);
        })
        // $messbtns.bind('touchstart',_events);
        // $messbtns.bind('touchmove',_events);
        // $messbtns.bind('touchend',_events);
        $slidebtn[0].addEventListener('touchstart', _events, false);
        $slidebtn[0].addEventListener('touchmove', _events, false);
        $slidebtn[0].addEventListener('touchend', _events, false);

        // $messbtn[0].addEventListener('touchstart', _events, false);
        // $messbtn[0].addEventListener('touchmove', _events, false);
        // $messbtn[0].addEventListener('touchend', _events, false);
    },
    showStage2 = function(){
        var $p = $('#Jmesswin p'),
            len = $p.length,
            num = 0;
        $stages.eq(0).hide();
        clearInterval(_mess_int);
        _messaudio.currentTime = 0;
        _messaudio.pause();
        _video.load();
        var swiper = new Swiper('#Jmesswin', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true
        });
        setTimeout(function(){
            showEle($stages.eq(1));
            document.title = '林更新';
            swiper.onResize();
        },50)
        setTimeout(function(){
            addmess();
            var inter = setInterval(function(){
                if(num == len){
                    clearInterval(inter);
                    deadLock();
                    return;
                }
                addmess();
            },1000);
        },500)

        function addmess(){
            _messaudio.play();
            showEle($p.eq(num));
            swiper.onResize();
            swiper.slideNext();
            num++;
        }
    },
    deadLock = function(){
        $main.addClass('shake');
        setTimeout(function(){
            showEle($('#Jdead'));
            $main.removeClass('shake');
        },1500)

        setTimeout(function(){
            showEle($('#Jchose'));
            choseFun();
        },3000)
    },
    choseFun = function(){
        var $btns = $('#Jchose .chose-btn a');
        $btns.each(function(i,e){
            var $this = $(e);
            $this.on('touchend',function(){
                $stages.eq(1).hide();
                if(i == 0){
                    playGame();
                }else{
                    playVideo();
                }
                setTimeout(function(){
                    showEle($stages.eq(2+i));
                },20)

            })
        })
    },
    playGame = function(){
        var $gamestage = $('#Jgamestage'),
            $begain_btn = $('#Jgameplay'),
            $num = $gamestage.find('.num'),
            $audiowuqi = $('.Jaudiowuqi');
        $begain_btn.on('touchend',function(){
            $gamestage.addClass('play');
            $(this).hide();
            showEle($num);
            $audiowuqi.each(function(i){
                var $this = $(this);
                $this[0].load();
            })
            //3s倒计时
            changeTime($num.find('i'), 3,function(ele){
                ele.text('GO!');
                setTimeout(function(){
                    hideEle($num);

                    addEvent($gamestage.find('.game-btn a'));
                    // 计时
                    $gamestage.find('.game-time span').addClass('on');
                    changeTime($gamestage.find('.game-time i'), 10,function(ele){
                        ele.text('0');
                        $num.css('width','85%');
                        // if(_hitnum >= 20){
                        //     $num.find('i').text('已neng死他!');
                        // }else{
                        //     $num.find('i').text('Game Over!');
                        // }
                        // $gamestage.find('.game-peo').addClass('end');
                        $gamestage.find('.game-btn').hide();
                        //游戏结束3s后去到落地页
                        setTimeout(function(){
                            showEle($('#Jendtip'));
                            $('#Jendtip').on('click',jumpLastStage);
                        },1000)

                    })

                },300)
                showEle($gamestage.find('.game-btn'));
                showEle($gamestage.find('.game-peo'));
            });
        })
        function addEvent(ele){
            var $hit = $gamestage.find('.game-hit'),
                $peo = $gamestage.find('.game-peo');
            ele.on('touchstart',function(){
                // _messaudio.pause();
                // _messaudio.play();
                $(this).addClass('on');
                $peo.addClass('on');
                addWuqi();
            })
            ele.on('touchend',function(){
                $(this).removeClass('on');
                $peo.removeClass('on');
                _hitnum++;
                $hit.text(_hitnum);
            })
        }
        function addWuqi(){
            var n = randomNumInt(1,5),
                t = randomNum(0,3),
                l = -0.9,
                html = '<div class="wuqi wuqi'+n+'" style="margin:0 0 '+t+'rem '+l+'rem"></div>',
                text_html = '<div class="game-text game-text'+n+'"></div>';
            // console.log(n-1);
            var item = $(html),
                text_item = $(text_html);
            $audiowuqi.eq(n-1)[0].play();
            $gamestage.append(item);
            $gamestage.append(text_item);
            setTimeout(function() {
                item.remove();
                text_item.remove();
            }, 500);
        }
    },
    changeTime = function(ele, time, endfn){
        var intv = setInterval(function(){
            if(time == 1){
                clearInterval(intv);
                endfn.call(this,ele);
                return;
            }
            time--;
            ele.text(time);
        },1000)
    },
    initScreen = function(){
        var win_width = document.documentElement.clientWidth,
            win_height = document.documentElement.clientHeight;
        $("html").css("font-size",win_height/win_width<1.5 ? (win_height/603*312.5+"%") : (win_width/375*312.5+"%"));
        // $('html,body,#Jmain').css("min-height",window.innerHeight);
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
    audioIsOver = function(ele){
        clearTimeout(_audioTimeout);
        ele.addEventListener('ended', function () {
            // _isClickAudio = true;
            $stages.eq(3).find('.icon-round').show();
            _isPlaying = false;
            $messwin.find('.s-yuyin').removeClass('play');
            jumpLastStage();
            _audioTimeout = setTimeout(function(){
                $stages.eq(3).hide();
                showEle($stages.eq(4));
            },3000)
        }, false);
    },
    playVideo = function(){
        $stages.eq(1).hide();
        $stages.eq(2).hide();
        showEle($stages.eq(3));
        // var vid = $('#Jvideo')[0];
        _video.play();
        _video.addEventListener("ended",function(evt) {
            jumpLastStage();
       });
    },
    jumpLastStage = function(){
        $stages.eq(2).hide();
        $stages.eq(3).hide();
        showEle($stages.eq(4));
        $('#Jvideobtn')[0].addEventListener("click",function(evt) {
            playVideo();
            $stages.eq(4).hide().removeClass('show');
       });
    },
    randomNumInt = function(n,m){
        var c = m - n + 1;
        return Math.floor(Math.random() * c + n);
    },
    randomNum = function(n,m){
        var c = m - n + 1;
        return Math.random() * c + n;
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
                if(event.target.id == 'Jslidebtn' || event.target.id == 'Jslidebtnem'){
                    $slidebtn.css(csstrans);
                }else{
                    $('#Jmain .stage1 .m-mess').css(csstrans);
                }
            }

        },
        end: function(event) {
            var isChgX = delta.x > 30;
            if (isChgX) {
                _unlockaudio.play();
                showStage2();
            }else{
                csstrans[_css3pre+"transform"]="translate(0px,0)";
                if(event.target.id == 'Jslidebtn'){
                    $slidebtn.css(csstrans);
                }else{
                    $('#Jmain .stage1 .m-mess').css(csstrans);
                }
            }

        }
    };
    // randInt = randomNumInt(0,3),
    // shareSDK = {
    //     _info: {
    //         shareTitle: _shareTxt[randInt],
    //         descContent: _shareDesc[randInt],
    //         shareTimeTitle: _shareTxt[randInt],
    //         imgUrl: _shareImage[randInt],
    //         lineLink: window.location.href
    //     },

    //     _doneCbk: function() {
    //         _czc && _czc.push(["_trackEvent",'share','分享']);
    //         setTimeout(function() {
    //             window.location.href = 'http://xyq.163.com/2016/xrqs/';
    //         }, 1500);

    //     },

    //     _doneShareFriend: function() {
    //         // nie.config.stats.url.add('1/targetname.html?click=share', '分享给好友');
    //         this._doneCbk && this._doneCbk();
    //     },

    //     _doneShareTimeline: function() {
    //         // nie.config.stats.url.add('1/targetname.html?click=share', '分享到朋友圈');
    //         this._doneCbk && this._doneCbk();
    //     },

    //     set: function(info) {

    //         var that = this;

    //         if (info) {
    //             info.shareTitle && (this._info.shareTitle = info.shareTitle);
    //             info.descContent && (this._info.descContent = info.descContent);
    //             info.shareTimeTitle && (this._info.shareTimeTitle = info.shareTimeTitle);
    //             info.imgUrl && (this._info.imgUrl = info.imgUrl);
    //             info.lineLink && (this._info.lineLink = info.lineLink);
    //             info.doneCbk && (this._doneCbk = info.doneCbk);
    //         }

    //         wx.ready(function() {
    //             wx.onMenuShareAppMessage({
    //                 title: that._info.shareTitle,
    //                 desc: that._info.descContent,
    //                 link: that._info.lineLink,
    //                 imgUrl: that._info.imgUrl,
    //                 success: function() {
    //                     that._doneShareFriend();
    //                 }
    //             });
    //             wx.onMenuShareTimeline({
    //                 title: that._info.shareTimeTitle,
    //                 link: that._info.lineLink,
    //                 imgUrl: that._info.imgUrl,
    //                 success: function() {
    //                     that._doneShareTimeline();
    //                 }
    //             });
    //         });

    //         return this;
    //     },

    //     init: function() {

    //         var that = this;
    //         that._info.shareTimeTitle = that._info.shareTitle;
    //         document.addEventListener('YixinJSBridgeReady', function() {
    //             window.YixinJSBridge.on('menu:share:appmessage', function() {
    //                 window.YixinJSBridge.invoke('sendAppMessage', {
    //                     img_width: '300',
    //                     img_height: '300',
    //                     img_url: that._info.imgUrl,
    //                     link: that._info.lineLink,
    //                     desc: that._info.descContent,
    //                     title: that._info.shareTitle
    //                 }, function() {
    //                     that._doneShareFriend();
    //                 });
    //             });
    //             window.YixinJSBridge.on('menu:share:timeline', function() {
    //                 window.YixinJSBridge.invoke('shareTimeline', {
    //                     img_width: '300',
    //                     img_height: '300',
    //                     img_url: that._info.imgUrl,
    //                     link: that._info.lineLink,
    //                     desc: that._info.shareTimeTitle,
    //                     title: that._info.shareTimeTitle
    //                 }, function() {
    //                     that._doneShareTimeline();
    //                 });
    //             });
    //         }, false);

    //         wx_config.jsApiList = [
    //             'onMenuShareTimeline',
    //             'onMenuShareAppMessage'
    //         ];

    //         wx.config(wx_config);

    //         this.set();

    //         return this;
    //     }
    // };
    return{
        init: init
    }

}();
function ImageLoader(imgList, doneCbk, progressCbk) {
    this._list = imgList;

    this._loader = new createjs.LoadQueue(false);

    this._loader.addEventListener('complete', function() {
        doneCbk && doneCbk();
    });

    this._loader.addEventListener('progress', function(event) {
        progressCbk && progressCbk(event.progress);
    });
}
ImageLoader.prototype = {

    get: function(id) {
        return this._loader.getResult(id);
    },

    load: function() {
        this._loader.loadManifest(this._list);
        return this;
    }
};
// Init
new ImageLoader(["img/logo.png","img/bg00.jpg","img/bg01.jpg","img/bg02.png","img/bg02_3.png","img/bg03.jpg","img/bg04.jpg","img/bg04.png","img/bg05.png","img/btn01.png","img/btn02.png","img/game01.png","img/game02.png","img/game03.png","img/game04.png","img/game05.png","img/game06.png","img/game07.png","img/game08.png","img/game09.png","img/head.png","img/icon01.png","img/icon02.png","img/icon03.png","img/icon04.png","img/icon05.png","img/icon06.png","img/icon07.png","img/icon08.png","img/icon09.png","img/icon10.png","img/icon11.png","img/icon12.png","img/icon13.png","img/icon14.png","img/icon15.png","img/icon16.png","img/icon18.png","img/pic01.png","img/pic02.png","img/pic03.png","img/pic04.png","img/pic05.png","img/pic06.png","img/turn.png","img/wuqi1.png","img/wuqi2.png","img/wuqi3.png","img/wuqi4.png","img/wuqi5.png"], function() {
    $('#Jmain').show();
    setTimeout(function(){
        $('#loading').remove();
        Index.init();
    },300)

    $('.new-share-pop').on('touchstart', function(e) {
        e.stopPropagation();
        $(this).hide();
        return false;
    });

    setTimeout(function() {

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
                r = window.location.search.substr(1).match(reg);
            return (r != null) ? unescape(r[2]) : null;
        }

        if (getQueryString('czcfrom') === 'weixin') {
            _czc && _czc.push(["_trackEvent",'weixin','访问']);

        } else if (getQueryString('czcfrom') === 'weixin2') {
            _czc && _czc.push(["_trackEvent",'weixin2','访问']);

        } else if (getQueryString('czcfrom') === 'weixin3') {
            _czc && _czc.push(["_trackEvent",'weixin3','访问']);

        } else if (getQueryString('czcfrom') === 'weixin4') {
            _czc && _czc.push(["_trackEvent",'weixin4','访问']);

        } else if (getQueryString('czcfrom') === 'weibo') {
            _czc && _czc.push(["_trackEvent",'weibo','访问']);

        } else if (getQueryString('czcfrom') === 'yixin') {
            _czc && _czc.push(["_trackEvent",'yixin','访问']);

        } else {
            _czc && _czc.push(["_trackEvent",'home','访问']);
        }

    }, 3000);

}, function(pct) {
    $('#loading .tip span').html(Math.floor(pct * 100));
    $('#loading .tip-line i').css('width',pct * 100+'%');
}).load();
