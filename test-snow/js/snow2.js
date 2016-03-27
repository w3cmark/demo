/**** 调用
// <canvas class="snow-canvas" speed-x="2" speed-y="4" size="3" count="5" start-color="rgba(23,47,140,1)" end-color="rgba(20,44,137,0.3)"></canvas>

@speed: 粒子运动速度，(x,y)代表xy方向的速度
@size: 粒子大小
@count: 粒子数量，取值0~10
@start-color: 绘制线性渐变的粒子，开始颜色值rgba
@end-color: 绘制线性渐变的粒子，结束颜色值rgba

Snow.create('.snow-canvas');

****/

var Snow = function() {
  var _class = function(options) {
    var _width,
      _height,
      _ctx,
      _particles = {},
      _particleNum = 0.85,
      _particleIndex = 0,
      _startColor,
      _endColor,
      _size = 1,
      _speedX = 2,
      _speedY = 4,
      _image,
      _imageEle;

    this.options = $.extend({
      image: '',
      startColor: 'rgba(0,0,0,1)',
      endColor: 'rgba(0,0,0,0.3)'
    }, options);
    this.canvas = this.options.canvas.get(0);
    _ctx = this.canvas.getContext("2d");
    _particleNum = (10 - this.options.count)/10;
    _size = this.options.size;
    // var $banner_swiper = $('#Jbanner_swiper');
    _width = this.canvas.width,
    _height = this.canvas.height;
    // this.canvas.width = _width;
    // this.canvas.height = _height;
    _startColor = this.options.startColor;
    _endColor = this.options.endColor;
    _image = this.options.image;
    console.log(_image)
    _imageEle = $("<img src='" + _image + "' style='display: none'>");
    // console.log(_imageEle.width());
    if(this.options.speed){
      var speeds = this.options.speed.split(',');
      if(speeds[1]){
        _speedX = speeds[0];
        _speedY = speeds[1];
      }
    }
    

    if (!Date.now)
      Date.now = function() {
        return new Date().getTime();
      };
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      var vp = vendors[i];
      window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
      || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
      var lastTime = 0;
      window.requestAnimationFrame = function(callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() {
            callback(lastTime = nextTime);
          },
          nextTime - now);
      };
      window.cancelAnimationFrame = clearTimeout;
    }

    function animate() {
      var _this = this;
      // console.log(_this)
      window.requestAnimationFrame(animate);
      _ctx.globalCompositeOperation = "source-over";
      _ctx.clearRect(0, 0, _width, _height);
      _ctx.globalCompositeOperation = "lighter";
      if (Math.random() > _particleNum) {
        new Particle();
      }
      for (var i in _particles) {
        _particles[i].draw();
      }
    }

    function Particle() {
      this.x = -_width / 4;
      this.y = _height;

      this.vx = Math.random() * _speedX + 1.5;
      this.vy = Math.random() * _speedY - 4;
      // console.log(this.vy)
      this.growth = (Math.abs(this.vx) + Math.abs(this.vy)) * 0.01;

      _particleIndex++;
      _particles[_particleIndex] = this;
      this.id = _particleIndex;
      this.size = Math.random() * _size;
      // this.color = getRandomColor();
    }
    Particle.prototype.draw = function() {
      this.x += this.vx * 2;
      this.y += this.vy * 2;

      this.size += this.growth;
      if (this.x > _width || this.y > _height) {
        delete _particles[this.id];
      }
      if(_image){
        
        _ctx.drawImage(_imageEle.get(0), this.x, this.y, this.size, this.size);
        // thiz.ctx.drawImage(thiz.image.get(0), flake.x, flake.y, 2 * flake.size, 2 * flake.size)
        return;
      }
      // c.fillStyle = this.color;
      var grd = _ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      grd.addColorStop(0, _startColor);
      grd.addColorStop(1, _endColor);
      _ctx.fillStyle = grd;
      // c.fillStyle = '#5460d3';
      _ctx.beginPath();
      _ctx.arc(this.x, this.y, this.size, 0 * Math.PI, 2 * Math.PI);
      _ctx.fill();
    };
    window.requestAnimationFrame(animate);
  };

  return {
    create: function(ele,options) {
      $(ele).each(function(i, e) {
        var scope = $.extend({}, options);
        $.each(e.attributes, function(index, key) {
          scope[$.camelCase(key.name)] = Number(Number(key.value)) ? Number(key.value) : key.value
        });
        // if (typeof scope.image === "string" && scope.image === "false") {
        //   scope.image = false
        // };
        scope.canvas = $(e);
        return new _class(scope);
      });

    }
  }
}();


// Snow.create('.snow-canvas');