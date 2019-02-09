import * as quantum from "../../src/quantum/main";

import * as math from "mathjs"
import {assert} from "chai";
import * as qassert from "../qassert"

describe('In quantum module', function() {
    describe('the state function', function() {
        it('should create a state from basic theta and phi angles', function () {
            var state = quantum.state(math.PI / 5, math.PI / 3);
            qassert.approximatelyEquals(state.theta(), math.PI / 5);
            qassert.approximatelyEquals(state.phi(), math.PI / 3);
        });
        it('should create a normalized state from weird theta and phi angles', function () {
            var state = quantum.state(4 * math.PI / 3, 5 * math.PI / 4);
            qassert.approximatelyEquals(state.theta(), 2 * math.PI / 3);
            qassert.approximatelyEquals(state.phi(), math.PI / 4);
        });
    });

    describe('the KET_PLUS state', function() {
        it('should have the correct theta and phi angles', function () {
            var state = quantum.KET_PLUS;
            qassert.approximatelyEquals(state.theta(), math.PI / 2);
            qassert.approximatelyEquals(state.phi(), 0);
        });
    });

    describe('the KET_MINUS state', function() {
        it('should have the correct theta and phi angles', function () {
            var state = quantum.KET_MINUS;
            qassert.approximatelyEquals(state.theta(), math.PI / 2);
            qassert.approximatelyEquals(state.phi(), math.PI);
        });
    });

    describe('the rotate function', function() {
        describe('with the rx function', function() {
            it('should transform a ket-zero into a ket-one with a pi rotation about the X axis', function () {
                var ketZero = quantum.KET_ZERO;
                var ketOne = ketZero.rx();
                qassert.approximatelyEquals(ketOne.theta(), quantum.KET_ONE.theta());
                qassert.approximatelyEquals(ketOne.phi(), quantum.KET_ONE.phi());
            });
            it('should rotate a state around the X axis', function () {
                var state = quantum.state(5 * math.PI / 3, math.PI / 4);
                state = state.rx(3 * math.PI / 5);
                qassert.approximatelyEquals(state.theta(), 2.399283108901043);
                qassert.approximatelyEquals(state.phi(), 3.57891818005285);
            });
        });
        describe('with the ry function', function() {
            it('should transform a ket-zero into a ket-one with a pi rotation about the Y axis', function () {
                var ketZero = quantum.KET_ZERO;
                var ketOne = ketZero.ry();
                qassert.approximatelyEquals(ketOne.theta(), quantum.KET_ONE.theta());
                qassert.approximatelyEquals(ketOne.phi(), quantum.KET_ONE.phi());
            });
            it('should rotate a state around the Y axis', function () {
                var state = quantum.state(5 * math.PI / 3, math.PI / 4);
                state = state.ry(3 * math.PI / 5);
                qassert.approximatelyEquals(state.theta(), 1.128636808442281);
                qassert.approximatelyEquals(state.phi(), 5.538785150677033);
            });
        });
        describe('with the rz function', function() {
            it('should transform a ket-plus into a ket-minus with a pi rotation about Z axis', function () {
                var ketPlus = quantum.KET_PLUS;
                var ketMinus = ketPlus.rz();
                qassert.approximatelyEquals(ketMinus.theta(), quantum.KET_MINUS.theta());
                qassert.approximatelyEquals(ketMinus.phi(), quantum.KET_MINUS.phi());
            });
            it('should rotate a state around the Z axis', function () {
                var state = quantum.state(2 * math.PI / 3, math.PI / 5);
                state = state.rz(2 * math.PI / 5);
                qassert.approximatelyEquals(state.theta(), 2 * math.PI / 3);
                qassert.approximatelyEquals(state.phi(), 3 * math.PI / 5);
            });
            it('should rotate another state around the Z axis', function () {
                var state = quantum.state(2 * math.PI / 3, math.PI / 5);
                state = state.rz(2 * math.PI);
                qassert.approximatelyEquals(state.theta(), 2 * math.PI / 3);
                qassert.approximatelyEquals(state.phi(), math.PI / 5);
            });
            it('should rotate yet another state around the Z axis', function () {
                var state = quantum.state(2 * math.PI / 3, math.PI / 5);
                state = state.rz(- 12 * math.PI / 5);
                qassert.approximatelyEquals(state.theta(), 2 * math.PI / 3);
                qassert.approximatelyEquals(state.phi(), 9 * math.PI / 5);
            });
        });
    });
});
