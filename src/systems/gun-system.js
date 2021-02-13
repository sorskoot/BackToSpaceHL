AFRAME.registerSystem('bt-gun', {
    init: function () {
        this.gunButton = document.getElementById('connect-gun');
        this.gunButton.addEventListener('click', async () => {
            try {
                const device = await navigator.bluetooth.requestDevice(
                    {
                        filters:
                            [{ name: "ARGunGame" }],
                        optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']
                    });
                const server = await device.gatt.connect();
                const service = await server.getPrimaryService('0000fff0-0000-1000-8000-00805f9b34fb');
                const chars = await service.getCharacteristic('0000fff3-0000-1000-8000-00805f9b34fb');

                await chars.startNotifications();

                chars.addEventListener('characteristicvaluechanged',
                    (e) => {
                        let value = e.target.value;
                        const t = new TextDecoder();
                        const decoded = t.decode(e.target.value);
                        if (decoded == "ARGun KeyPressed") {
                            this.el.emit('trigger-pressed');
                        } else {
                            this.el.emit('trigger-released');
                        }
                    });
                console.log('connected to BT gun');
                this.gunButton.classList.add('connected');
                const enterXrButton = document.getElementById('enter-xr');
                enterXrButton.classList.remove('disabled');
                enterXrButton.removeAttribute('disabled');
                
                var x = navigator.getGamepads();
                for (let i = 0; i < x.length; i++) {
                    const element = x[i];
                    if(element!=null){
                        console.log(element.hand);
                    }
                }

            } catch (error) {
                console.log(error);
            }
        })
    },
});