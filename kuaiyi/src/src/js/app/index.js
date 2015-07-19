var Index = function(){
	var init = function(){
		fixPlaceholder();
		//调用
		selectMod('#Jselect','#Joption',true);
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
	                color: '#bbb'
	            })
	            if(elm.attr('name') == 'password'){
	                elm.attr('type','text');
	            }
	        }
	    });
	},
	booklistFun = function(){//预约列表的鼠标经过显示相关信息
		var $btns = $('#Jbooklist .btn');
		// console.log($btns.length)
		$btns.bind('mouseenter',function(){
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
	};
	return{
		init: init,
		booklistFun: booklistFun
	}


}();

Index.init();
//当预约列表插入完成后调用
Index.booklistFun()