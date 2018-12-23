import {lon, lat, radians, degrees} from "./math"
import {geoPath} from "./geopath";
import {geoProjection} from "./geoprojection";
import * as d3 from "d3"

/**
 * Creates the geophysic core with global rotation
 * @param yaw yaw rotation angle
 * @param pitch pitch rotation angle
 * @param roll roll rotation angl
 */
export default function(yaw, pitch, roll) {

    return {
        /**
         * Some constants
         */
        const : {
            /**
             * Axes angles
             */
            axes: {
                x : {
                    theta : Math.PI / 2,
                    phi : 0
                },
                y : {
                    theta : Math.PI / 2,
                    phi : Math.PI / 2
                },
                z : {
                    theta : 0,
                    phi : 0
                }
            },
        },


        /**
         * Computes the screen X coordinate as a projection
         * @param d the distance from the center
         * @param phi the quantum phi angle
         * @param theta the quantum theta angle
         * @return {number} the X coordinate
         */
        screenX(d, theta, phi) {
            var projection = geoProjection(yaw, pitch, roll, d);
            return projection([lon(phi), lat(theta)])[0];
        },

        /**
         * Computes the screen Y coordinate as a projection
         * @param d the distance from the center
         * @param phi the quantum phi angle
         * @param theta the quantum theta angle
         * @return {number} the Y coordinate
         */
        screenY(d, theta, phi) {
            var projection = geoProjection(yaw, pitch, roll, d);
            return projection([lon(phi), lat(theta)])[1];
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
            var graticule = d3.geoGraticule()
                .step([0, degrees(step)])
                .precision(2)
                (); // Generates the MultiLine graticule
            return path(graticule);
        }
    }

}


