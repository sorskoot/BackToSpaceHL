import Particles from '../utils/particles';

AFRAME.registerComponent('enemy', {
    schema: {
        loopTime: {
            default: 15000
        }
    },
    init: function () {
      

        this.el.setAttribute('mixin', 'enemy-mixin');

        this.stepPerSec = (2 * Math.PI) / this.data.loopTime;
        this.step = 0;
        this.randomOffset = Math.random() * (2 * Math.PI);
        this.el.setAttribute("position", this.getPos(this.step));
        this.particles = new Particles();        
        this.particles.CreateParticles(this.el, 'images/Combustion1.png', .3);
        //this.particles.setDrawRange(0, 0);
    },
    update: function (oldData) { },
    tick: function (time, timeDelta) {

        let pos = this.el.object3D.position;
        this.step += timeDelta;
        if (this.step > this.data.loopTime) this.step = 0;

        var d = this.getPos(this.step)
        pos.x = d.x;
        pos.y = d.y;
        pos.z = d.z;
        this.el.object3D.lookAt(this.getPos(this.step + timeDelta));       

        this.particles.UpdateParticles(timeDelta, pos);

    },
    remove: function () { 
        this.particles.remove();
    },
    getPos(step) {
        return new THREE.Vector3(
            Math.sin(this.stepPerSec * step + this.randomOffset /* * random offset for variation */) * 5,
            Math.sin(this.stepPerSec * step * 2) + 2,
            Math.cos(this.stepPerSec * step + this.randomOffset) * 2);
    }

});
