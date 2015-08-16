var Index = function(){
	var $regionpop = $('#Jregionpop'),
		$hospitalpop = $('#Jhospitalpop'),
		$departmentpop = $('#Jdepartmentpop'),
		$doctorpop = $('#Jdoctorpop'),
		$closepop = $('.close-pop'),
		$inputpop = $('.banner-right .input-pop'),
		$datepop = $('#Jdatepop'),
	init = function(){
		fixPlaceholder();
		qudaoFun();
		//地区弹层
		$('#Jregion').bind('click',function(){
			if($regionpop.hasClass('show')){
				hidePop($regionpop);
			}else{
				showPop($regionpop);
				hidePop($hospitalpop);
				hidePop($departmentpop);
				hidePop($doctorpop);
			}
		})
		$closepop.bind('click',function(){
			hidePop($(this).parent().parent());
		})

		$inputpop.bind('focus',function(){
			showPop($(this).parent().parent().find('.select-pop'));
		})

		// 医生弹层滚动条
		$("#Jdoctorpop .pop-tb").niceScroll({
            cursorcolor: "#e5e5e5",
            cursorwidth: "10px",
            cursorborder: "0",
            cursorborderradius: "10px",
            scrollspeed:80,
            autohidemode:true
        });
        // 日期弹层
        $('#Jdate').bind('click',function(){
			if($datepop.hasClass('show')){
				hidePop($datepop);
			}else{
				showPop($datepop);
			}
		})

		//点击页面其它地方关闭弹层
		$(document).bind('click',function(e){
			var target = $(e.target);
			if(target.attr('id') !='Jregion' && !target.hasClass('input-pop') && target.closest(".select-pop").length == 0){
				hidePop($regionpop);
				hidePop($hospitalpop);
				hidePop($departmentpop);
				hidePop($doctorpop);
			}
			if(target.closest("#Jdate").length == 0 && target.closest("#Jdatepop").length == 0){
				hidePop($datepop);
			}
		})

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

// Index.showPop($('#Jhospitalpop'));