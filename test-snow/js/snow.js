var ParticleEffect = function(){
    var cosRY, sinR,
    Particle3D = function(material){
        THREE.Particle.call(this, material);
        //this.material = material instanceof Array ? material : [ material ];

        // define properties
        this.velocity = new THREE.Vector3(0,-4,0);
        this.velocity.rotateX(randomRange(-45,45));
        this.velocity.rotateY(randomRange(0,90));
        this.gravity = new THREE.Vector3(0,0,0);
        this.drag = 1;
        // methods...
    };
    Particle3D.prototype = new THREE.Particle();
    Particle3D.prototype.constructor = Particle3D;

    Particle3D.prototype.updatePhysics = function(){
        this.velocity.multiplyScalar(this.drag);
        this.velocity.addSelf(this.gravity);
        this.position.addSelf(this.velocity);
    };

    var TO_RADIANS = Math.PI/180;

    THREE.Vector3.prototype.rotateY = function(angle){
        cosRY = Math.cos(angle * TO_RADIANS);
        sinRY = Math.sin(angle * TO_RADIANS);

        var tempz = this.z;
        var tempx = this.x;

        this.x= (tempx*cosRY)+(tempz*sinRY);
        this.z= (tempx*-sinRY)+(tempz*cosRY);
    };

    THREE.Vector3.prototype.rotateX = function(angle){
        cosRY = Math.cos(angle * TO_RADIANS);
        sinRY = Math.sin(angle * TO_RADIANS);

        var tempz = this.z;
        var tempy = this.y;

        this.y= (tempy*cosRY)+(tempz*sinRY);
        this.z= (tempy*-sinRY)+(tempz*cosRY);
    };

    THREE.Vector3.prototype.rotateZ = function(angle){
        cosRY = Math.cos(angle * TO_RADIANS);
        sinRY = Math.sin(angle * TO_RADIANS);

        var tempx = this.x;
        var tempy = this.y;

        this.y= (tempy*cosRY)+(tempx*sinRY);
        this.x= (tempy*-sinRY)+(tempx*cosRY);
    };

    // returns a random number between the two limits provided
    function randomRange(min, max){
        return ((Math.random()*(max-min)) + min);
    }

    var config = {
        container     : '',
        particle      : '',
        camera        : '',
        scene         : '',
        renderer      : '',
        mouseX        : 0,
        mouseY        : 0,
        num           : 100,
        width         : 800,
        height        : 500,
        particles     : [],
        imageSrc      : ''
    };

    
    var func = function(options){
        this.param = $.extend({}, config, options);
        this.init();
    };

    func.prototype.init = function(){
        var _this = this;
        
        var canvas_con = document.getElementById(_this.param.container),
            particleImage = new Image();
        particleImage.src = _this.param.imageSrc;
        _this.param.camera = new THREE.PerspectiveCamera(75, _this.param.width / _this.param.height, 1, 10000);
        _this.param.camera.position.z = 1000;
        _this.param.scene = new THREE.Scene();
        _this.param.scene.add(_this.param.camera);
        _this.param.renderer = new THREE.CanvasRenderer();
        _this.param.renderer.setSize(_this.param.width, _this.param.height);

        var material = new THREE.ParticleBasicMaterial({map: new THREE.Texture(particleImage)});
        for(var i = 0; i < _this.param.num; i++){
            _this.param.particle = new Particle3D(material);
            _this.param.particle.position.x = Math.random() * 2000 - 1000;
            _this.param.particle.position.y = Math.random() * 2000 - 1000;
            _this.param.particle.position.z = Math.random() * 2000 - 1000;
            _this.param.particle.scale.x = _this.param.particle.scale.y =  1;
            _this.param.scene.add(_this.param.particle);
            _this.param.particles.push(_this.param.particle);
        }

        canvas_con.appendChild(_this.param.renderer.domElement);

        setInterval(function(){
            _this.loop();
        }, 1000/60 );
    };

    func.prototype.loop = function(){
        var _this = this;
        
        for(var i = 0; i < _this.param.particles.length; i++){
            var particle = _this.param.particles[i];
            particle.updatePhysics();

            if(particle.position.y<-1000){
                particle.position.y+=2000;
            }

            if(particle.position.x>1000){
                particle.position.x-=2000;
            }else if(particle.position.x<-1000){
                particle.position.x+=2000;
            }

            if(particle.position.z>1000){
                particle.position.z-=2000;
            }else if(particle.position.z<-1000){
                particle.position.z+=2000;
            }
        }
        _this.param.camera.position.x += (_this.param.mouseX - _this.param.camera.position.x) * 0.02;
        // console.log(_this.param.camera.position.x)
        _this.param.camera.position.y += (- _this.param.mouseY - _this.param.camera.position.y) * 0.02;
        _this.param.camera.lookAt(_this.param.scene.position);
        _this.param.renderer.render(_this.param.scene, _this.param.camera);
    };
    // new func({
    //     container: 'snow-canvas'
    // });
    return{
        create: function(options){
            new func(options);
        }
    }
}();