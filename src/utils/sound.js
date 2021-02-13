// import { jsfxr } from './jsfxr';

// let audiopool = [];
// for (let i = 0; i < 50; i++) {
//     audiopool.push(new Audio());
// }
// let currentIndex = 0;
// const fire = [0, , 0.33, 0.0853, 0.1802, 0.5299, 0.2, -0.2399, -0.0599, , , -1, , 0.8922, -0.5931, , 0.0246, -0.0455, 1, , , 0.0036, , 0.28],
//     explosion = [3, , 0.58, 0.35, 0.0547, 0.16, , -0.18, , , , -0.3774, 0.6619, , , , 0.598, -0.1327, 1, , , , , 0.28],
//     gameover = [3, 0.09, 0.67, 0.35, 0.93, 0.2, , -0.12, , , , -0.3774, 0.62, , , , 0.1399, -0.3, 1, , , , , 0.28];

// let sounds = [
//     jsfxr(fire),
//     jsfxr(explosion),
//     jsfxr(gameover)
// ]
// export const sound = {
//     play: function (params) {
//         audiopool[currentIndex].src = sounds[params];
//         audiopool[currentIndex].play();
//         currentIndex = (currentIndex + 1) % 50;
//     },
//     fire:0,
//     explosion:1,
//     gameover:2
var sounds = {
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
    "sound_vol": 0.073,
    "sample_rate": 44100,
    "sample_size": 8,
    "p_vib_delay": null
  }

var s = new SoundEffect(sounds).generate();
var explosion_sfx = new SoundEffect(explosion).generate();
// returns a webaudio object if supported, or an Audio object


export const sound = {
    play: function (params) {
        switch (params) {
            case 1:
                s.getAudio().play();
                break;
            case 2:
                explosion_sfx.getAudio().play();
                break;
        }
    },
    fire: 1,
    explosion:2,
}
