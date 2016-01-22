var CnavasLoad = function(){
	var $canvas = $('#Jcanvas'),
		_ctx = $canvas.get(0).getContext('2d'),
		_w = 400,
		_h = 200,
		_pregressbar,
		_counter = 0,
		_particle_no = 25,
		_particles = [];
	init = function(){
		$canvas[0].width = _w;
		$canvas[0].height = _h;
		_pregressbar = new progress();
		animloop();
	},
	animloop = function(){
		draw();
		requestAnimFrame(animloop);
	},
	requestAnimFrame = function(callback){
		return  window.requestAnimationFrame(callback) || 
			    window.webkitRequestAnimationFrame(callback) || 
			    window.mozRequestAnimationFrame(callback)    || 
			    window.oRequestAnimationFrame(callback)      || 
			    window.msRequestAnimationFrame(callback)     ||  
			    function( callback ){
			    window.setTimeout(callback, 1000 / 60);
			  };
	},
	reset = function(){
		_ctx.fillStyle = '#000';
		_ctx.fillRect(0,0,_w,_h);

		_ctx.fillStyle = '#171814';
		_ctx.fillRect(25,80,350,25);
	},
	progress = function(){
		this.widths = 0;
		this.hue = 0;
		this.draw = function(){
			_ctx.fillStyle = 'hsla('+ this.widths+', 100%, 40%,1)';//?
			_ctx.fillRect(25,80,this.widths,25);
			var grad = _ctx.createLinearGradient(0, 0, 0, 130);//?
			grad.addColorStop(0, 'transparent');
			grad.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
			_ctx.fillStyle = grad;
			_ctx.fillRect(25, 80, this.widths, 25);
		}
	},
	particle = function(){
		this.x = 23 + _pregressbar.widths;
		this.y = 82;
		this.vx = 0.8 + Math.random()*1;
		this.v = Math.random()*5;
		this.g = 1 + Math.random()*5;
		this.down = false;

		this.draw = function(){
			_ctx.fillStyle = 'hsla('+ (_pregressbar.hue + 0.3) +', 100%, 40%, 1)';
			var size = Math.random()*2;
			_ctx.fillRect(this.x, this.y, size, size);
		}
	},
	draw = function(){
		reset();
		_counter++;
		_pregressbar.hue += 0.8;
		_pregressbar.widths += 2;
		if(_pregressbar.widths > 350){
			if(_counter > 215){
				reset();
				_pregressbar.hue = 0;
				_pregressbar.widths = 0;
				_counter = 0;
				_particles = [];
			}else{
				_pregressbar.hue = 126;
				_pregressbar.widths = 351;
				_pregressbar.draw();
			}
		}else{
			_pregressbar.draw();
			for(var i = 0;i < _particle_no; i += 10){
				_particles.push(new particle());
			}
		}
		update();
	},
	update = function(){
		for(var i = 0,len = _particles.length; i < len; i++){
			var p = _particles[i];
			p.x -= p.vx;
			if(p.down == true){
				p.g += 0.1;
				p.y += p.g;
			}else{
				if(p.g < 0){
					p.down = true;
					p.g += 0.1;
					p.y += p.g;
				}else{
					p.y -= p.g;
					p.g -= 0.1;
				}
			}
			p.draw();
		}
	};
	return {
		init: init
	}
}();
CnavasLoad.init();