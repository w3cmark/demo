var Index = function(){
    var _ua = navigator.userAgent.toLowerCase(),
        _isWx = /micromessenger/i.test(_ua),
        $main = $('#Jmain'),
        $share = $("#share"),
        $btn_close_sign,
        _audio = $("#Jaudio").get(0),
        $audio_btn = $("#Jaudiobtn"),
        $stages = $main.find('.stage'),
        $stage6pop = $('#Jstage6pop'),
        _hasmove = false,
    init = function(){
        initScreen();
        // audioInit();

        $(window).bind('touchmove',function(e){
            e.preventDefault();
        })

        showEle($stages.eq(3));

        $('#Jslidebtn').bind('touchmove',function(){
            _hasmove = true;
        })
        $('#Jslidebtn').bind('touchend',function(){
            $stages.eq(0).hide();
            showEle($stages.eq(1));
            _hasmove = false;
        })
        $('#Jmessbtn').bind('touchend',function(){
            showEle($('#Jphonebtn'));
        })
        $('#Jphonebtn').bind('touchend',function(){
            $('#Jphonebtn').hide();
            showEle($('#Jpopphone'));
        })
        $('#Jpopphone .cacel-btn').bind('touchend',function(){
            hideEle($('#Jpopphone'));
        })
        $('#Jpopphone .call-btn').bind('touchend',function(){
            $stages.eq(1).hide();
            showEle($stages.eq(2));
        })
        $('#Jpopchose .pop-chose-con a').bind('touchend',function(){
            $stages.eq(3).hide();
            if($(this).index() == 0){
                showEle($stages.eq(4));
            }else{
                showEle($stages.eq(5));
            }
        })

        $stages.eq(4).bind('touchend',function(){
            $stages.eq(4).hide();
            showEle($stages.eq(8));
        })


        $stages.eq(5).bind('touchend',function(){
            showEle($stage6pop);
        })
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
        onorientationchange();
    },
    initScreen = function(){
        $("html").css("font-size",$(window).height()/$(window).width()<1.5 ? ($(window).height()/603*312.5+"%") : ($(window).width()/375*312.5+"%"));
        $('html,body,#Jmain').css("min-height",window.innerHeight);
    },
    // showStage = function(index){
    //     var $stages = $main.find('.stage');
    //     $stages.
    // },
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
        
    };
    return{
        init: init
    }
	
}();

Index.init();