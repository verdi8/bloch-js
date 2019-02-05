import * as quantum from "../../src/quantum/main";
import * as math from "mathjs"
import {assert} from "chai";
import * as qmath from "../../src/quantum/qmath";
import {KET_MINUS} from "../../src/quantum/main";


describe('In quantum module', function() {
    describe('the state function', function() {
        it('should create a state from basic theta and phi angles', function () {
            var state = quantum.state(math.PI / 5, math.PI / 3);
            assert.equal(state.theta(), math.PI / 5);
            assert.equal(state.phi(), math.PI / 3);
        });
        it('should create a normalized state from weird theta and phi angles', function () {
            var state = quantum.state(4 * math.PI / 3, 5 * math.PI / 4);
            assert.approximately(state.theta(), 2 * math.PI / 3, 0.00000001);
            assert.approximately(state.phi(), math.PI / 4, 0.00000001);
        });
    });

    describe('the KET_PLUS state', function() {
        it('should have the correct theta and phi angles', function () {
            var state = quantum.KET_PLUS;
            assert.equal(state.theta(), math.PI / 2);
            assert.equal(state.phi(), 0);
        });
    });

    describe('the KET_MINUS state', function() {
        it('should have the correct theta and phi angles', function () {
            var state = quantum.KET_MINUS;
            assert.equal(state.theta(), math.PI / 2);
            assert.equal(state.phi(), math.PI);
        });
    });

    describe('the rotate function', function() {
        it('should transform a ket-plus into a ket-minus with a pi rotation about Z axis', function () {
            var ketPlus = quantum.KET_PLUS;
            var ketMinus = ketPlus.rz();
            assert.approximately(ketMinus.theta(), KET_MINUS.theta(), 0.00000001);
            assert.approximately(ketMinus.phi(), KET_MINUS.phi(), 0.00000001);
        });
        it('should rotate a state around the Z axis', function () {
            var state = quantum.state(2 * math.PI / 3, math.PI / 5);
            state = state.rz(2 * math.PI / 5);
            assert.approximately(state.theta(), 2 * math.PI / 3, 0.00000001);
            assert.approximately(state.phi(), 3 * math.PI / 5, 0.00000001);
        });
        it('should rotate another state around the Z axis', function () {
            var state = quantum.state(2 * math.PI / 3, math.PI / 5);
            state = state.rz(2 * math.PI);
            assert.approximately(state.theta(), 2 * math.PI / 3, 0.00000001);
            assert.approximately(state.phi(), math.PI / 5, 0.00000001);
        });
        it('should rotate yet another state around the Z axis', function () {
            var state = quantum.state(2 * math.PI / 3, math.PI / 5);
            state = state.rz(- 12 * math.PI / 5);
            assert.approximately(state.theta(), 2 * math.PI / 3, 0.00000001);
            assert.approximately(state.phi(), 9 * math.PI / 5, 0.00000001);
        });
    });

});
