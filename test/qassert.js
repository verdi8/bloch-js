/**
 * Some useful assert functions
 */

import * as math from "mathjs";
import {assert} from "chai";

/**
 * Shortcut for chai's assert.approximately(...)
 */
export function approximatelyEquals(actual, expected) {
    assert.approximately(actual, expected, 0.00000001);
}