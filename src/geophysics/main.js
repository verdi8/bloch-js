import * as geomath from "./geomath"
import geoPath from "./geopath";
import geoProjection from "./geoprojection";
import * as d3geo from "d3-geo"
import * as d3shape from "d3-shape"
import * as d3interpolate from "d3-interpolate"

/**
 * Creates the geophysic core with global rotation
 * @param yaw yaw rotation angle
 * @param pitch pitch rotation angle
 * @param roll roll rotation angl
 */
export default function(yaw, pitch, roll) {

    return {

        /**
         * Computes the screen X coordinate as a projection
         * @param d the distance from the center
         * @param phi the quantum phi angle
         * @param theta the quantum theta angle
         * @return {number} the X coordinate
         */
        x(d, theta, phi) {
            var projection = geoProjection(yaw, pitch, roll, d);
            return projection([geomath.lon(phi), geomath.lat(theta)])[0];
        },

        /**
         * Computes the screen Y coordinate as a projection
         * @param d the distance from the center
         * @param phi the quantum phi angle
         * @param theta the quantum theta angle
         * @return {number} the Y coordinate
         */
        y(d, theta, phi) {
            var projection = geoProjection(yaw, pitch, roll, d);
            return projection([geomath.lon(phi), geomath.lat(theta)])[1];
        },

        /**
         * Creates the spherical path
         * @param d the distance from the center
         */
        spherePath(d) {
            var path = geoPath(yaw, pitch, roll, d);
            path.projection().clipAngle(90); // Hint to have the horizon drawn
            return path({type: "Sphere"});
        },

        graticulePath(d, step) {
            var path = geoPath(yaw, pitch, roll, d);
            var graticule = d3geo.geoGraticule()
                .step([0, geomath.degrees(step)])
                .precision(2)
                (); // Generates the MultiLine graticule
            return path(graticule);
        },

        /**
         * Creates a path for a straight line.
         * If the startD, startTheta and startPhi starting point coordinates are not given, the center is considered as the starting point
         * @param endD the distance from the center of the ending point
         * @param endTheta the theta angle of the ending point
         * @param endPhi the theta angle of the ending point
         * @param startD the distance from the center of the starting point
         * @param startTheta the theta angle of the starting point
         * @param startPhi the theta angle of the starting point
         */
        linePath(endD, endTheta, endPhi, startD = 0, startTheta = 0, startPhi = 0) {
            var path = d3shape.line()
                .x((d) => this.x(...d))
                .y((d) => this.y(...d));
            return path([
                [startD,  startTheta, startPhi], [endD,  endTheta, endPhi]
            ]);
        },

        /**
         * Creates the path that represents an angle (as an arc)
         * @param d the distance from the center
         * @param startTheta the starting theta angle
         * @param startPhi the starting phi angle
         * @param endTheta the ending theta angle
         * @param endPhi the ending phi angle
         */
        anglePath(d, startTheta, startPhi, endTheta, endPhi) {
            var path = geoPath(yaw, pitch, roll, d);
            var interpolator = d3interpolate.interpolateArray(
                [geomath.lon(startPhi), geomath.lat(startTheta)],
                [geomath.lon(endPhi), geomath.lat(endTheta)]
            );
            var geoCoords = d3.quantize((i) => Array.from(interpolator(i)), 8);
            var geoObject = { type: 'LineString', coordinates: geoCoords }
            // if(path.measure(geoObject) > 0) { // The angle is long enough to be displayed
            //     return path()
            // }
            return path(geoObject);
        },

    }

}


