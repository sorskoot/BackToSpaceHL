import { sound, sounds } from '../utils/sound';
AFRAME.registerComponent('game', {
    schema: {},
    init: function () {
        this.missilegroup = document.getElementById("missile-group");
        
    },
    update: function (oldData) { },
    tick: function (time, timeDelta) { },
    tock: function (time, timeDelta, camera) { },
    remove: function () { },
    pause: function () { },
    play: function () { },
    updateSchema: function (data) { },
    spawnMissile: function (direction, position) {        
        sound.play(sound.fire);
        let box = document.createElement("a-entity");        
        box.setAttribute("mixin","missile-mixin"); 
        box.setAttribute("missile", { direction: direction, position: position });
        this.missilegroup.appendChild(box);
    },
});