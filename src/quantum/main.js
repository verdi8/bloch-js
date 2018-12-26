import * as math from "mathjs"

/**
 * Gives the density matrix of the quantum state described by the theta and phi angle values
 */
export function state(theta, phi) {
    return math.eval(`[ 
            cos(theta/2);
            e^(phi*i) * sin(theta/2)    
        ]`, { phi:phi, theta:theta } );
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

export function rotationMatrix(theta, phi, lambda) {
     return math.eval(`
       1/2 * [
               [ 1 + cos(theta),                                      cos(phi) * sin(theta) + i * sin(phi) * sin(theta) ],
               [ cos(phi) * sin(theta) + i * sin(phi) * sin(theta),   1 - cos(theta) ]
             ]
       `
       ,
         { phi:phi, theta:theta }
         );
}