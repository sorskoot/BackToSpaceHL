const { default: Particles } = require("../utils/particles");
const { sound } = require("../utils/sound");

AFRAME.registerComponent('missile', {
    schema: {
        speed: {
            default: 5
        },
        lifetime: {
            default: 2500
        },
        collisionDistance: {
            default: 5
        },
        direction: {
            type: 'vec3'
        },
        position: {
            type: 'vec3'
        },
        yCorrection: {
            default: -.1
        }
    },
    init: function () {
        this.el.setAttribute("position", this.data.position);
        this.life = this.data.lifetime;
        this.el.setAttribute('scale','.4 .4 .4');
        this.missilegroup = document.getElementById("missile-group");;
        this.el.setAttribute("raycaster","far:2;showLine:false;objects:.enemy");
        sound.play(sound.fire, this.el.object3D);
        this.particles = new Particles();
        this.particles.CreateParticles(this.el, '/images/explosion.png',.1);
        this.el.addEventListener('raycaster-intersection', (e)=>{            
            let elm = e.detail.els[0];
            let explosion = document.createElement('a-entity');
            explosion.setAttribute('position', elm.object3D.position);
            explosion.setAttribute('explosion', 'color:green');
            this.missilegroup.appendChild(explosion);
            elm.remove();
            this.el.remove();
            this.particles.remove();
        });          
        
    },
    update: function (oldData) { },

    tick: function (time, timeDelta) {
        // if (this.collision) return;
        let pos = this.el.object3D.position;      
        this.el.object3D.lookAt(new THREE.Vector3(this.data.direction.x,this.data.direction.y,this.data.direction.z));
        pos.x -= this.data.direction.x * this.data.speed * (timeDelta / 1000);
        pos.y -= (this.data.direction.y + this.data.yCorrection) * this.data.speed * (timeDelta / 1000);
        pos.z -=  this.data.direction.z * this.data.speed * (timeDelta / 1000);
        this.particles.UpdateParticles(timeDelta,pos);
        this.life -= timeDelta;
        if (this.life < 0) {
             this.el.remove();
             this.particles.remove();
         }
    }   
});