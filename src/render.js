import * as d3selection from "d3-selection";
import * as math from "mathjs";
import * as configurator from "./configurator";
import geophysics from "./geophysics/main";

/**
 * Draws for the first time the Bloch Sphere, or just refreshes it
 */
export default function(container, config, state) {
    var svg = d3selection.select(container).select("svg.bloch-sphere-svg");
    if (svg.empty()) {
        svg = init(container);
    }
    refresh(svg, config, state);
}

/**
 * Creates all the SVG structure
 * @param container the container to contain the SVG elements
 */
function init(container) {
    var index = 1;
    /*
     * Draws the bloch sphere. First, adds all the elements, then applies the configuration to the state
     */
    var svg = d3selection.select(container).append("svg")
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

    return svg;
}

f /**
 * Refreshes the drawing with the current configuration.
 */
function refresh(svg, config, state) {
    // First, adjusts the configuration
    configurator.adjust(config);

    // Creates the geophysics
    var gp = geophysics(config.sphere.rotation.yaw, config.sphere.rotation.pitch, config.sphere.rotation.roll);

    // The sphere radius
    var r = config.size / 2 * (3 / 4);

    // The drawing area
    svg.attr("width", config.size)
        .attr("height", config.size);

    svg.select(".bloch-sphere-group")
        .attr("transform", "translate(" + config.size / 2 + "," + config.size / 2 + ")");

    // Sets the sphere
    svg.select(".sphere")
        .attr("d", gp.spherePath(r)); // A special clip angle to render the surrounding circle

    // Sets the equator and all the graticules
    svg.select(".graticule")
        .attr("d", gp.graticulePath(r, config.sphere.graticules.step));

    // Sets the  axes
    // The axes length
    var axeslength = config.axes.oveflow * r; // the length of the drawn axes can be a little bit longer than the sphere ray

    // X axis (theta=π/2 and phi=0)
    svg.select(".x-axis > .axis-line")
        .attr("d", gp.linePath(axeslength, math.PI / 2, 0));
    svg.select(".x-axis > .axis-label")
        .attr("x", gp.x(axeslength + 15, math.PI / 2, 0))
        .attr("y", gp.y(axeslength + 15, math.PI / 2, 0))
        .text(config.axes.x.label);

    // Y axis (theta=π/2 and phi=π/2)
    svg.select(".y-axis > .axis-line")
        .attr("d", gp.linePath(axeslength, math.PI / 2, math.PI / 2));
    svg.select(".y-axis > .axis-label")
        .attr("x", gp.x(axeslength + 15, math.PI / 2, math.PI / 2))
        .attr("y", gp.y(axeslength + 15, math.PI / 2, math.PI / 2))
        .text(config.axes.y.label);

    // Z axis (theta=0 and phi=0)
    svg.select(".z-axis > .axis-line")
        .attr("d", gp.linePath(axeslength, 0, 0));
    svg.select(".z-axis > .axis-label")
        .attr("x", gp.x(axeslength + 15, 0, 0))
        .attr("y", gp.y(axeslength + 15, 0, 0))
        .text(config.axes.z.label);

    // Sets the state
    // The projections
    var pr = Math.sin(state.theta()) * r;
    var ptheta = math.PI / 2;
    var pphi = state.phi();

    svg.select(".state-xy-projection-line")
        .attr("d", gp.linePath(pr, ptheta, pphi));

    svg.select(".state-z-projection-line")
        .attr("d", gp.linePath(r, state.theta(), state.phi(), pr, ptheta, pphi));

    // The theta angle
    svg.select(".theta-angle-line")
        .attr("d", gp.anglePath(r / 3, 0, state.phi(), state.theta(), state.phi()));

    // The phi angle
    svg.select(".phi-angle-line")
        .attr("d", gp.anglePath(r / 3, math.PI / 2, 0, math.PI / 2, state.phi()));

    // The state
    svg.select(".state-line")
        .attr("d", gp.linePath(r, state.theta(), state.phi()))
}
