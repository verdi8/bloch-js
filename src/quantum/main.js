import * as math from "mathjs"
import {assert} from "chai";

/*
 * Mainly inspired by http://www.vcpc.univie.ac.at/~ian/hotlist/qc/talks/bloch-sphere-rotations.pdf
 */

/**
 * Constant state matrix for ket-plus
 */
export const KET_PLUS_DENSITY = density(math.PI / 2, 0);

/**
 * Constant state matrix for ket-minus
 */
export const KET_MINUS_DENSITY = density(math.PI / 2, math.PI);

/**
 * Gives the density operator of the quantum state described by the theta and phi angle values
 */
export function density(theta, phi) {
    return math.eval(` (1/2) * [ 
            1 + cos(theta), cos(phi) * sin(theta) - i sin(phi) sin(theta);
            cos(phi) * sin(theta) + i sin(phi) sin(theta), 1 - cos(theta)    
        ]`, { theta:theta, phi:phi } );
}

/**
 * Gives the theta angle value for a given quantum state
 */
export function theta(density) {
    var a = math.subset(density, math.index(0, 0));
    return math.re(math.eval('acos(2 * a - 1)', { a : a }));
}

/**
 * Gives the theta angle value for a given quantum state
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

/**
 * Applies a rotation matrix to a density matrix
 * @param rotation the rotation matrix
 * @param density the density matrix
 */
export function rotate(rotation, density) {
    return math.eval('rotation * density * ctranspose(rotation)', { density : density, rotation : rotation});
}
