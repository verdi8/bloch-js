import * as quantum from './quantum/main';
import render from './render';
import * as configurator from "./configurator";
import * as d3selection from "d3-selection"
import mouserotate from "./mouserotate"
import * as math from "mathjs"
import {defaultConfig} from "./configurator";

/**]€
 * Creates a bloch sphere
 */
export default function (container) {

    /**
     * Global variable to solve some id conflicts, especially for SVG markers
     * @type {number}
     */
    var blochCount = 0;

    /**
     * A total Bloch Sphere counter that has been created
     * @type {number}
     */
    var index = blochCount++;

    var bloch = {
        container : container,
        currentConfig : configurator.defaultConfig,
        state : quantum.state(0, 0),

        /**
         * Applies the configuration
         * @param c the configuration
         */
        config: function (c) {
            if (c === undefined) {
                return this.currentConfig;
            } else {
                this.currentConfig = c;

            }
        },

        refresh: function() {
            render(this.container, this.currentConfig, this.state);
        },

        /**
         * Makes the whole sphere visualization rotate.
         * @param phi the new phi angle, if set to null, no change is made to this angle
         * @param lambda the new lambda angle, if set to null, no change is made to this angle
         * @param gamma the new gamma angle, if set to null, no change is made to this angle
         */
        rotateSphereTo : function(yaw, pitch, roll) {
            if(yaw != null) {
                this.currentConfig.sphere.rotation.yaw = yaw;
            }
            if(pitch != null) {
                this.currentConfig.sphere.rotation.pitch = pitch;
            }
            if(roll != null) {
                this.currentConfig.sphere.rotation.roll = roll;
            }
            this.refresh();
        },


        phi : function(phi) {
            return state.phi();
        }

    };

    /*
     * Applies the mouse sensistive sphere rotation
     */
    mouserotate(bloch);

    /*
     * Makes the bloch sphere render
     */
    bloch.refresh();

    return bloch;

}

