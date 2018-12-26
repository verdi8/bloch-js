import * as geomath from "./geomath";
import * as d3geo from "d3-geo";

/**
 * Creates a d3-geo projection for the given distance from the center
 * @param yaw the global yaw rotation angle in radians
 * @param pitch the global pitch rotation angle in radians
 * @param roll the global roll rotation angle in radians
 * @param d the distance from the sphere center
 * @return the d3 projection object
 */
export default function(yaw, pitch, roll, d) {
    return d3geo.geoOrthographic()
        .rotate([geomath.degrees(yaw), geomath.degrees(pitch), geomath.degrees(roll)])
        .translate([0, 0])
        .center([0, 0])
        .precision(0.5)
        .clipAngle(180)
        .scale(d);
}
