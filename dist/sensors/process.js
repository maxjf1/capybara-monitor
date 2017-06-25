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

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProcessSensor = function (_Sensor) {
    _inherits(ProcessSensor, _Sensor);

    function ProcessSensor() {
        _classCallCheck(this, ProcessSensor);

        return _possibleConstructorReturn(this, (ProcessSensor.__proto__ || Object.getPrototypeOf(ProcessSensor)).call(this, {
            title: 'Process Sensor',
            description: 'Sensor de processos'
        }));
    }

    _createClass(ProcessSensor, [{
        key: 'pool',
        value: function pool() {

            return new Promise(function (resolve, reject) {
                // obtém o status dos processos com o comando ps
                _child_process2.default.exec('ps -ewwwo %cpu,%mem,comm', function (error, stdout, stderr) {
                    // error handler
                    if (error) return reject(error);

                    // const stats = {}
                    var lines = stdout.split('\n');
                    // obtem arrat de processos da saida
                    var processes = stdout.split('\n') // quebra a saida em linhas
                    .slice(1, -1) // remove primeira linha
                    .map(function (line) {
                        // formata cada linha
                        var _line$trim$replace$sp = line // extrai valores da linha
                        .trim().replace('  ', ' ').split(' '),
                            _line$trim$replace$sp2 = _toArray(_line$trim$replace$sp),
                            cpu = _line$trim$replace$sp2[0],
                            mem = _line$trim$replace$sp2[1],
                            name = _line$trim$replace$sp2.slice(2);

                        // parse da cpu e memoria para float


                        cpu = parseFloat(cpu.replace(',', '.'));
                        mem = parseFloat(mem.replace(',', '.'));

                        // join do nome do processo
                        name = name.join(' ');

                        return {
                            name: name,
                            cpu: cpu,
                            mem: mem
                        };
                    });
                    return resolve(processes);
                });
            });
        }
    }]);

    return ProcessSensor;
}(_sensor2.default);

exports.default = ProcessSensor;