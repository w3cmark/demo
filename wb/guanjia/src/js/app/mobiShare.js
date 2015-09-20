var MobileShare = function() {
	var _shareParam = {
			title: "",
			desc: "",
			url: "",
			imgurl: "",
			callback: function(res) {

			}
		},
		_isWx = /micromessenger/i.test(navigator.userAgent.toLowerCase()),
		_isAppInside = _isWx;

	function onWxNewReady() {		
		wx.config({
			debug: false,
			appId: wx_conf.appId,
			timestamp: wx_conf.timestamp,
			nonceStr: wx_conf.nonceStr,
			signature: wx_conf.signature,
			jsApiList: [
				'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage'
			]
		});
		wx.ready(function() {
			setWxNewShare();
		});
	}

	function setWxNewShare() {
		var shareData = {
			title: _shareParam.title,
			desc: _shareParam.desc,
			link: _shareParam.url,
			imgUrl: _shareParam.imgurl,

			cancel: function(res) {
				//alert("0")
				_shareParam.callback({
					type: 0,
					res: res
				});
			},
			fail: function(res) {
				//alert("-1")
				_shareParam.callback({
					type: -1,
					res: res
				});
			}
		};
		wx.onMenuShareAppMessage($.extend({},shareData,{
			link:  getShareUrl("wx_2"),
			success: function(res) {
				_shareParam.callback({
					type: 2,
					res: res
				});
			}
		}));
		wx.onMenuShareTimeline($.extend({},shareData,{
			link:  getShareUrl("wx_1"),
			success: function(res) {
				_shareParam.callback({
					type: 1,
					res: res
				});
			}
		}));
	}

	function setAppShare() {
		if (_isWx) {
			if (!isWxjsLoaded || !isConfjsLoaded) {

				var isWxjsLoaded = false;
				var isConfjsLoaded = false;
				var wxjs = document.createElement("script");
				wxjs.type = "text/javascript";
				document.body.appendChild(wxjs);
				var confjs = document.createElement("script");
				confjs.type = "text/javascript";
				document.body.appendChild(confjs);
				wxjs.addEventListener("load", function() {
					isWxjsLoaded = true;
					if (isWxjsLoaded && isConfjsLoaded) {
						onWxNewReady();
					}
				}, false);
				confjs.addEventListener("load", function() {
					isConfjsLoaded = true;
					if (isWxjsLoaded && isConfjsLoaded) {
						onWxNewReady();
					}
				}, false);
				wxjs.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
				confjs.src = "http://rightnowjssdk.sinaapp.com/wxjs.php?url="+encodeURIComponent(location.href);

			} else {
				setWxNewShare();
			}
		}

	}

	//隐藏易信底部条

	var setParam = function(options) {
		
		_shareParam = $.extend(_shareParam, options || {});
		
		if (_isAppInside) { //使用微信或易信访问时
			setAppShare();
		}
	};

	function getShareUrl(channel){
		var nowURL=window.location.href;
		var mbshare=getUrlParam(nowURL,"mbshare");
		var spreadTime=parseInt(getUrlParam(nowURL,"spreadtimes")?getUrlParam(nowURL,"spreadtimes"):0);
		//alert(spreadTime);
		var newURL=_shareParam.url;
		if(getUrlParam(newURL,"mbshare")){
			newURL=newURL.replace("mbshare="+mbshare,"mbshare="+channel).replace("spreadtimes="+spreadTime,"spreadtimes="+(spreadTime+1));
		}
		else{
			if(newURL.indexOf("?")==-1){
				newURL+="?";
			}else{
				newURL+="&";
			}
			newURL+="mbshare="+channel+"&spreadtimes="+(spreadTime+1);
		}
		return newURL;
	}
	function getUrlParam(search,key){
	
		var pStr =search;
			r = new RegExp("[\?&]*" + key + "=([^&]+)"),
			m = pStr.match(r);
		if (m) return m[1].replace('"', '');
		else return null;
	}
	return {
		setting: setParam
	}
}();

var shareInfo = {
    title: $('#share_title').html(),//分享标题
    desc: $('#share_desc').html(),//分享正文
    url: window.location.href,//分享URL
    imgurl: $('#share_pic').attr('data-src')//分享图片
};

MobileShare.setting({//设置分享文案
    title: shareInfo.title,//分享标题
    desc: shareInfo.desc,//分享正文
    url: shareInfo.url,//分享URL
    imgurl: shareInfo.imgurl,//分享图片
    callback:function(o){
        //o.type：-1是分享失败，0是取消分享，1是分享到朋友圈，2是发送给好友
    }//分享后的回调
})