import * as quantum from "../../src/quantum/main";
import * as math from "mathjs"
import {assert} from "chai";


describe('In Quantum module', function() {
    describe('state function', function() {
        it('should return a valid state matrix for given theta and phi values', function() {
            var state = quantum.state( math.PI/3, math.PI/5);
            assert.deepEqual(state.size(), [2,1]);
            var alpha = math.subset(state, math.index(0, 0));
            var beta = math.subset(state, math.index(1, 0));
            assert.approximately(alpha, 0.86602540378444, 0.00000001);
            assert.approximately(beta.re, 0.40450849718747, 0.00000001);
            assert.approximately(beta.im, 0.29389262614624, 0.00000001);
        });
    });

    describe('theta function', function() {
        it('should calculate the correct theta angle value from a state matrix', function() {
            var state = quantum.state( math.PI/3, math.PI/5);
            var theta = quantum.theta(state);
            assert.approximately(theta, math.PI/3, 0.00000001);
        });
    });

    describe('phi function', function() {
        it('should calculate the correct phi angle value from a state matrix', function() {
            var state = quantum.state( math.PI/3, math.PI/5);
            var phi = quantum.phi(state);
            assert.approximately(phi, math.PI/5, 0.00000001);
        });
    });

});
