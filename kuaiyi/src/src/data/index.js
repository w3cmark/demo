var Index = function(){
	var init = function(){
		fixPlaceholder();
		qudaoFun();
		//调用
		selectMod('#Jselect','#Joption',true);
		fixHeader();
	},
	fixPlaceholder = function(){//兼容输入框placeholder
	    $('input[placeholder], textarea[placeholder]').focus(function(){
	        var elm = $(this),
	            value = elm.val(),
	            old = elm.data("placeholder");
	        if(elm.attr('name') == 'password'){
	            elm.attr('type','password');
	        }
	        if (typeof old === "undefined"){
	            elm.data("placeholder", value);
	            old = value;            
	        }
	        if (old == value){
	            elm.val("");
	            elm.css({
	                color:'#333'
	            })
	        }
	    }).blur(function() {
	        var elm = $(this);
	        if(elm.val() == ""){
	            elm.val(elm.data("placeholder"));
	            elm.css({
	                color: '#aaa'
	            })
	            if(elm.attr('name') == 'password'){
	                elm.attr('type','text');
	            }
	        }
	    });
	},
	booklistFun = function(){//预约列表的鼠标经过显示相关信息
		var $btns = $('#Jbooklist .btn');
		infoShowEven($btns);
	},
	qudaoFun = function(){//渠道弹层
		var $btns = $('#Jheader .qudao');
		infoShowEven($btns);
	},
	infoShowEven = function(btn){
		btn.bind('mouseenter',function(){
			var $this = $(this),
				$info = $this.parent().find('.info');
			showPop($info);
		}).bind('mouseleave',function(){
			var $this = $(this),
				$info = $this.parent().find('.info');
			hidePop($info);
		})
	},
	showPop = function(ele){//显示弹层
		ele.show();
		setTimeout(function(){
			ele.addClass('show');
		},10)
	},
	hidePop = function(ele){//隐藏弹层
		ele.removeClass('show');
		setTimeout(function(){
			ele.hide();
		},310)
	},
	selectMod = function(ele,opt,replace){//伪下拉筛选
	    var $clickele = $(ele),
	        $option = $(opt),
	        $options = $option.find('.option'),
	        heights = 23*$options.length + 1,
	        replace = replace || false;
	    function selectShow(ele,h){
	        // h = h/10 + 'rem';
	        ele.css({
	            height : h
	        })
	    }
	    function selectHide(ele){
	        ele.css({
	            height : '0'
	        })
	    }
	    $clickele.bind('click',function(){
	        var opt_height = $option.css('height');
	        if(opt_height == '0px'){
	            selectShow($option,heights);
	        }else{
	            selectHide($option);
	        }
	    });
	    $options.each(function(i,ele){
	        $(ele).bind('click',function(){
	            if(replace){
	                $clickele.html($(ele).html());
	            }
	            var data = $(this).attr('data-type');
	            $clickele.attr('data-type', data);
	            selectHide($option);
	        })
	    })
	},
	fixHeader = function(){//头部fixed
		var $heder = $('#Jheader'),
			$heder_icon = $('#Jheader .header-icon'),
			$win = $(window),
			wtop = $win.scrollTop();
		if(!$heder.hasClass('header-fix')){
			return;
		}
		fixed(wtop);
		$win.bind('scroll',function(){
			wtop = $win.scrollTop();
			fixed(wtop);
		})
		function fixed(wtop){
			if(wtop > 50){
				$heder_icon.show();
				$heder.css({
					top: 0
				})
			}else{
				$heder_icon.hide();
				$heder.css({
					top: 50
				})
			}
		}
	};
	return{
		init: init,
		booklistFun: booklistFun,
		showPop: showPop,
		hidePop: hidePop
	}


}();

Index.init();
//当预约列表插入完成后调用
Index.booklistFun();
// 显示某个弹层
// Index.showPop($('#Jdatepop'));
//隐藏某个弹层
// Index.hidePop($('#Jdatepop'));