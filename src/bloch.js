/**
 * Global variable to solve some id conflicts, especially for SVG markers
 * @type {number}
 */
var blochCount = 0;

function bloch() {

    /**
     * A total Bloch Sphere counter that has been created
     * @type {number}
     */
    var index = blochCount++;

    /**
     * The SVG container
     */
    var svg; // The SVG container

    /**
     * The current configuration
     */
    var currentConfig = {
        size : 400,
        style : "default",
        state : {
            theta : 2 * Math.PI / 4,
            phi : - 1 * Math.PI / 4,
        },
        sphere : {
            rotation : { // The overall sphere rotation : φ (around the global X axis),  λ (around the global Y axis), γ (around the global Z axis), in degrees
                phi: Math.PI / 9, // 20 degrees
                lambda: Math.PI / 9, // 20 degrees
                gamma: 0,
            },
            graticules : {
                every : Math.PI / 2,
            }
        },
        ket0 : {
            label : "|0\u27E9",
        },
        ket1 : {
            label : "|1\u27E9",
        },
        axes : {
            oveflow : 1.2,
            x : {
                label : "x",
            },
            y : {
                label : "y",
            },
            z : { // Z axe is always vertical
                label : "z",
            },
        }
    };

    /**
     * Draws the bloch sphere. First, adds all the elements, then applies the configuration to the state
     * @param selection
     */
    function chart(selection) {
        svg = selection.append("svg")
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

        xaxis.append("line")
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

        yaxis.append("line")
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

        zaxis.append("line")
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
        g.append("line")
            .classed("state-xy-projection-line", true)
            .attr("stroke-width", 3)
            .attr("stroke", "orange")
            .attr("stroke-dasharray", 3);
        g.append("line")
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

        g.append("line")
            .classed("state-line", true)
            .attr("stroke-width", 4)
            .attr("stroke", "orange")
            .attr("marker-end", "url(#" + stateMarker.attr("id") + ")");


        /*
         * Makes the Bloch Sphere mouse sensitive
         */
        sphere.on("mousedown", function() {

            // Mouse down on the sphere, adds mouse move and up behaviours
            var w = d3.select(window)
                .on("mousemove", mousemove)
                .on("mouseup", mouseup);

            d3.event.preventDefault(); // disable text dragging

            var originX = d3.mouse(sphere.node())[0];
            var originY = d3.mouse(sphere.node())[1];
            var originPhi = currentConfig.sphere.rotation.phi;
            var originLambda = currentConfig.sphere.rotation.lambda;

            /**
             * Makes the sphere rotate
             */
            function mousemove() {
                var point = d3.mouse(sphere.node());
                var dx = point[0] - originX;
                var dy = point[1] - originY;
                rotateSphereTo(originPhi + radians(dy), // We consider that a 1px mouse move will rotate the sphere by 1 degree.... very convenient
                               originLambda - radians(dx),
                               null);
            }

            /**
             * When mouse button released, removes the mouse move and up behaviours
             */
            function mouseup() {
                w.on("mousemove", null).on("mouseup", null);
            }
        });

        /**
         * Applies the configuration
         */
        config(currentConfig);
    }

    /**
     * Applies the configuration
     * @param config the configuration
     */
    function config(c) {
        if (c === undefined) {
            return currentConfig;
        } else {
            currentConfig = c;
            refresh();
        }
    }

    /**
     * Refreshes the drawing with the current configuration
     */
    function refresh() {
        adjust();

        // The sphere radius
        var r = currentConfig.size / 2 * (3 / 4);

        // The drawing area
        svg.attr("width", currentConfig.size)
            .attr("height", currentConfig.size);

        svg.select(".bloch-sphere-group")
            .attr("transform", "translate(" + currentConfig.size / 2 + "," + currentConfig.size / 2 + ")");

        // Sets the sphere
        svg.select(".sphere")
            .datum({type: "Sphere"})
            .attr("d", d3.geoPath(projectsOn(r).clipAngle(90))); // A special clip angle to draw the surrounding circle

        // Sets the equator and all the graticules
        var graticule = d3.geoGraticule()
            .step([0, degrees(currentConfig.sphere.graticules.every)])
            .precision(2)
            (); // Generates the MultiLine graticule
        svg.select(".graticule")
            .datum(graticule)
            .attr("d", d3.geoPath(projectsOn(r)));

        // Sets the  axes
        // The axes length
        var axeslength = currentConfig.axes.oveflow * r; // the length of the drawn axes can be a little bit longer than the sphere ray

        // X axis (theta=π/2 and phi=0)
        svg.select(".x-axis > .axis-line")
            .attr("x2", screenx(axeslength, Math.PI / 2, 0))
            .attr("y2", screeny(axeslength, Math.PI / 2, 0));
        svg.select(".x-axis > .axis-label")
            .attr("x", screenx(axeslength + 15, Math.PI / 2, 0))
            .attr("y", screeny(axeslength + 15, Math.PI / 2, 0))
            .text(currentConfig.axes.x.label);

        // Y axis (theta=π/2 and phi=π/2)
        svg.select(".y-axis > .axis-line")
            .attr("x2", screenx(axeslength, Math.PI / 2, Math.PI / 2))
            .attr("y2", screeny(axeslength, Math.PI / 2, Math.PI / 2));
        svg.select(".y-axis > .axis-label")
            .attr("x", screenx(axeslength + 15, Math.PI / 2, Math.PI / 2))
            .attr("y", screeny(axeslength + 15, Math.PI / 2, Math.PI / 2))
            .text(currentConfig.axes.y.label);

        // Z axis (theta=0 and phi=0)
        svg.select(".z-axis > .axis-line")
            .attr("x2", screenx(axeslength, 0, 0))
            .attr("y2", screeny(axeslength, 0, 0));
        svg.select(".z-axis > .axis-label")
            .attr("x", screenx(axeslength + 15, 0, 0))
            .attr("y", screeny(axeslength + 15, 0, 0))
            .text(currentConfig.axes.z.label);

        // Sets the state
        // The projections
        svg.select(".state-xy-projection-line")
            .attr("x2", screenx(Math.sin(currentConfig.state.theta) * r, Math.PI / 2, currentConfig.state.phi))
            .attr("y2", screeny(Math.sin(currentConfig.state.theta) * r, Math.PI / 2, currentConfig.state.phi));
        svg.select(".state-z-projection-line")
            .attr("x1", screenx(r, currentConfig.state.theta, currentConfig.state.phi))
            .attr("y1", screeny(r, currentConfig.state.theta, currentConfig.state.phi))
            .attr("x2", screenx(Math.sin(currentConfig.state.theta) * r, Math.PI / 2, currentConfig.state.phi))
            .attr("y2", screeny(Math.sin(currentConfig.state.theta) * r, Math.PI / 2, currentConfig.state.phi));

        // The theta angle
        svg.select(".theta-angle-line")
            .datum({ type: 'LineString', coordinates: interpolatedCoordinates( [lon(currentConfig.state.phi), lat(0)], [lon(currentConfig.state.phi), lat(currentConfig.state.theta)] ) })
            .attr("d", d3.geoPath(projectsOn(r / 3)));

        // The phi angle
        if(Math.sin(currentConfig.state.theta) < 0.001) { // Nearly ('cause of floating point approximation) no projection on the XY plane, no need to display the phi agngle
            svg.select(".phi-angle-line")
                .datum({ })
                .attr("d", d3.geoPath(projectsOn(r / 3)));

        } else {
            svg.select(".phi-angle-line")
                .datum({ type: 'LineString', coordinates: interpolatedCoordinates( [lon(0), lat(Math.PI / 2)], [lon(currentConfig.state.phi), lat(Math.PI / 2)] ) })
                .attr("d", d3.geoPath(projectsOn(r / 3)));

        }

        // The state
        svg.select(".state-line")
            .attr("x2", screenx(r, currentConfig.state.theta, currentConfig.state.phi))
            .attr("y2", screeny(r, currentConfig.state.theta, currentConfig.state.phi));

    }

    /**
     * Adjusts some configuration values
     */
    function adjust() {
        // Adjusts the theta and the phi angles
        // 0 ⩽ θ ⩽ π
        currentConfig.state.theta = currentConfig.state.theta % (2 * Math.PI);
        if(currentConfig.state.theta > Math.PI) {
            currentConfig.state.theta = currentConfig.state.theta - Math.PI;
            currentConfig.state.phi = currentConfig.state.phi + Math.PI;
        }

        // 0 ⩽ φ < 2π
        currentConfig.state.phi = currentConfig.state.phi % (2 * Math.PI);
        if (currentConfig.state.phi < 0) {
            currentConfig.state.phi = currentConfig.state.phi + 2 * Math.PI;
        }



    }

    // Control functions

    /**
     * Makes the whole sphere visualization rotate.
     * @param phi the new phi angle, if set to null, no change is made to this angle
     * @param lambda the new lambda angle, if set to null, no change is made to this angle
     * @param gamma the new gamma angle, if set to null, no change is made to this angle
     */
    function rotateSphereTo(phi, lambda, gamma) {
        if(phi != null) {
            currentConfig.sphere.rotation.phi = phi;
        }
        if(lambda != null) {
            currentConfig.sphere.rotation.lambda = lambda;
        }
        if(gamma != null) {
            currentConfig.sphere.rotation.lambda = gamma;
        }
        refresh();
    }

    // Math functions

    /**
     * Converts a radians angle value into a degrees angle value
     * @param radians the radians angle value
     * @return {number} the degrees angle value
     */
    function degrees(radians) {
        return radians * 180 / Math.PI;
    }

    /**
     * Converts a degrees angle value int a radians angle vlue
     * @param degrees the degrees angle value
     * @return {number} the radians angle value     */
    function radians(degrees) {
        return degrees * Math.PI / 180;
    }

    /**
     * Converts a qubit theta angle into a geographic latitude
     * @param theta the theta angle to convert
     * @return {number} the latitude
     */
    function lat(theta) {
        return 90 - degrees(theta);
    }

    /**
     * Converts a qubit phi angle into a geographic longitude
     * @param phi the phi angle to convert
     * @return {number} the longitude
     */
    function lon(phi) {
        return 180 - degrees(phi);
    }

    /**
     * Gives the screen X coordinates of a point according to the distance from the center, the theta and the phi angles
     * @param d the distance from the center
     * @param theta the theta angle
     * @param phi the phi angle
     * @return number the screen X coordinate
     */
    function screenx(d, theta, phi) {
        return projectsOn(d)([lon(phi), lat(theta)])[0];
    }

    /**
     * Gives the screen Y coordinates of a point according to the distance from the center, the theta and the phi angles
     * @param d the distance from the center
     * @param theta the theta angle
     * @param phi the phi angle
     * @return number the screen Y coordinate
     */
    function screeny(d, theta, phi) {
        return projectsOn(d)([lon(phi), lat(theta)])[1];
    }

    /**
     * Create a 3d-geo projection for the given distance from the center
     * @param d the distance from the center in pixels
     */
    function projectsOn(d) {
        return d3.geoOrthographic()
            .rotate([degrees(currentConfig.sphere.rotation.lambda), degrees(currentConfig.sphere.rotation.phi), degrees(currentConfig.sphere.rotation.gamma)])
            .translate([0, 0])
            .center([0, 0])
            .precision(0.5)
            .clipAngle(180)
            .scale(d);
    }

    function interpolatedCoordinates(startCoordinates, endCoordinates) {
        var interpolator = d3.interpolateArray(startCoordinates, endCoordinates);
        return d3.quantize(
            function (i) {
                return Array.from(interpolator(i));
            },
            8
        )
    }



    return chart;
}