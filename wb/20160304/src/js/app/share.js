var Share = function(){
    var _shareTxt = [

            // '林更新微信表白，露骨聊天记录曝光！',
            // '白色情人节，看林更新大胆告白',
            // '在爱情的世界里，林更新是受虐狂？',
            // '林更新高调表白，我委婉拒绝！',

            '分享 林更新 的微博',
            '肿么办！要林更新还是要免单？好难选',
            '林更新密友再更新，公开表白视频',
            '林更新进军歌坛？白色情人节首曝痴心单曲'
        ],
        _shareDesc = [
            '这一次我是认真的，有些话一次说………',
            '肿么办！要林更新还是要免单？好难选',
            '林更新密友再更新，公开表白视频',
            '林更新进军歌坛？白色情人节首曝痴心单曲'
        ],
        _shareImage = [
            // 'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/weixin.jpg',
            // 'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/toutiao.jpg',
            // 'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/weibo.jpg',
            // 'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/xinwen.jpg',

            'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/share-weibo.jpg',
            'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/share-kaola.jpg',
            'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/share-xinwen.jpg',
            'http://www.huihaicenter.com/www/projects/dhxy-lgx/img/share-yinyue.jpg'

        ],
    init = function(){
        shareSDK.init();
    },
    randomNumInt = function(n,m){
        var c = m - n + 1;
        return Math.floor(Math.random() * c + n);
    },
    randInt = randomNumInt(0,3),
    shareSDK = {
        _info: {
            shareTitle: _shareTxt[randInt],
            descContent: _shareDesc[randInt],
            shareTimeTitle: _shareTxt[randInt],
            imgUrl: _shareImage[randInt],
            lineLink: window.location.href
        },

        _doneCbk: function() {
            _czc && _czc.push(["_trackEvent",'share','分享']);
            setTimeout(function() {
                window.location.href = 'http://xyq.163.com/2016/xrqs/';
            }, 1500);

        },

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
            that._info.shareTimeTitle = that._info.shareTitle;
            document.addEventListener('YixinJSBridgeReady', function() {
                window.YixinJSBridge.on('menu:share:appmessage', function() {
                    window.YixinJSBridge.invoke('sendAppMessage', {
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
                window.YixinJSBridge.on('menu:share:timeline', function() {
                    window.YixinJSBridge.invoke('shareTimeline', {
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

Share.init();