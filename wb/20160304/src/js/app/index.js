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
        _isSent = false,
        _imgClass = '',
        _isClickAudio = false,
        _isPlaying = false,
        _hitnum = 0,
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
    init = function(){
        initScreen();

        $(window).bind('touchmove',function(e){
            e.preventDefault();
        })

        showEle($stages.eq(0));
        // playGame();
        // jumpLastStage();

        setTimeout(function(){
            _messaudio.play();
        },1800)
        // stage1

        $messbtn[0].addEventListener('touchstart', _events, false);
        $messbtn[0].addEventListener('touchmove', _events, false);
        $messbtn[0].addEventListener('touchend', _events, false);

        // stage2     
        
        // stage3
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

        onorientationchange();
        // shareFun();
        shareSDK.init();
    },
    showStage2 = function(){
        var $p = $('#Jmesswin p'),
            len = $p.length,
            num = 0;
        $stages.eq(0).hide();
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
                    showEle($('#Jchose'));
                    choseFun();
                    return;
                }
                addmess();
            },1500);
        },900)
        
        function addmess(){
            _messaudio.play();
            showEle($p.eq(num));
            swiper.onResize();
            swiper.slideNext();
            num++;
        }
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
            $num = $gamestage.find('.num');
        $begain_btn.on('touchend',function(){
            $gamestage.addClass('play');
            $(this).hide();
            showEle($num);
            //3s倒计时
            changeTime($num.find('i'), 3,function(ele){
                ele.text('GO!');
                setTimeout(function(){
                    hideEle($num);
                    
                    addEvent($gamestage.find('.game-btn a'));
                    // 计时
                    $gamestage.find('.game-time span').addClass('on');
                    changeTime($gamestage.find('.game-time i'), 20,function(ele){
                        ele.text('0');
                        $num.css('width','85%');
                        if(_hitnum >= 20){
                            $num.find('i').text('已neng死他!');
                        }else{
                            $num.find('i').text('Game Over!');
                        }
                        showEle($num);
                        $gamestage.find('.game-btn').hide();

                        //游戏结束3s后去到落地页
                        setTimeout(function(){
                            // playVideo();
                            jumpLastStage();
                        },3000)
                        
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
                _messaudio.play();
                $(this).addClass('on');
                $peo.addClass('on');
            })
            ele.on('touchend',function(){
                $(this).removeClass('on');
                $peo.removeClass('on');
                _hitnum++;
                $hit.text(_hitnum);
                addWuqi();
            })
        }
        function randomNum(n,m){
            var c = m - n + 1;
            return Math.floor(Math.random() * c + n);
        }
        function addWuqi(){
            var n = randomNum(1,4),
                t = Math.random() * 5 - 2.5,
                l = Math.random() * 5 - 2.5,
                html = '<div class="wuqi wuqi'+n+'" style="margin:'+t+'rem 0 0 '+l+'rem"></div>';
            $gamestage.append(html);
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
        var vid = $('#Jvideo')[0];
        vid.play();
        vid.addEventListener("ended",function(evt) {
            jumpLastStage();
       });
    },
    jumpLastStage = function(){
        $stages.eq(3).hide();
        showEle($stages.eq(4));
        $('#Jvideobtn')[0].addEventListener("click",function(evt) {
            playVideo();
            $stages.eq(4).hide().removeClass('show');
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
                showStage2();
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
    shareSDK = {
        _info: {
            shareTitle: $('#share_title').html(),
            descContent: $('#share_desc').html(),
            shareTimeTitle: $('#share_title').html(),
            imgUrl: $('#share_pic').attr('data-src'),
            lineLink: window.location.href
        },

        _doneCbk: null,

        _doneShareFriend: function() {
            // nie.config.stats.url.add('1/targetname.html?click=share', '分享给好友');
            this._doneCbk && this._doneCbk();
        },

        _doneShareTimeline: function() {
            // nie.config.stats.url.add('1/targetname.html?click=share', '分享到朋友圈');
            this._doneCbk && this._doneCbk();
        },

        set: function(info) {

            var that = this;

            if (info) {
                info.shareTitle && (this._info.shareTitle = info.shareTitle);
                info.descContent && (this._info.descContent = info.descContent);
                info.shareTimeTitle && (this._info.shareTimeTitle = info.shareTimeTitle);
                info.imgUrl && (this._info.imgUrl = info.imgUrl);
                info.lineLink && (this._info.lineLink = info.lineLink);
                info.doneCbk && (this._doneCbk = info.doneCbk);
            }

            wx.ready(function() {
                wx.onMenuShareAppMessage({
                    title: that._info.shareTitle,
                    desc: that._info.descContent,
                    link: that._info.lineLink,
                    imgUrl: that._info.imgUrl,
                    success: function() {
                        that._doneShareFriend();
                    }
                });
                wx.onMenuShareTimeline({
                    title: that._info.shareTimeTitle,
                    link: that._info.lineLink,
                    imgUrl: that._info.imgUrl,
                    success: function() {
                        that._doneShareTimeline();
                    }
                });
            });

            return this;
        },

        init: function() {

            var that = this;

            document.addEventListener('YixinJSBridgeReady', function() {
                YixinJSBridge.on('menu:share:appmessage', function() {
                    YixinJSBridge.invoke('sendAppMessage', {
                        img_width: '300',
                        img_height: '300',
                        img_url: that._info.imgUrl,
                        link: that._info.lineLink,
                        desc: that._info.descContent,
                        title: that._info.shareTitle
                    }, function() {
                        that._doneShareFriend();
                    });
                });
                YixinJSBridge.on('menu:share:timeline', function() {
                    YixinJSBridge.invoke('shareTimeline', {
                        img_width: '300',
                        img_height: '300',
                        img_url: that._info.imgUrl,
                        link: that._info.lineLink,
                        desc: that._info.shareTimeTitle,
                        title: that._info.shareTimeTitle
                    }, function() {
                        that._doneShareTimeline();
                    });
                });
            }, false);

            wx_config.jsApiList = [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ];

            wx.config(wx_config);

            this.set();

            return this;
        }
    };
    return{
        init: init
    }
	
}();

Index.init();