//const velocityStart = 32;//64;
// const speedShrink = 4000;//3000;
// const outward = 2000;//1000;
// const downward = 1500;//1000;

import {sound} from '../utils/sound';
import Particles from '../utils/particles';

AFRAME.registerComponent('explosion', {
    schema: {
        color: {
            type: 'color'
        },
        size:{
            default:.25
        },
        velocityStart:{
            default: 32
        },
        outward:{
            default:2000,
        },
        burst:{
            default:5
        },
        lifetime:{default:1500}
    },
    init: function () {
        sound.play(sound.explosion, this.el.object3D);
        this.particles = new Particles();
        let particleEl = this.particles.CreateParticles(this.el,'./images/explosion.png',.1, true, 0, 50,false, 128);
        particleEl.setAttribute('selfdestruct', { timer: this.data.lifetime });
        this.el.setAttribute('selfdestruct', { timer: this.data.lifetime });
    },
    tick: function (time, timeDelta) {
        this.particles.UpdateParticles(timeDelta,this.el.object3D.position);
    }
});