/**
 * Converts a qubit theta angle into a geographic latitude
 * @param theta the theta angle to convert
 * @return {number} the latitude
 */
export var lat = (theta) => 90 - degrees(theta);

/**
 * Converts a qubit phi angle into a geographic longitude
 * @param phi the phi angle to convert
 * @return {number} the longitude
 */
export var lon = (phi) => 180 - degrees(phi);

/**
 * Converts a geographic longitude into a qubit phi angle
 * @param lon the longitude to convert (in degrees)
 * @return {number} the phi angle (in radians)
 */
export var phi = (lon) => radians(180 - lon);

/**
 * Converts a geographic longitude into a qubit phi angle
 * @param lon the longitude to convert (in degrees)
 * @return {number} the phi angle (in radians)
 */
export var theta = (lat) => radians(180 - lon);

/**
 * Converts a radians angle value into a degrees angle value
 * @param radians the radians angle value
 * @return {number} the degrees angle value
 */
export var degrees = (rad) => rad * 180 / Math.PI;

/**
 * Converts a degrees angle value int a radians angle vlue
 * @param degrees the degrees angle value
 * @return {number} the radians angle value
 */
export var radians = (deg) => deg * Math.PI / 180;
