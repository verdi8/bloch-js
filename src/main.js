import geophysics from './geophysics/main';
import * as configurator from "./configurator";
import * as d3selection from "d3-selection"
import * as math from "mathjs"

/**
 * Creates a bloch sphere
 */
export default function (selection) {

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

    /*
     * Draws the bloch sphere. First, adds all the elements, then applies the configuration to the state
     */
    var svg = d3selection.select(selection).append("svg")
        .attr("class", "bloch-sphere-svg");

    // Drawing area with a shifted reference frame to have the 0,0 screen coordinates at the screen center
    var g  = svg.append("g")
        .classed("bloch-sphere-group", true)
        .classed("default", true);

    /*
     * Inits the surrounding sphere
     */
    var sphere = g.append("path")
        .classed("sphere", true)
        .attr("pointer-events", "all") // detects
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    /*
     * Inits the equator (or all the graticules)
     */
    g.append("path")
        .classed("graticule", true)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", 6)
        .attr("fill", "none");

    /*
     * Inits the axes and their labels
     */

    /*
     * Inits the X axis
     */
    var xaxis = g.append("g")
        .classed("x-axis", true);

    var xmarker = xaxis.append("marker")
        .attr("id", "x-axis-marker-" + index, true)
        .classed("axis-marker", true)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 8)
        .attr("refY", 5)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("markerUnits", "userSpaceOnUse") // The marker size is independent of the stroke width
        .attr("orient", "auto")
        .attr("fill", "black");
    xmarker.append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z");

    xaxis.append("path")
        .classed("axis-line", true)
        .attr("stroke-width", 2)
        .attr("stroke", "black")
        .attr("marker-end", "url(#" + xmarker.attr("id") + ")");

    xaxis.append("text")
        .classed("axis-label", true)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black");

    /*
     * Inits the Y axis
     */
    var yaxis = g.append("g")
        .classed("y-axis", true);

    var ymarker = yaxis.append("marker")
        .attr("id", "y-axis-marker-" + index, true)
        .classed("axis-marker", true)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 8)
        .attr("refY", 5)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("markerUnits", "userSpaceOnUse") // The marker size is independent of the stroke width
        .attr("orient", "auto")
        .attr("fill", "black");
    ymarker.append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z");

    yaxis.append("path")
        .classed("axis-line", true)
        .attr("stroke-width", 2)
        .attr("stroke", "black")
        .attr("marker-end", "url(#" + ymarker.attr("id") + ")");

    yaxis.append("text")
        .classed("axis-label", true)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black");

    /*
     * Inits the Z axis
     */
    var zaxis = g.append("g")
        .classed("z-axis", true);

    var zmarker = zaxis.append("marker")
        .attr("id", "z-axis-marker-" + index, true)
        .classed("axis-marker", true)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 8)
        .attr("refY", 5)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("markerUnits", "userSpaceOnUse") // The marker size is independent of the stroke width
        .attr("orient", "auto")
        .attr("fill", "black");
    zmarker.append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z");

    zaxis.append("path")
        .classed("axis-line", true)
        .attr("stroke-width", 2)
        .attr("stroke", "black")
        .attr("marker-end", "url(#" + zmarker.attr("id") + ")");

    zaxis.append("text")
        .classed("axis-label", true)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black");

    /*
     * Draws the state
     */
    // The state projections
    g.append("path")
        .classed("state-xy-projection-line", true)
        .attr("stroke-width", 3)
        .attr("stroke", "orange")
        .attr("stroke-dasharray", 3);
    g.append("path")
        .classed("state-z-projection-line", true)
        .attr("stroke-width", 3)
        .attr("stroke", "orange")
        .attr("stroke-dasharray", 3);

    // The theta angle
    g.append("path")
        .classed("theta-angle-line", true)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 3);

    // The phi angle
    g.append("path")
        .classed("phi-angle-line", true)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 3);

    // The state line
    var stateMarker = g.append("marker")
        .attr("id", "state-marker-" + index)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 5)
        .attr("refY", 5)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("markerUnits", "userSpaceOnUse") // The marker size is independent of the stroke width
        .attr("orient", "auto");
    stateMarker.append("circle")
        .attr("cx", 5)
        .attr("cy", 5)
        .attr("r", 5)
        .attr("fill", "black");
    stateMarker.append("circle")
        .attr("cx", 5)
        .attr("cy", 5)
        .attr("r", 3)
        .attr("fill", "orange");

    g.append("path")
        .classed("state-line", true)
        .attr("stroke-width", 4)
        .attr("stroke", "orange")
        .attr("marker-end", "url(#" + stateMarker.attr("id") + ")");

    var bloch = {
        svg: svg,
        currentConfig: configurator.defaultConfig,

        /**
         * Applies the configuration
         * @param c the configuration
         */
        config: function (c) {
            if (c === undefined) {
                return this.currentConfig;
            } else {
                this.currentConfig = c;
                refresh();
            }
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

        /**
         * Refreshes the drawing with the current configuration.
         */
        refresh : function() {
            // First, adjusts the configuration
            configurator.adjust(this.currentConfig);

            // Creates the geophysics
            var gp = geophysics(this.currentConfig.sphere.rotation.yaw, this.currentConfig.sphere.rotation.pitch, this.currentConfig.sphere.rotation.roll);

            // The sphere radius
            var r = this.currentConfig.size / 2 * (3 / 4);

            // The drawing area
            svg.attr("width", this.currentConfig.size)
                .attr("height", this.currentConfig.size);

            svg.select(".bloch-sphere-group")
                .attr("transform", "translate(" + this.currentConfig.size / 2 + "," + this.currentConfig.size / 2 + ")");

            // Sets the sphere
            svg.select(".sphere")
                .attr("d", gp.spherePath(r)); // A special clip angle to draw the surrounding circle

            // Sets the equator and all the graticules
            svg.select(".graticule")
                .attr("d", gp.graticulePath(r, this.currentConfig.sphere.graticules.step));

            // Sets the  axes
            // The axes length
            var axeslength = this.currentConfig.axes.oveflow * r; // the length of the drawn axes can be a little bit longer than the sphere ray

            // X axis (theta=π/2 and phi=0)
            svg.select(".x-axis > .axis-line")
                .attr("d", gp.linePath(axeslength, math.PI / 2, 0));
            svg.select(".x-axis > .axis-label")
                .attr("x", gp.x(axeslength + 15, math.PI / 2, 0))
                .attr("y", gp.y(axeslength + 15, math.PI / 2, 0))
                .text(this.currentConfig.axes.x.label);

            // Y axis (theta=π/2 and phi=π/2)
            svg.select(".y-axis > .axis-line")
                .attr("d", gp.linePath(axeslength, math.PI / 2, math.PI / 2));
            svg.select(".y-axis > .axis-label")
                .attr("x", gp.x(axeslength + 15, math.PI / 2, math.PI / 2))
                .attr("y", gp.y(axeslength + 15, math.PI / 2, math.PI / 2))
                .text(this.currentConfig.axes.y.label);

            // Z axis (theta=0 and phi=0)
            svg.select(".z-axis > .axis-line")
                .attr("d", gp.linePath(axeslength, 0, 0));
            svg.select(".z-axis > .axis-label")
                .attr("x", gp.x(axeslength + 15, 0, 0))
                .attr("y", gp.y(axeslength + 15, 0, 0))
                .text(this.currentConfig.axes.z.label);

            // Sets the state
            // The projections
            var pr = Math.sin(this.currentConfig.state.theta) * r;
            var ptheta = math.PI / 2;
            var pphi = this.currentConfig.state.phi;

            svg.select(".state-xy-projection-line")
                .attr("d", gp.linePath(pr, ptheta, pphi));

            svg.select(".state-z-projection-line")
                .attr("d", gp.linePath(r, this.currentConfig.state.theta, this.currentConfig.state.phi, pr, ptheta, pphi));

            // The theta angle
            svg.select(".theta-angle-line")
                .attr("d", gp.anglePath(r / 3, 0, this.currentConfig.state.phi, this.currentConfig.state.theta, this.currentConfig.state.phi));

            // The phi angle
            svg.select(".phi-angle-line")
                .attr("d", gp.anglePath(r / 3, math.PI / 2, 0, math.PI / 2, this.currentConfig.state.phi));

            // The state
            svg.select(".state-line")
                .attr("d", gp.linePath(r, this.currentConfig.state.theta, this.currentConfig.state.phi))
        }
    };

    /*
      * Makes the Bloch Sphere mouse sensitive
      */
    sphere.on("mousedown", function() {

        // Mouse down on the sphere, adds mouse move and up behaviours
        var w = d3selection.select(window)
            .on("mousemove", mousemove)
            .on("mouseup", mouseup);

        d3selection.event.preventDefault(); // disable text dragging

        var cfg = bloch.config();
        var originX = d3selection.mouse(sphere.node())[0];
        var originY = d3selection.mouse(sphere.node())[1];
        var originYaw = cfg.sphere.rotation.yaw;
        var originPitch = cfg.sphere.rotation.pitch;

        /**
         * Makes the sphere rotate
         */
        function mousemove() {
            var point = d3selection.mouse(sphere.node());
            var dx = point[0] - originX;
            var dy = point[1] - originY;
            bloch.rotateSphereTo(originYaw - (dx * math.PI / 300), // We consider that a 1px mouse move will rotate the sphere by a few percent of radian.... very convenient
                originPitch + (dy * math.PI / 300),
                null);
        }

        /**
         * When mouse button released, removes the mouse move and up behaviours
         */
        function mouseup() {
            w.on("mousemove", null).on("mouseup", null);
        }
    });









// Control functions



    /**
     * Applies the Pauli-X gate
     */
    function pauliX() {


    }
    bloch.refresh();
    return bloch;

}

