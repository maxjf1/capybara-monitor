'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sensor = require('./sensor');

var _sensor2 = _interopRequireDefault(_sensor);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NetworkSensor = function (_Sensor) {
    _inherits(NetworkSensor, _Sensor);

    function NetworkSensor() {
        _classCallCheck(this, NetworkSensor);

        return _possibleConstructorReturn(this, (NetworkSensor.__proto__ || Object.getPrototypeOf(NetworkSensor)).call(this, {
            title: 'Network Sensor',
            description: 'Sensor de rede'
        }));
    }

    _createClass(NetworkSensor, [{
        key: 'pool',
        value: function pool() {
            return new Promise(function (resolve, reject) {
                _child_process2.default.exec('ip -s link', function (err, stdout, stderr) {
                    if (err) {
                        reject(err);
                    }
                    var regexRX = new RegExp(/    RX: bytes  packets  errors  dropped overrun mcast\s*\n\s*([0-9]+) /gm);
                    var regexTX = new RegExp(/    TX: bytes  packets  errors  dropped carrier collsns \s*\n\s*([0-9]+) /g);
                    var regexIfNames = new RegExp(/[0-9]+: ([\S]+): /g);

                    var stats = [];
                    var i = 0,
                        totalIn = 0,
                        totalOut = 0;

                    while ((res = names.exec(out)) !== null) {
                        stats[i++] = {
                            interface: res[1]
                        };
                    }

                    var i = 0;
                    while ((res = RX.exec(out)) !== null) {
                        stats[i++].inputBytes = res[1];
                    }

                    var i = 0;
                    while ((res = TX.exec(out)) !== null) {
                        stats[i++].outputBytes = res[1];
                    }

                    resolve(stats);
                });
            });
        }
    }]);

    return NetworkSensor;
}(_sensor2.default);

exports.default = NetworkSensor;