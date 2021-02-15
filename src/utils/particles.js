import vertShader from './../shaders/particle.vert.glsl';
import fragShader from './../shaders/particle.frag.glsl';

const PARTICLE_COUNT = 50;

export default class Particles {

    UpdateParticles(timeDelta, pos) {
        const positions = this.particleSystem.geometry.attributes.position.array;
        const life = this.particleSystem.geometry.attributes.life.array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            if (life[i] > 0) {
                const v = this.particleVelocity[i];
                positions[i * 3] += v.x / 400.0;
                positions[i * 3 + 1] += v.y / 400.0;
                positions[i * 3 + 2] += v.z / 400.0;
                life[i] -= this.decay;
            }
            else {
                positions[i * 3] =
                    positions[i * 3 + 1] =
                    positions[i * 3 + 2] = 0;
                life[i] = 0.0;
            }
        }

        this.particleTimer += timeDelta;
        if (this.particleTimer > this.particleRate) {
            this.particleTimer = 0;
            let p = life.findIndex(d => d <= 0);
            if (p != -1) {
                var index = p * 3;
                positions[index] = pos.x;
                positions[index + 1] = pos.y;
                positions[index + 2] = pos.z;
                life[p] = 6.0;
            }
        }

        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        this.particleSystem.geometry.attributes.life.needsUpdate = true;
    }

    CreateParticles(rootEl, texture, decay=.1) {
        this.decay = decay;
        const textureLoader = new THREE.TextureLoader();
        const sprites = textureLoader.load(texture);
        sprites.minFilter = sprites.magFilter = 1003;

        this.particles = new THREE.BufferGeometry();

        this.particleVertices = new Float32Array(PARTICLE_COUNT * 3);
        this.particleLife = new Float32Array(PARTICLE_COUNT);
        this.particleVelocity = [];

        this.particles.setAttribute('position', new THREE.Float32BufferAttribute(this.particleVertices, 3));
        this.particles.setAttribute('life', new THREE.Float32BufferAttribute(this.particleLife, 1));
        this.particles.setAttribute('cameraeye', new THREE.Float32BufferAttribute([0, 0, 0], 3));

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
                    cameraeye: { value: { x: 0.0, y: 0.0, z: 0.0 } },
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
        rootEl.parentEl.appendChild(this.particleEntity);
        this.particleRate = 30;
        this.particleTimer = 0;
        for (var p = 0; p < PARTICLE_COUNT; p++) {
            var index = p * 3;
            this.particleVertices[index] =
                this.particleVertices[index + 1] =
                this.particleVertices[index + 2] = 0;
            this.particleLife[p] = 6.0;
            this.particleVelocity.push(new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1));
            // this._deadParticles.push(p);
        }
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        this.particleSystem.geometry.attributes.life.needsUpdate = true;
    }
    
    remove(){
        this.particleEntity.remove();
    }
}