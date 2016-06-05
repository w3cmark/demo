nie.define("Index",function(){
    var $pop = $('#Jpop'),
    	$pop_bg = $pop.find('.pop-bg'),
    	$pop_close = $pop.find('.Jclose'),
    	$pop_con = $pop.find('.pop-con'),
    	$pop_confirm = $pop.find('.pop-confirm'),
    	$pop_success = $pop.find('.pop-success'),
    	$bakc_btn = $pop_confirm.find('.Jback'),
    	$submit_btn = $pop_confirm.find('.Jsubmit'),
    	pop_swiper,
    	comfirm_swiper,
    	$tab_item = $pop.find('.pop-con-thB span'),
    	data_pop = 0,
    	_urlhost = 'http://dora.webcgi.163.com/api/',
    	$token_img = $pop.find('.token_img'),
    	$confirm_btn = $pop.find('.Jconfirm'),
    	$li_type = $('#Jinputswiper .li-type'),
    	_submiting = false,
    	DB = nie.require("DB"),
    _init = function(){
    	_initScreen(function(){
	    	_initShare();
	    	_addEvent();
	    	pop_swiper = new Swiper('#Jinputswiper', {
		        // pagination: '#specile_swiper .swiper-pagination',
		        followFinger: false,
		        onInit: function(swiper){
		        	swiper.detachEvents()
		           	$tab_item.on('click',function(){
		                swiper.slideTo($(this).index());
		           	});
		        },
		        onTransitionStart: function(swiper){
		           $pop.find('.pop-con-thB .cur').removeClass('cur');
		           var $cur_tab = $tab_item.eq(swiper.activeIndex);
		           $cur_tab.addClass('cur');
		        }
		    })

		    comfirm_swiper = new Swiper('#Jconfirmswiper', {
		        followFinger: false,
		        nextButton: '.swiper-button-next',
    			prevButton: '.swiper-button-prev'
		    })

		    $('.buy-btn').on('click', function(){
		    	var $this = $(this);
		    	_showEle($pop);
		    	pop_swiper.onResize();

		    	data_pop = $this.attr('data-pop');
		    	$pop_con.addClass('pop-con-' + data_pop);
		    	$pop_confirm.addClass('pop-confirm-' + data_pop);

		    	var scroll_top = $(window).scrollTop();
		    	$pop_con.css({'top': scroll_top + 50});
		    	$pop_confirm.css({'top': scroll_top + 50});
		    	$pop_success.css({'top': scroll_top + 50});

		    	get_auth_img(data_pop);
		    })
		    $pop_close.on('click', function(){//关闭弹层
		    	_hideEle($pop);
		    	setTimeout(function(){
		    		$pop_con.removeClass('pop-con-' + data_pop);
		    		$pop_confirm.removeClass('pop-confirm-' + data_pop);
		    		pop_swiper.slideTo(0);
		    		$pop_con.find('input[type="text"], input[type="tel"], textarea').val('');
		    		$pop_con.show();
    				$pop_confirm.hide();
    				$pop_success.hide();
    				$li_type.each(function(i){
    					var $this = $(this);
    					$this.find('input[type="radio"]').eq(0).click();
    				})
		    	},305)
		    })
		    $token_img.on('click', function(){//切换验证码
		    	get_auth_img(data_pop);
		    })

		    $confirm_btn.on('click', function(){//提交信息确认
		    	get_inuput(data_pop);
		    })

		    $bakc_btn.on('click', function(){//返回修改
		    	$pop_con.show();
    			$pop_confirm.hide();
    			get_auth_img(data_pop);
		    })
		    
	    })
    },
    get_auth_img = function(type){//验证码
    	var imgsrc;
    	if(type == 0){
    		imgsrc = _urlhost + '21_227_2016_06_02/get_thumbup_auth_img?' + Math.random();
    	}else if(type == 1){
    		imgsrc = _urlhost + '21_229_2016_06_02/get_thumbup_auth_img?' + Math.random();
    	}else if(type == 2){
    		imgsrc = _urlhost + '21_231_2016_06_02/get_thumbup_auth_img?' + Math.random();
    	}else{
    		imgsrc = _urlhost + '21_233_2016_06_02/get_thumbup_auth_img?' + Math.random();
    	}
    	$token_img.attr("src", imgsrc);
    },
    get_inuput = function(data){//获取输入内容
    	var type = [],
    		server = [],
    		uid = [],
    		name = [],
    		phone = [],
    		address = [],
    		token_value = [],
    		$type = $('#Jinputswiper .li-type input[type="radio"]:checked'),
    		$server = $('#Jinputswiper .server'),
    		$uid = $('#Jinputswiper .uid'),
    		$name = $('#Jinputswiper .name'),
    		$phone = $('#Jinputswiper .phone'),
    		$address = $('#Jinputswiper .address'),
    		$token = $('#Jinputswiper .token_value');
    	
    	function pushInput(ele, arr){
    		ele.each(function(i){
	    		var $this = $(this);
	    		arr.push($this.val());
	    	})
    	}
    	pushInput($type, type);
    	pushInput($server, server);
    	pushInput($uid, uid);
    	pushInput($name, name);
    	pushInput($phone, phone);
    	pushInput($address, address);
    	pushInput($token, token_value);

    	checkInput(type, server, uid, name, phone, address, token_value, data);
    },
    checkInput = function(t, s, u, n, p, a, token, data){//检查输入
    	var len = 1;
    	if(data == 0){
    		len = 1;
    		token = token[0];
    	}else if(data == 1){
    		len = 3;
    		token = token[1];
    	}else if(data == 2){
    		len = 1;
    		token = token[0];
    	}else{
    		len = 5;
    		token = token[2];
    	}

    	for (var i = 0; i < len; i++) {
    		var alert_name = len > 1 ? '团员'+(i+1) : '您';
    		if(!s[i]){
    			alert('请输入'+alert_name+'的服务器！');
    			return;
    		}else if(!u[i]){
    			alert('请输入'+alert_name+'的游戏ID！');
    			return;
    		}else if(!n[i]){
    			alert('请输入'+alert_name+'的名字！');
    			return;
    		}else if(!p[i].match(/^(13|14|15|18|17)\d{9}$/)){
    			alert('请输入'+alert_name+'的正确手机号码！');
    			return;
    		}else if(!a[i]){
    			alert('请输入'+alert_name+'的收货地址！');
    			return;
    		}
    	};
    	if(!token){
    		alert('输入验证码！');
    		return;
    	}

    	comfirm_mess(t, s, u, n, p, a, data, len, token);

    },
    comfirm_mess = function(t, s, u, n, p, a, data, len, token){//确认信息
    	$pop_con.hide();
    	$pop_confirm.show();
    	var goods = '云麓同款实体汉服',
    		$table = $pop_confirm.find('table');

    	for (var i = 0; i < len; i++) {
    		var alert_name = len > 1 ? '团员'+(i+1) : '您';
    		if(data == 2 || data == 3){
	    		goods = '云魂主题夜灯';
	    		goods = t[i] == 1 ? goods+'冰原熊款' : goods+'千羽款';
	    	}
    		var new_html = comfirm_html(goods, s[i], u[i], n[i], p[i], a[i], alert_name);
    		$table.eq(i).html(new_html);
    	};
    	
    	comfirm_swiper.onResize();

    	$submit_btn.one('click', function(){//提交休息
	    	if(_submiting){return}
	    	var $this = $(this);
	    	$this.text('正在提交...');
	    	_submiting = true;
	    	submit_mess(t, s, u, n, p, a, data, token);
	    })
    },
    comfirm_html = function(goods, s, u, n, p, a, alert_name){
    	var html = '<tr>'
                    +'    <th colspan="2">'+ alert_name +'</th>'
                    +'</tr><tr>'
                    +'    <td class="td-tit">购买物品</td>'
                    +'    <td>'+ goods +'</td>'
                    +'</tr><tr>'
                    +'    <td class="td-tit">服务器</td>'
                    +'    <td>'+ s +'</td>'
                    +'</tr><tr>'
                    +'    <td class="td-tit">游戏ID</td>'
                    +'    <td>'+ u +'</td>'
                    +'</tr><tr>'
                    +'    <td class="td-tit">收件人</td>'
                    +'    <td>'+ n +'</td>'
                    +'</tr><tr>'
                    +'    <td class="td-tit">联系电话</td>'
                    +'    <td>'+ p +'</td>'
                    +'</tr><tr>'
                    +'    <td class="td-tit">联系地址</td>'
                    +'    <td>'+ a +'</td>'
                    +'</tr>';
            return html;
    },
    submit_mess = function(t, server, uid, name, phone, address, d, token){//提交信息
    	if(d == 0){
    		DB.clothes_alone_signup({
		        'uid': uid[0],
		        'server': server[0],
		        'phone': phone[0],
		        'address': address[0],
		        'name': name[0],
		        'img_authcode': token
		    },function(data){
		    	success_fun(data);
		    });
    	}else if(d == 1){
    		DB.clothes_group_signup({
		        'uid1': uid[0],
		        'server1': server[0],
		        'phone1': phone[0],
		        'address1': address[0],
		        'name1': name[0],
		        'uid2': uid[1],
		        'server2': server[1],
		        'phone2': phone[1],
		        'address2': address[1],
		        'name2': name[1],
		        'uid3': uid[2],
		        'server3': server[2],
		        'phone3': phone[2],
		        'address3': address[2],
		        'name3': name[2],
		        'img_authcode': token
		    },function(data){
		    	success_fun(data);
		    });
    	}else if(d == 2){
    		DB.lanther_alone_signup({
		        'uid': uid[0],
		        'server': server[0],
		        'phone': phone[0],
		        'address': address[0],
		        'name': name[0],
		        'img_authcode': token
		    },function(data){
		    	success_fun(data);
		    });
    	}else if(d == 3){
    		DB.clothes_group_signup({
		        'uid1': uid[0],
		        'server1': server[0],
		        'phone1': phone[0],
		        'address1': address[0],
		        'name1': name[0],
		        'uid2': uid[1],
		        'server2': server[1],
		        'phone2': phone[1],
		        'address2': address[1],
		        'name2': name[1],
		        'uid3': uid[2],
		        'server3': server[2],
		        'phone3': phone[2],
		        'address3': address[2],
		        'name3': name[2],
		        'uid4': uid[3],
		        'server4': server[3],
		        'phone4': phone[3],
		        'address4': address[3],
		        'name4': name[3],
		        'uid5': uid[4],
		        'server5': server[4],
		        'phone5': phone[4],
		        'address5': address[4],
		        'name5': name[4],
		        'img_authcode': token
		    },function(data){
		    	success_fun(data);
		    });
    	}

    	function success_fun(data){
    		if(data.status == true){
	    		$pop_con.hide();
				$pop_confirm.hide();
				$pop_success.show();
	    	}else if(data.status == 502){
	    		alert(data.msg);
	    		$pop_con.show();
    			$pop_confirm.hide();
    			get_auth_img(data_pop);
	    	}else{
	    		alert(data.msg);
	    	}
	    	_submiting = false;
	    	$submit_btn.text('提交信息');
    	}
    },
    _initScreen = function(callback){//初始化html  font-size
		var win_width = document.documentElement.clientWidth,
            win_height = document.documentElement.clientHeight;
		// $("html").css("font-size",win_height/win_width<1.5 ? (win_height/603*312.5+"%") : (win_width/375*312.5+"%"));//全屏布局时使用,短屏下自动缩放
		$("html").css("font-size",win_width/375*312.5+"%");//滚动布局显示时使用,不缩放
		if(callback)callback();
	},
	_addEvent = function(){
    	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", 			function(e){_onorientationchange(e);}, false);
    	$(".btn_toTop").bind("click", function(e){
			window.scrollTo(0,0);
		}, false);
    }
    _onorientationchange = function(e){
		if(window.orientation == 90 || window.orientation == -90){
			$("#forhorview").css("display", "-webkit-box");  //显示竖屏浏览提示框
	    }else{//竖屏下恢复默认显示效果
	        var st = setTimeout(_initScreen,300);
	         $("#forhorview").css("display", "none");
	    }
	},
	_initShare = function(){//初始化分享组件
    	var share = nie.require("nie.util.mobiShare2");
    	var title = $("#share_title").html(),
    		desc = $("#share_desc").html();
       	MobileShare.init({
       		title: title,//分享标题
            desc: desc,//分享正文
          	imgurl: $("#share_pic").attr("src"),//分享图片
			circleTitle: desc,//分享到朋友圈的标题。不填则与title一致
			guideText: "分享给更多好友",//微信中点分享按钮显示的分享引导语
			qrcodeIcon: __uri("../../img/logo.png"),//二维码图标
			shareCallback: function(res) {//微信易信分享回调res=｛type:0,res:[微信返回的提示]｝res.type：0表示取消，-1：分享失败，1：分享到朋友圈，2：分享给好友，3：QQ，4：微博。易信只返回1或2两种情况。
			},
			wxSdkCallback: function(){//微信sdk加载完成后回调，可在此回调中调用微信JS-SDK的其他API,如上传图片等。
				
			}
		});
    }
    _showEle = function(ele){
    	ele.show();
    	setTimeout(function(){
    		ele.addClass('show');
    	},5)
    },
    _hideEle = function(ele){
    	ele.removeClass('show');
    	setTimeout(function(){
    		ele.hide();
    	},305)
    };

    _init();
});