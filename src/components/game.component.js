import { sound, sounds } from '../utils/sound';

window.forwardVector = new THREE.Vector3(0, 0, 1);
window.zeroVector= new THREE.Vector3(0,0,0);

AFRAME.registerComponent('game', {
    schema: {},
    init: function () {
        this.missilegroup = document.getElementById("missile-group");
        this.music = document.getElementById("music");
        this.title = document.getElementById('titlescreen');
        sound.init();
        this.el.sceneEl.addEventListener('enter-vr',()=>{
            console.log('here we go!');
            this.music.play();
            this.music.volume = .3;
            this.title.style.visibility = 'none';
        });
        this.el.sceneEl.addEventListener('exit-vr',()=>{
            console.log('done :(');
            this.music.pause();
            this.title.style.visibility = 'visible';
        });
        // window.addEventListener("gamepadconnected", function(e) {
        //     console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        //       e.gamepad.index, e.gamepad.id,
        //       e.gamepad.buttons.length, e.gamepad.axes.length);
        //   });

        // this.el.sceneEl.addEventListener('controllersupdated', (e)=>{
        //     if(this.el.xrSession)
        //         console.log(this.el.xrSession.inputSources);
        //     else    
        //         log('no xrsession')

        // });
    },
    update: function (oldData) { },
    tick: function (time, timeDelta) { 
 
    },
    tock: function (time, timeDelta, camera) { },
    remove: function () { },
    pause: function () { },
    play: function () { },
    updateSchema: function (data) { },
    spawnMissile: function (direction, position) {        
        
        let box = document.createElement("a-entity");        
        box.setAttribute("mixin","missile-mixin"); 
        box.setAttribute("missile", { direction: direction, position: position });
        this.missilegroup.appendChild(box);
    },
});