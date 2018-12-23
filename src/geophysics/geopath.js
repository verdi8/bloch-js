import {geoProjection} from "./geoprojection";

/**
 * Creates a d3 path generator for the given distance from the center
 * @param yaw the global yaw rotation angle in radians
 * @param pitch the global pitch rotation angle in radians
 * @param roll the global roll rotation angle in radians
 * @param d the distance from the sphere center
 * @return the d3 path generator object
 */
export function geoPath(yaw, pitch, roll, d) {
    var projection = geoProjection(yaw, pitch, roll, d);
    return d3.geoPath(projection);
}
