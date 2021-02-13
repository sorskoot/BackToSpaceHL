AFRAME.registerComponent('enemy', {
    schema: {
        loopTime: {
            default: 15000
        }
    },
    init: function () {
        // const camerapos = document.getElementById("camera").object3D.position;
        // this.direction = new THREE.Vector3();
        // this.direction.copy(this.data.position)
        // this.direction.sub(new THREE.Vector3(camerapos.x, camerapos.y + 1.8, camerapos.z)).normalize();

        this.el.setAttribute('mixin', 'enemy-mixin');
        
        //this.el.object3D.lookAt(new THREE.Vector3(this.direction.x, this.direction.y, this.direction.z));
        //console.log(`Spawned enemy at ${this.data.position.x},${this.data.position.y},${this.data.position.z}`)
        this.stepPerSec = (2 * Math.PI) / this.data.loopTime;
        this.step = 0;
        this.randomOffset = Math.random() * (2 * Math.PI);
        this.el.setAttribute("position", this.getPos(this.step));
    },
    update: function (oldData) { },
    tick: function (time, timeDelta) {
        let pos = this.el.object3D.position;
        this.step += timeDelta;
        if (this.step > this.data.loopTime) this.step = 0;
        // console.log(Math.sin(this.stepPerSec * this.step + this.randomOffset));
        // pos.x = Math.sin(this.stepPerSec * this.step + this.randomOffset /* * random offset for variation */) * 2.5;
        // pos.y = 1.5;
        // pos.z = Math.cos(this.stepPerSec * this.step + this.randomOffset /* * random offset for variation */) * 1.5;
        //console.log(this.getPos(this.step));
        var d= this.getPos(this.step)
        pos.x = d.x;
        pos.y = d.y;
        pos.z = d.z;
        this.el.object3D.lookAt(this.getPos(this.step+timeDelta));
        // pos.x -= this.direction.x * this.data.speed * (timeDelta / 1000);
        // pos.y -= this.direction.y * this.data.speed * (timeDelta / 1000);
        // pos.z -=  this.direction.z * this.data.speed * (timeDelta / 1000);
    },
    getPos(step) {
        return new THREE.Vector3(
            Math.sin(this.stepPerSec * step + this.randomOffset /* * random offset for variation */) * 5,
            Math.sin(this.stepPerSec * step * 2)+2,
            Math.cos(this.stepPerSec * step + this.randomOffset) * 2);
    }

});