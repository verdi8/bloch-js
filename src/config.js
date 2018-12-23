/**
 * The default configuration
 * @type {{size: number, style: string, state: {theta: number, phi: number}, sphere: {rotation: {yaw: number, pitch: number, roll: number}, graticules: {step: number}}, ket0: {label: string}, ket1: {label: string}, axes: {oveflow: number, x: {label: string}, y: {label: string}, z: {label: string}}}}
 */
export var defaultConfig = {
    size : 400,
    style : "default",
    state : {
        theta : 1 * Math.PI / 4,
        phi : - 1 * Math.PI / 4,
    },
    sphere : {
        rotation : { // The overall sphere rotation : yaw,  pitch, roll, in degrees
            yaw: Math.PI / 9, // 20 degrees
            pitch: Math.PI / 9, // 20 degrees
            roll: 0,
        },
        graticules : {
            step : Math.PI / 2,
        }
    },
    ket0 : {
        label : "|0\u27E9",
    },
    ket1 : {
        label : "|1\u27E9",
    },
    axes : {
        oveflow : 1.2,
        x : {
            label : "x",
        },
        y : {
            label : "y",
        },
        z : { // Z axe is always vertical
            label : "z",
        },
    }
};

