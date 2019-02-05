import * as math from "mathjs";

/**
 * Computes the density matrix of the quantum state described by the theta and phi angle values
 */
export function density(theta, phi) {
    var normalizer =  normalize(theta, phi);
    theta = normalizer.theta();
    phi = normalizer.phi();
    return math.eval(` (1/2) * [ 
            1 + cos(theta), cos(phi) * sin(theta) - i sin(phi) sin(theta);
            cos(phi) * sin(theta) + i sin(phi) sin(theta), 1 - cos(theta)    
        ]`, { theta:theta, phi:phi } );
}

/**
 * Gives the theta angle value for a given density matrix
 * @param {math.Matrix} density the density matrix
 * @return {number}
 */
export function theta(density) {
    var a = math.subset(density, math.index(0, 0));
    return math.re(math.eval('acos(2 * a - 1)', { a : a }));
}

/**
 * Gives the theta angle value for a given density matrix
 * @param {math.Matrix} density the density matrix
 * @return {number}
 */
export function phi(density) {
    var t = theta(density);
    var b = math.subset(density, math.index(0, 1));
    if (t == 0) { // when theta is equal to zero, phi can be any value, so let's decide of zero
        return 0;
    }
    return math.re(math.eval('conj(log(2b / sin(theta)))', { b: b,  theta:t }).im); // Gets the imaginary part as a by-i-division;
}

/**
 * Normalize the theta angle (0 ⩽ θ ⩽ π) and  the phi angle (0 ⩽ φ < 2π).
 * Must then read theta or phi properties to get the normalized values.
 * @param {number} theta the theta angle
 * @param {number} phi the phi angle
 * @return{{theta: theta, phi: phi}}
 */
export function normalize(theta, phi) {
    theta = mod2pi(theta);
    phi = mod2pi(phi);

    if (theta > math.PI || theta < 0) {
        theta = 2 * math.PI - theta;
        phi = phi + math.PI;
    }
    if (phi < 0) {
        phi = phi + 2 * math.PI;
    }

    theta = mod2pi(theta);
    phi = mod2pi(phi);
    return {
        /**
         * Gives back the normalized theta angle
         * @return {number}
         */
        theta : function() {
            return theta;
        },
        /**
         * Gives back the normalized phi angle
         * @return {number}
         */
        phi : function() {
            return phi;
        }
    };
}

/**
 * Applies a rotation matrix to a density matrix
 * @param {math.Matrix} rotation the rotation matrix
 * @param {math.Matrix}  density the density matrix to rotate
 * @return {math.Matrix} the rotated density matrix
 */
export function rotate(rotation, density) {
    return math.eval('rotation * density * ctranspose(rotation)', { density : density, rotation : rotation});
}

/**
 * Creates a rotation matrix around the Z axis
 * @param tau the rotation angle
 */
export function rz(tau) {
    return math.eval(`[
           [ e^(-i tau/2), 0           ],
           [ 0,            e^(i tau/2) ]
        ]`, { tau:tau }
    );
}

// Private function

/**
 * Normalizes any angle, that is keeps it between 0 and 2π
 * @param {number} angle the angle ton normalize
 * @return {number}
 */
function mod2pi(angle) {
    return math.mod(angle, 2 * math.PI) // math.js mod function does the job better than javascript native %
}