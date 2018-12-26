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

/**
 * Adjusts some configuration values
 * @param cfg the configuration too adjust
 */
export function adjust(cfg) {
    // Adjusts the theta and the phi angles
    // 0 ⩽ θ ⩽ π
    cfg.state.theta = cfg.state.theta % (2 * Math.PI);
    if (cfg.state.theta > Math.PI) {
        cfg.state.theta = cfg.state.theta - Math.PI;
        cfg.state.phi = cfg.state.phi + Math.PI;
    }

    // 0 ⩽ φ < 2π
    cfg.state.phi = cfg.state.phi % (2 * Math.PI);
    if (cfg.state.phi < 0) {
        cfg.state.phi = cfg.state.phi + 2 * Math.PI;
    }

    // Limits the global rotation
    cfg.sphere.rotation.yaw = Math.min(
        Math.max(cfg.sphere.rotation.yaw, -Math.PI / 2),
        Math.PI / 2);

    cfg.sphere.rotation.pitch = Math.min(
        Math.max(cfg.sphere.rotation.pitch, 0),
        Math.PI / 2);

    cfg.sphere.rotation.roll = Math.min(
        Math.max(cfg.sphere.rotation.roll, 0),
        Math.PI / 2);
}
