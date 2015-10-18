var Unlock = function(){
    var $stages = $('#Jmain .stage'),
        $lockdiv = $('#Jlockpoint'),
        $lockpoint = $('#Jlockpoint span'),
        $locksmallpoint = $('#Jlocksmallpoint span'),
        $passresult = $('#Jpassresult'),
        _biglogostrokepoint = [],
        _currentPointIndex = -1,
        _enable = true,
        _lastPoint,
        _password = {
            'gril':[0,4,2,5],
            'boy':[3,1,5,7]
        },
    init = function(){
        var pass_len = _password[_chose].length;
        for (var i = 0; i < pass_len; i++) {
            
            smallPoint(i);

            var self = $lockpoint.eq(_password[_chose][i]),
                rect = {};
            self.addClass('point');
            rect = {
                point: self,
                x: self.offset().left,
                y: self.offset().top,
                width : self.width(),
                height: self.height()
            };                
            _biglogostrokepoint.push(rect);
        };
        bindEve();
    },
    smallPoint = function(i){
        // setTimeout(function(i){
            $locksmallpoint.eq(_password[_chose][i]).addClass('active'+i);
        // },210)
    },
    showLine = function(num){
        var num2 = _lastPoint;
        _lastPoint = num;
        if(num > num2){
            var temp = num;
            num = num2;
            num2 =  temp;
        }
        num1 = num.toString();
        num2 = num2.toString();
        var lineclass;
        lineclass = '.i-line'+num1+num2;
        $lockdiv.find(lineclass).show();
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
    testRegion = function(x,y,rect){//验证笔画路径
        // console.log('x:'+x+' rect.x:'+rect.x+' y:'+y+'rect.y:'+rect.y+'rect.width:'+(rect.width))
        return x>=rect.x && x<=(rect.x+rect.width) && y>=rect.y && y<=(rect.y+rect.height);
    },
    bindEve = function(){
        var len = _biglogostrokepoint.length;
        $lockdiv.bind('touchstart , touchmove',function(e){
            if(!_enable) return;
            e.preventDefault();
            var touch = e.targetTouches[0];
            var _x = touch.pageX,_y = touch.pageY;
            // console.log(e.type);
            if(e.type == "touchstart"){
                if(testRegion(_x,_y,_biglogostrokepoint[0])){
                    _currentPointIndex = 0;
                    _biglogostrokepoint[0].point.addClass('point-on');
                    _lastPoint = _password[_chose][0];
                }
            }else{
                if(_currentPointIndex < len-1){
                    var rect = _biglogostrokepoint[_currentPointIndex+1];
                    if (testRegion(_x,_y,rect)){
                        rect.point.addClass('point-on');
                        // console.log(_currentPointIndex);
                        _currentPointIndex++;                        
                        if(_currentPointIndex == len-1){
                            _currentPointIndex = len-1;
                        }
                        // console.log('p:'+_currentPointIndex);
                        showLine(_password[_chose][_currentPointIndex]);
                    }
                }
            }

        }).bind('touchend',function(e){
            if(!_enable) return;
            e.preventDefault();
            // console.log('touchend:'+_currentPointIndex)
            if(_currentPointIndex!=_biglogostrokepoint.length-1){
                failUnlock();
            }else{
                // console.log('解锁成功');
                $stages.eq(2).hide();
                showEle($stages.eq(3));
            }
        });
    },
    failUnlock = function(){
        $lockpoint.removeClass('point-on');
        _currentPointIndex = -1;
        $passresult.html('密码错误，请重试').addClass('shake');
        $lockdiv.find('i').hide();
        setTimeout(function(){
            $passresult.removeClass('shake');
        },800)
    };
    return{
        init: init
    }
	
}();