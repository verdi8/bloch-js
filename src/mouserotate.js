import * as math from "mathjs";
import * as d3selection from "d3-selection";

/**
 * Makes the bloch sphere mouse sensitive to rotate it
 */
export default function(bloch) {

    var container = bloch.container;

    /*
  * Makes the Bloch Sphere mouse sensitive
  */
    d3selection.select(container).on("mousedown", function() {

        // Mouse down on the sphere, adds mouse move and up behaviours
        var w = d3selection.select(window)
            .on("mousemove", mousemove)
            .on("mouseup", mouseup);

        d3selection.event.preventDefault(); // disable text dragging

        var config = bloch.config();
        var originX = d3selection.mouse(d3selection.select(container).node())[0];
        var originY = d3selection.mouse(d3selection.select(container).node())[1];
        var originYaw = config.sphere.rotation.yaw;
        var originPitch = config.sphere.rotation.pitch;

        /**
         * Makes the sphere rotate
         */
        function mousemove() {
            var point = d3selection.mouse(d3selection.select(container).node());
            var dx = point[0] - originX;
            var dy = point[1] - originY;
            var newYaw = originYaw - (dx * math.PI / 300); // We consider that a 1px mouse move will rotate the sphere by a few percent of radian.... very convenient
            var newPitch = originPitch + (dy * math.PI / 300);
            bloch.rotateSphereTo(newYaw, newPitch);
        }

        /**
         * When mouse button released, removes the mouse move and up behaviours
         */
        function mouseup() {
            w.on("mousemove", null).on("mouseup", null);
        }
    });

}