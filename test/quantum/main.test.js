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

    describe('rz function', function() {
        it('should create a valid zero rotation matrix about the Z axis', function() {
            var rz = quantum.rz(0);
            var rz11 = math.subset(rz, math.index(0, 0));
            var rz12 = math.subset(rz, math.index(0, 1));
            var rz21 = math.subset(rz, math.index(1, 0));
            var rz22 = math.subset(rz, math.index(1, 1));
            assert.isTrue(rz11.equals(math.complex('1')));
            assert.equal(rz12, 0);
            assert.equal(rz21, 0);
            assert.isTrue(rz22.equals(math.complex('1')));
        });

        it('should create a valid pi rotation matrix about the Z axis', function() {
            var rz = quantum.rz(math.PI);
            var rz11 = math.subset(rz, math.index(0, 0));
            var rz12 = math.subset(rz, math.index(0, 1));
            var rz21 = math.subset(rz, math.index(1, 0));
            var rz22 = math.subset(rz, math.index(1, 1));
            assert.isTrue(rz11.equals(math.complex('-i')));
            assert.equal(rz12, 0);
            assert.equal(rz21, 0);
            assert.isTrue(rz22.equals(math.complex('i')));
        });

        it('should create a valid pi/3 rotation matrix about the Z axis', function() {
            var rz = quantum.rz(math.PI/3);
            var rz11 = math.subset(rz, math.index(0, 0));
            var rz12 = math.subset(rz, math.index(0, 1));
            var rz21 = math.subset(rz, math.index(1, 0));
            var rz22 = math.subset(rz, math.index(1, 1));

            assert.equal(rz11.re, math.cos(math.PI/6));
            assert.equal(rz11.im, -math.sin(math.PI/6));
            assert.equal(rz12, 0);
            assert.equal(rz21, 0);
            assert.equal(rz22.re, math.cos(math.PI/6));
            assert.equal(rz22.im, math.sin(math.PI/6));
        });

    });

    describe('rotate function', function() {
        it('should rotate a ket-plus state to a ket-minus state', function () {
            var ketPlus = quantum.state(math.PI / 2, 0);
            console.log(quantum.theta(ketPlus));

            var rz = quantum.rz(math.PI);

            var ketMinus = quantum.rotate(rz,  ketPlus);
            console.log(ketMinus.toString());


        });
    });

});
