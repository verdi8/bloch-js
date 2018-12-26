import * as math from "mathjs"
import qmath from "./qmath";

/*
 * Mainly inspired by http://www.vcpc.univie.ac.at/~ian/hotlist/qc/talks/bloch-sphere-rotations.pdf
 */

/**
 * Constant state matrix for ket-plus
 */
export const KET_PLUS = state(math.PI / 2, 0);

/**
 * Constant state matrix for ket-minus
 */
export const KET_MINUS = state(math.PI / 2, math.PI);

/**
 * Gives the density matrix of the quantum state described by the theta and phi angle values
 */
export function state(theta, phi) {
    return math.eval(`[ 
            cos(theta / 2);
            e^(phi * i) * sin(theta / 2)    
        ]`, { theta:theta, phi:phi } );
}

/**
 * Gives the ket-0 coefficient of the state matrix
 */
export function alpha(state) {
    return math.subset(state, math.index(0, 0));
}

/**
 * Gives the ket-1 coefficient of the state matrix
 */
export function beta(state) {
    return math.subset(state, math.index(1, 0));
}

/**
 * Gives the theta angle value for a given quantum state
 */
export function theta(state) {
    var a =  alpha(state);
    console.log(a);
    return math.eval('2 * acos(a)', { a : a });
}

/**
 * Gives the theta angle value for a given quantum state
 */
export function phi(state) {
    var b = beta(state);
    var t = theta(state);
    if (t == 0) { // when theta is equal to zero, phi can be any value, so let's decide of zero
        return 0;
    }
    return math.eval('log(b / sin(t / 2))', { b: b,  t:t }).im; // Gets the imaginary part as a by-i-division;
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
 * Applies a rotation matrix to a state matrix
 * @param rotation the rotation matrix
 * @param state the state matrix
 */
export function rotate(rotation, state) {
    return math.eval('rotation * state', {rotation:rotation, state:state});
}


