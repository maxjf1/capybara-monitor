'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SystemSensor = function (_Sensor) {
    _inherits(SystemSensor, _Sensor);

    function SystemSensor() {
        _classCallCheck(this, SystemSensor);

        var _this = _possibleConstructorReturn(this, (SystemSensor.__proto__ || Object.getPrototypeOf(SystemSensor)).call(this, {
            title: 'System Sensor',
            description: 'Sensor de Sistema'
        }));

        _this.sensors = {
            cpu: new _index.CpuSensor(),
            memory: new _index.MemorySensor(),
            processes: new _index.ProcessSensor()
        };
        return _this;
    }

    /**
     * Obtém dados de todos os monitoramentos
     * 
     * @param {number} [time=0] Tempo mínimo de espera para a obtenção dos dados
     * @returns {Promise} 
     * @memberof SystemSensor
     */


    _createClass(SystemSensor, [{
        key: 'pool',
        value: function pool() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            return Promise.all([this.sensors.cpu.pool(), this.sensors.memory.pool(), this.sensors.processes.pool(), this.wait(time)]).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 3),
                    cpu = _ref2[0],
                    memory = _ref2[1],
                    processes = _ref2[2];

                return {
                    cpu: cpu,
                    memory: memory,
                    processes: processes
                };
            }).catch(console.error);
        }
    }]);

    return SystemSensor;
}(_index2.default);

exports.default = SystemSensor;