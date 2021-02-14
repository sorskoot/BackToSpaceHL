let audiopool = [];
let pannerNodes = [];

// change this so the audio context gets (loaded if not already) 
// when the game actually starts.
let audioContext;

function InitAudio() {
    //     if (audioContext) return;
    audioContext = new AudioContext();
 //   audioContext.listener.upX.value = 0;
    audioContext.listener.upY.value = 1;
  //  audioContext.listener.upZ.value = 0;
    
    let gain = audioContext.createGain();
    gain.connect(audioContext.destination);

    for (let i = 0; i < 25; i++) {
      //  const audio = new AudioBuffer();
        
     //   audiopool.push(audio);
       // const element = audioContext.createMediaElementSource(audio);
        const pn = new PannerNode(audioContext, {
            panningModel: 'HRTF',
            distanceModel: 'exponential',
        });

     //   element.connect(pn);
        pn.connect(gain);
        pannerNodes.push(pn);
    }
}
let currentSfxIndex = 0;


var shoot = {
    "oldParams": true,
    "wave_type": 3,
    "p_env_attack": 0.035955594242536346,
    "p_env_sustain": 0.252,
    "p_env_punch": 0.36,
    "p_env_decay": 0.381,
    "p_base_freq": 0.669,
    "p_freq_limit": 0.176,
    "p_freq_ramp": -0.361,
    "p_freq_dramp": 0.459,
    "p_vib_strength": -0.04830729827116639,
    "p_vib_speed": 0.06746856641238105,
    "p_arp_mod": -0.296,
    "p_arp_speed": 0.046,
    "p_duty": 0.8567170329313942,
    "p_duty_ramp": -0.2262388905265607,
    "p_repeat_speed": 0,
    "p_pha_offset": -0.675,
    "p_pha_ramp": -0.41,
    "p_lpf_freq": 0.724,
    "p_lpf_ramp": -0.332,
    "p_lpf_resonance": 0.193,
    "p_hpf_freq": 0.155,
    "p_hpf_ramp": -0.519,
    "sound_vol": 0.25,
    "sample_rate": 44100,
    "sample_size": 8,
    "p_vib_delay": null
};
let explosion = {
    "oldParams": true,
    "wave_type": 3,
    "p_env_attack": 0.14,
    "p_env_sustain": 0.232,
    "p_env_punch": 0.755,
    "p_env_decay": 0.712,
    "p_base_freq": 0.177,
    "p_freq_limit": 0,
    "p_freq_ramp": 0.16947024993653173,
    "p_freq_dramp": 0.008375706279232412,
    "p_vib_strength": 0.008577925958069325,
    "p_vib_speed": -0.001003360912813854,
    "p_arp_mod": 0.6331538657214422,
    "p_arp_speed": 0.7299614438918235,
    "p_duty": -0.005371280731105134,
    "p_duty_ramp": 0,
    "p_repeat_speed": 0.014484568204551726,
    "p_pha_offset": -0.329,
    "p_pha_ramp": -0.036634508929190665,
    "p_lpf_freq": 0.761,
    "p_lpf_ramp": -0.077,
    "p_lpf_resonance": -0.002493939081006105,
    "p_hpf_freq": 0.127,
    "p_hpf_ramp": -0.24,
    "sound_vol": 1,
    "sample_rate": 44100,
    "sample_size": 8,
    "p_vib_delay": null
  }


let soundfx = [
    new SoundEffect(shoot).generate().buffer,
    new SoundEffect(explosion).generate().buffer
];

export const sound = {
    init: InitAudio,
    play: function (params, p) {
        let pos=p.getWorldPosition(zeroVector);
        pannerNodes[currentSfxIndex].positionX.value = pos.x;
        pannerNodes[currentSfxIndex].positionY.value = pos.y;
        pannerNodes[currentSfxIndex].positionZ.value = pos.z;

        var n = new AudioBufferSourceNode(audioContext);
        n.buffer = new AudioBuffer({length:soundfx[params].length, sampleRate:44100,numberOfChannels:1})
        n.buffer.copyToChannel(soundfx[params],0);
        n.connect(pannerNodes[currentSfxIndex]);
        n.start();
        // audiopool[currentSfxIndex].buffer = soundfx[params];
        // audiopool[currentSfxIndex].play();
        currentSfxIndex = (currentSfxIndex + 1) % 25;
        // switch (params) {
        //     case 1:
        //         s.getAudio().play();
        //         break;
        //     case 2:
        //         explosion_sfx.getAudio().play();
        //         break;
        // }
    },
    fire: 0,
    explosion:1,
}
