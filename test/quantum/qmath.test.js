import * as qmath from "../../src/quantum/qmath";
import * as math from "mathjs"
import {assert} from "chai";
import * as quantum from "../../src/quantum/main";


describe('In qmath module', function() {
    describe('the density matrix function', function() {
        it('should return a valid density matrix for given theta and phi values', function() {
            var density = qmath.density( math.PI/3, math.PI/5);
            assert.deepEqual(density.size(), [2,2]);
            assert.approximately(math.subset(density, math.index(0, 0)), 0.75, 0.00000001);
            assert.approximately(math.subset(density, math.index(0, 1)).re, 0.35031463461102, 0.00000001);
            assert.approximately(math.subset(density, math.index(0, 1)).im, -0.25451848022756, 0.00000001);
            assert.approximately(math.subset(density, math.index(1, 0)).re, 0.35031463461102, 0.00000001);
            assert.approximately(math.subset(density, math.index(1, 0)).im, 0.25451848022756, 0.00000001);
            assert.approximately(math.subset(density, math.index(1, 1)), 0.25, 0.00000001);
        });
    });

    describe('the theta function', function() {
        it('should calculate the correct theta angle value from a density matrix', function() {
            var density = qmath.density( math.PI/3, math.PI/5);
            var theta = qmath.theta(density);
            assert.approximately(theta, math.PI/3, 0.00000001);
        });
        it('should calculate the correct theta angle value from another density matrix', function() {
            var density = qmath.density( 3 * math.PI / 4, math.PI/5);
            var theta = qmath.theta(density);
            assert.approximately(theta, 3 * math.PI / 4, 0.00000001);
        });
    });

    describe('the phi function', function() {
        it('should calculate the correct phi angle value from a density matrix', function() {
            var density = qmath.density( math.PI/3, math.PI/5);
            var phi = qmath.phi(density);
            assert.approximately(phi, math.PI/5, 0.00000001);
        });
    });

    describe('the normalize function', function() {
        it('should normalize the theta angle and the phi angle when necessary', function() {
            var normalized;
            normalized = qmath.normalize(math.PI / 3, math.PI / 4);
            assert.approximately(normalized.theta(), math.PI / 3, 0.00000001);
            assert.approximately(normalized.phi(), math.PI / 4, 0.00000001);

            normalized = qmath.normalize(- math.PI / 3, math.PI / 4);
            assert.approximately(normalized.theta(), math.PI / 3, 0.00000001);
            assert.approximately(normalized.phi(), 5 * math.PI / 4, 0.00000001);

            normalized = qmath.normalize(4 * math.PI / 3, 5 * math.PI / 4);
            assert.approximately(normalized.theta(), 2 * math.PI / 3, 0.00000001);
            assert.approximately(normalized.phi(), math.PI / 4, 0.00000001);

            normalized = qmath.normalize(- 4 * math.PI / 3, math.PI / 4);
            assert.approximately(normalized.theta(), 2 * math.PI / 3, 0.00000001);
            assert.approximately(normalized.phi(), math.PI / 4, 0.00000001);
        });

        it('should normalize the phi angle alone', function() {
            var normalized;
            normalized = qmath.normalize(math.PI / 5, math.PI / 3);
            assert.approximately(normalized.theta(), math.PI / 5, 0.00000001);
            assert.approximately(normalized.phi(), math.PI / 3, 0.00000001);

            normalized = qmath.normalize(math.PI / 5, - math.PI / 3);
            assert.approximately(normalized.theta(), math.PI / 5, 0.00000001);
            assert.approximately(normalized.phi(), 5 * math.PI / 3, 0.00000001);

            normalized = qmath.normalize(math.PI / 5, 8 * math.PI / 3);
            assert.approximately(normalized.theta(), math.PI / 5, 0.00000001);
            assert.approximately(normalized.phi(), 2 * math.PI / 3, 0.00000001);

            normalized = qmath.normalize(math.PI / 5, - 8 * math.PI / 3);
            assert.approximately(normalized.theta(), math.PI / 5, 0.00000001);
            assert.approximately(normalized.phi(), 4 * math.PI / 3, 0.00000001);
        });

    });

    describe('the rz function', function() {
        it('should create a valid zero rotation matrix about the Z axis', function() {
            var rz = qmath.rz(0);
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
            var rz = qmath.rz(math.PI);
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
            var rz = qmath.rz(math.PI/3);
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

});
