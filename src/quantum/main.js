import * as math from "mathjs"
import * as qmath from "./qmath"

/*
 * Mainly inspired by http://www.vcpc.univie.ac.at/~ian/hotlist/qc/talks/bloch-sphere-rotations.pdf
 */

/**
 * Constant state matrix for ket-plus
 * @type {{theta, phi, rz, rotate}}
 */
export const KET_PLUS = state(math.PI / 2, 0);

/**
 * Constant state matrix for ket-minus
 * @type {{theta, phi, rz, rotate}}
 */
export const KET_MINUS = state(math.PI / 2, math.PI);

/**
 * Creates a state represented by a theta and phi angle
 * @param {number} theta the theta angle
 * @param {number} phi the phi angle
 * @return {{theta: theta, phi: phi, rz: rz, rotate: rotate}}
 */
export function state(theta, phi) {
    var normalized = qmath.normalize(theta, phi);
    return {

        /***
         * Gives the state theta angle
         * @return {number}
         */
        theta : function () {
            return normalized.theta();
        },

        /***
         * Gives the state phi angle
         * @return {number}
         */
        phi : function () {
            return normalized.phi();
        },

        /**
         * Rotates the state around the Z axis
         * @param {number} tau the angle around the Z axis, if not given then a π angle is applied
         * @return {{theta, phi, rotate}}
         */
        rz : function (tau = math.PI) {
            return this.rotate(qmath.rz(tau));
        },

        /**
         * Rotates the state and gives a new rotated state
         * @param {math.Matrix} rotation the rotation matrix to appli
         * @return {{theta, phi, rz, rotate}}
         */
        rotate : function(rotation) {
            var density = qmath.density(theta, phi);
            var density2 = qmath.rotate(rotation, density);
            var normalized = qmath.normalize(
                qmath.theta(density2),
                qmath.phi(density2)
            );

            return state(normalized.theta(), normalized.phi());
        }

    }
}





