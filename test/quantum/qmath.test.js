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

            normalized = qmath.normalize(0, math.PI / 4);
            assert.approximately(normalized.theta(), 0, 0.00000001);
            assert.approximately(normalized.phi(), math.PI / 4, 0.00000001);

            normalized = qmath.normalize(math.PI, math.PI / 4);
            assert.approximately(normalized.theta(), math.PI, 0.00000001);
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

    describe('the rx function', function() {
        it('should create a valid zero rotation matrix about the X axis', function() {
            var rx = qmath.rx(0);
            var rx11 = math.subset(rx, math.index(0, 0));
            var rx12 = math.subset(rx, math.index(0, 1));
            var rx21 = math.subset(rx, math.index(1, 0));
            var rx22 = math.subset(rx, math.index(1, 1));
            assert.equal(rx11, 1);
            assert.equal(rx12, 0);
            assert.equal(rx21, 0);
            assert.equal(rx22, 1);
        });

        it('should create a valid pi rotation matrix about the X axis', function() {
            var rx = qmath.rx(math.PI);
            var rx11 = math.subset(rx, math.index(0, 0));
            var rx12 = math.subset(rx, math.index(0, 1));
            var rx21 = math.subset(rx, math.index(1, 0));
            var rx22 = math.subset(rx, math.index(1, 1));
            assert.approximately(rx11, 0, 0.00000001);
            assert.isTrue(rx12.equals(math.complex('-i')));
            assert.isTrue(rx21.equals(math.complex('-i')));
            assert.approximately(rx22, 0, 0.00000001);
        });

        it('should create a valid pi/3 rotation matrix about the X axis', function() {
            var rx = qmath.rx(math.PI/3);
            var rx11 = math.subset(rx, math.index(0, 0));
            var rx12 = math.subset(rx, math.index(0, 1));
            var rx21 = math.subset(rx, math.index(1, 0));
            var rx22 = math.subset(rx, math.index(1, 1));

            assert.equal(rx11, math.cos(math.PI/6));
            assert.approximately(rx12.re, 0, 0.00000001);
            assert.approximately(rx12.im, -0.5, 0.00000001);
            assert.approximately(rx21.re, 0, 0.00000001);
            assert.approximately(rx21.im, -0.5, 0.00000001);
            assert.equal(rx22, math.cos(math.PI/6));
        });

    });

    describe('the ry function', function() {
        it('should create a valid zero rotation matrix about the Y axis', function() {
            var ry = qmath.ry(0);
            var ry11 = math.subset(ry, math.index(0, 0));
            var ry12 = math.subset(ry, math.index(0, 1));
            var ry21 = math.subset(ry, math.index(1, 0));
            var ry22 = math.subset(ry, math.index(1, 1));
            assert.equal(ry11, 1);
            assert.equal(ry12, 0);
            assert.equal(ry21, 0);
            assert.equal(ry22, 1);
        });

        it('should create a valid pi rotation matrix about the Y axis', function() {
            var ry = qmath.ry(math.PI);
            var ry11 = math.subset(ry, math.index(0, 0));
            var ry12 = math.subset(ry, math.index(0, 1));
            var ry21 = math.subset(ry, math.index(1, 0));
            var ry22 = math.subset(ry, math.index(1, 1));
            assert.approximately(ry11, 0, 0.00000001);
            assert.approximately(ry12, -1, 0.00000001);
            assert.approximately(ry21, 1, 0.00000001);
            assert.approximately(ry22, 0, 0.00000001);
        });

        it('should create a valid pi/3 rotation matrix about the Y axis', function() {
            var ry = qmath.ry(math.PI/3);
            var ry11 = math.subset(ry, math.index(0, 0));
            var ry12 = math.subset(ry, math.index(0, 1));
            var ry21 = math.subset(ry, math.index(1, 0));
            var ry22 = math.subset(ry, math.index(1, 1));

            assert.equal(ry11, math.cos(math.PI/6));
            assert.approximately(ry12, -0.5, 0.00000001);
            assert.approximately(ry21, 0.5, 0.00000001);
            assert.equal(ry22, math.cos(math.PI/6));
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
