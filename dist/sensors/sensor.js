'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var platform = _os2.default.platform();
var isLinux = platform.includes('linux');

/**
 * Classe de sensor base
 *
 * Os sensores devem extender esta classe e implementar os métodos básicos
 *
 * @class Sensor
 */

var Sensor = function () {

    /**
     * Creates an instance of Sensor.
     * 
     * A classe a extender deverá passar suas configurações para esse construtor
     * 
     * @memberof Sensor
     */
    function Sensor() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$title = _ref.title,
            title = _ref$title === undefined ? 'Sensor' : _ref$title,
            _ref$description = _ref.description,
            description = _ref$description === undefined ? 'Sensor' : _ref$description,
            _ref$state = _ref.state,
            state = _ref$state === undefined ? null : _ref$state;

        _classCallCheck(this, Sensor);

        Object.assign(this, {
            title: title,
            description: description,
            platform: platform,
            isLinux: isLinux
        });
    }

    _createClass(Sensor, [{
        key: 'pool',
        value: function pool() {
            return new Promise(function (resolve, reject) {
                return reject('Not implemented');
            });
        }

        /**
         * Helper - Promise Timeout
         * 
         * @param {any} [time=1000] Tempo de espera
         * @param {boolean} [error=false] erro que deve ser retornado
         * @returns {Promise}
         * @memberof Sensor
         */

    }, {
        key: 'wait',
        value: function wait() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
            var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    return error ? reject(error) : resolve();
                });
            });
        }
    }]);

    return Sensor;
}();

exports.default = Sensor;