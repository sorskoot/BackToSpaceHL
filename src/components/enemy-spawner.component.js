AFRAME.registerComponent('enemy-spawner', {
    schema: {
        spawnrate: {
            default: 100000
        },
        distance: {
            default: 5
        }
    },
    init: function () {
        this.counter = 0;//this.data.spawnrate;
        this.enemygroup = document.getElementById("enemy-group");
        this.active=true;
        this.el.sceneEl.addEventListener('enter-vr', () => {
            this.active = true;
        })
        this.el.sceneEl.addEventListener('exit-vr', () => {
            this.active = false;
        })

    },
    update: function (oldData) {

    },
    tick: function (time, timeDelta) {
        if (!this.active) return;
        this.counter -= timeDelta;
        if (this.counter <= 0) {
            this.spawn();
            this.counter = this.data.spawnrate;
        }
    },
    spawn: function () {
        let enemy = document.createElement("a-entity");
        enemy.classList.add('enemy');
        // let position = new THREE.Vector3(
        //     Math.sin(Math.random() * Math.PI * 2) * this.data.distance,
        //     10,
        //     Math.cos(Math.random() * Math.PI * 2) * this.data.distance
        // )
        enemy.setAttribute("enemy", '');
        this.enemygroup.appendChild(enemy);
    }
});