import vertShader from './../shaders/particle.vert.glsl';
import fragShader from './../shaders/particle.frag.glsl';

const PARTICLE_COUNT = 50;

AFRAME.registerComponent('enemy', {
    schema: {
        loopTime: {
            default: 15000
        }
    },
    init: function () {
        const textureLoader = new THREE.TextureLoader();
        const sprites = textureLoader.load('images/test.png');
        sprites.minFilter = sprites.magFilter = 1003;

        this.el.setAttribute('mixin', 'enemy-mixin');

        this.stepPerSec = (2 * Math.PI) / this.data.loopTime;
        this.step = 0;
        this.randomOffset = Math.random() * (2 * Math.PI);
        this.el.setAttribute("position", this.getPos(this.step));

        this._aliveParticles = [];
        this._deadParticles = [];

        this.particles = new THREE.BufferGeometry();

        this.particleVertices = new Float32Array(PARTICLE_COUNT * 3);
        this.particleLife = new Float32Array(PARTICLE_COUNT);
        this.particleVelocity = [];
        
        this.particles.setAttribute('position', new THREE.Float32BufferAttribute(this.particleVertices, 3));
        this.particles.setAttribute('life', new THREE.Float32BufferAttribute(this.particleLife,1));
        this.particles.setAttribute('cameraeye', new THREE.Float32BufferAttribute([0,0,0],3));

        this.particleMaterial = new THREE.ShaderMaterial(
            {
                extensions: {
                    derivatives: true
                },
                transparent: true,
                //wireframe: false,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                uniforms: {
                    cameraeye: { value: { x: 0.0, y: 0.0,z:0.0} },
                    pointsize: { value: 64.0 },
                    spriteIndex: { value: 1.0 },
                    spriteDimensions: { value: { x: 8.0, y: 1.0 } },
                    DiffuseTexture: { value: sprites },                    
                },
                vertexShader: vertShader,
                fragmentShader: fragShader
            }
        );
        this.particleSystem = new THREE.Points(
            this.particles,
            this.particleMaterial);


        this.particleEntity = document.createElement('a-entity');
        this.particleEntity.setObject3D('particle-system', this.particleSystem);
        this.el.parentEl.appendChild(this.particleEntity);
        this.particleRate = 30;
        this.particleTimer = 0;
        for (var p = 0; p < PARTICLE_COUNT; p++) {
            var index = p * 3;
            this.particleVertices[index] =
                this.particleVertices[index + 1] =
                this.particleVertices[index + 2] = 0;
            this.particleLife[p] = 6.0;
            this.particleVelocity.push(new THREE.Vector3(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1))
           // this._deadParticles.push(p);
        }
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        this.particleSystem.geometry.attributes.life.needsUpdate = true;
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


        //var prevParticlesCount = this._aliveParticles.length;

        const positions = this.particleSystem.geometry.attributes.position.array;
        const life = this.particleSystem.geometry.attributes.life.array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
           // const particle = this._aliveParticles[i];
            if (life[i] > 0) {
                const v = this.particleVelocity[i];
                positions[i * 3] += v.x / 400.0;
                positions[i * 3 + 1] += v.y/ 400.0;
                positions[i * 3 + 2] += v.z/ 400.0;
                life[i] -= .1;
                //life[i]=1.0;
            }
            else {
                positions[i * 3 ]=
                positions[i * 3 + 1] =
                positions[i * 3 + 2] = 0;
                life[i]=0.0;
                // this._aliveParticles.splice(i, 1);
                // this._deadParticles.push(particle);

            }
        }

        this.particleTimer += timeDelta;
        if (this.particleTimer > this.particleRate) {
            this.particleTimer = 0;
            //let p = 0;
            let p = life.findIndex(d => d <= 0);
            if (p != -1) {
                var index = p * 3;
                positions[index] = pos.x;
                positions[index + 1] = pos.y;
                positions[index + 2] = pos.z;
                life[p] = 6.0;//Math.random()*4.0;
            }
            // if (this._deadParticles.length > 0) {
            //     p = this._deadParticles.splice(0,1)[0];

            //     var index = p * 3;
            //     positions[index] = pos.x;
            //     positions[index + 1] = pos.y;
            //     positions[index + 2] = pos.z;
            //     life[p] = 24.0;
            //     this._aliveParticles.push(p);

            // }
            // positions.buffer.push(
            //     pos.x,
            //     pos.y,
            //     pos.z);
            // scales.buffer.push(.1);
            // this.particleSystem.setAttribute('position', new THREE.Float32BufferAttribute(this.particleVertices, 3));
        }

        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        this.particleSystem.geometry.attributes.life.needsUpdate = true;
        let campos = this.el.sceneEl.camera.getWorldPosition(zeroVector);
        
        this.particleSystem.geometry.attributes.cameraeye.value = [campos.x,campos.y,campos.z];
        // if (prevParticlesCount !== this._aliveParticles.length) {
        //     this.particles.setDrawRange(0, this._aliveParticles.length);
        // }
    },
    getPos(step) {
        return new THREE.Vector3(
            Math.sin(this.stepPerSec * step + this.randomOffset /* * random offset for variation */) * 5,
            Math.sin(this.stepPerSec * step * 2) + 2,
            Math.cos(this.stepPerSec * step + this.randomOffset) * 2);
    }

});
