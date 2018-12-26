import * as quantum from "../../src/quantum/main";
import * as math from "mathjs"
import {assert} from "chai";


describe('In Quantum module', function() {
    describe('density matrix function', function() {
        it('should return a valid density matrix for given theta and phi values', function() {
            var density = quantum.density( math.PI/3, math.PI/5);
            assert.deepEqual(density.size(), [2,2]);
            assert.approximately(math.subset(density, math.index(0, 0)), 0.75, 0.00000001);
            assert.approximately(math.subset(density, math.index(0, 1)).re, 0.35031463461102, 0.00000001);
            assert.approximately(math.subset(density, math.index(0, 1)).im, -0.25451848022756, 0.00000001);
            assert.approximately(math.subset(density, math.index(1, 0)).re, 0.35031463461102, 0.00000001);
            assert.approximately(math.subset(density, math.index(1, 0)).im, 0.25451848022756, 0.00000001);
            assert.approximately(math.subset(density, math.index(1, 1)), 0.25, 0.00000001);
        });
    });

    describe('theta function', function() {
        it('should calculate the correct theta angle value from a density matrix', function() {
            var density = quantum.density( math.PI/3, math.PI/5);
            var theta = quantum.theta(density);
            assert.approximately(theta, math.PI/3, 0.00000001);
        });
    });

    describe('phi function', function() {
        it('should calculate the correct phi angle value from a density matrix', function() {
            var density = quantum.density( math.PI/3, math.PI/5);
            var phi = quantum.phi(density);
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
        it('should rotate a ket-plus density to a ket-minus density', function () {
            var ketPlusDensity = quantum.density(math.PI / 2, 0);
            var rz = quantum.rz(math.PI);
            var ketMinusDensity = quantum.rotate(rz,  ketPlusDensity);
            assert.approximately(quantum.theta(ketMinusDensity), math.PI/2, 0.00000001);
            assert.approximately(quantum.phi(ketMinusDensity), math.PI, 0.00000001);
        });
    });

});
