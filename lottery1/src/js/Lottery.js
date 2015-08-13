/*
抽奖组件 v2
by lijun 20150811

// 调用
Lottery.create({
    wrap: '#Jlotterywrap',      //抽奖主区域DOM【必填】
    awards: '.lottery-award',   //奖项DOM【必填】
    initCallback: function(){   //初始化回调【选填】
        console.log('init...');        
    },
    successCallback: function(data){ //抽奖成功回调【选填】
        alert(data)
    }
})

*/
var Lottery = function(){
    var _jumptime = 15, //时间变化幅度        
        _accumulate = function(start, n, len){//计算时间
            var total = start;
            for (var i = 1; i < len+1; i++) {
                total = total + (start - i*n);
            };
            return total;
        },
        _class = function(options){
            this.current = -1; //当前停止
            this.isrotate = false; //isrotate 标识是否正在抽奖
            this.acount = 0; //闪动的次数
            this.time = 200; //开始时间
            this.canstop = false; //可以停止闪动
            this.awardslen, //奖项个数
            this.options = $.extend({
                wrap: '',
                awards: '',
                initCallback: function(){//初始化回调【选填】
                    
                },
                successCallback: function(){ //抽奖成功回调【选填】
                    
                }
            },options)
            this.init();
        };
        _class.prototype = {
            init: function(){//初始化
                var _this = this;
                this.$wrap = $(_this.options.wrap);
                this.$awards = _this.$wrap.find(_this.options.awards);
                this.awardslen = _this.$awards.length;
                if(typeof _this.options.initCallback == 'function'){
                    _this.options.initCallback();
                }
            },
            startLottery: function(){//开始抽奖
                var _this = this;
                if(_this.isrotate){return}
                this.isrotate = true;
                _this.rotate();
            },
            flashing: function(speed){//加速闪动
                var _this = this;
                clearTimeout(_this.flashtime);
                this.current++;
                this.acount++;
                if (this.current > _this.awardslen - 1) {
                    this.current = 0;
                }
                _this.$awards.removeClass('current');
                _this.$awards.eq(this.current).addClass('current');
                
                if(this.acount < _this.awardslen + 1){
                    this.time = this.time - _jumptime;
                }
                if(this.canstop){return;}
                this.flashtime = setTimeout(function(){
                    _this.flashing();
                },this.time)
            },
            slowDown: function(n){//减速闪动
                var _this = this;
                clearTimeout(_this.slowtime);
                this.current++;
                this.acount++;
                if (this.current > _this.awardslen - 1) {
                    this.current = 0;
                }
                _this.$awards.removeClass('current');
                _this.$awards.eq(this.current).addClass('current');
                this.time = this.time + _jumptime;
                if(this.acount > _this.awardslen + 1 && _this.$awards.eq(this.current).attr('data-num') == n){
                    this.isrotate = false;
                    canstop = false;
                    this.acount = 0;
                    this.time = 200;
                    //完成回调
                    if(typeof _this.options.successCallback == 'function'){
                        _this.options.successCallback(n);
                    }
                    return;
                }
                this.slowtime = setTimeout(function(){
                    _this.slowDown(n);
                },this.time)
            },
            rotate: function(){//抽奖转动
                var _this = this;
                setTimeout(function(){
                    _this.flashing();
                },this.time)
            },
            stopRotate: function(n){//停止转动
                var _this = this;
                if(!n){
                    clearTimeout(_this.flashtime);
                    this.isrotate = false;
                    this.canstop = true;
                    this.acount = 0;
                    this.current = -1;
                    setTimeout(function(){
                        _this.$awards.removeClass('current');
                    },this.time)
                    return;
                }
                setTimeout(function(){
                    clearTimeout(_this.flashtime);
                    _this.slowDown(n);
                }, _accumulate(this.time, _jumptime, _this.awardslen) + (this.time - _jumptime*_this.awardslen)*_this.awardslen*2)
            }
        };
    return {
        create: function(options){
            return new _class(options);
        }
    };
}();