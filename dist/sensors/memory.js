'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sensor = require('./sensor');

var _sensor2 = _interopRequireDefault(_sensor);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MemorySensor = function (_Sensor) {
    _inherits(MemorySensor, _Sensor);

    function MemorySensor() {
        _classCallCheck(this, MemorySensor);

        return _possibleConstructorReturn(this, (MemorySensor.__proto__ || Object.getPrototypeOf(MemorySensor)).call(this, {
            title: 'Memory Sensor',
            description: 'Sensor de memória'
        }));
    }

    _createClass(MemorySensor, [{
        key: 'pool',
        value: function pool() {

            return new Promise(function (resolve, reject) {
                // obtem o status da memória pelo comando free -m
                _child_process2.default.exec('free -m', function (err, stdout, stderr) {
                    // trata erros
                    if (err) return reject(err);

                    // trata saída do comando

                    var _stdout$split$1$repla = stdout.split('\n')[1] // quebra linhas e pega a segunda
                    .replace(/[\s\n\r]+/g, ' ') // limpa espaçamentos da linha
                    .split(' ') // quebra linha nos espaços
                    .slice(1, 4) // obtém apenas as 3 colunas de valores
                    .map(function (value) {
                        return parseFloat(value);
                    }),
                        _stdout$split$1$repla2 = _slicedToArray(_stdout$split$1$repla, 3),
                        total = _stdout$split$1$repla2[0],
                        used = _stdout$split$1$repla2[1],
                        free = _stdout$split$1$repla2[2]; // faz parse do valor string

                    var computed = Math.round(100 * (used / total));

                    return resolve({
                        total: total,
                        used: used,
                        free: free,
                        computed: computed
                    });
                });
            });
        }
    }]);

    return MemorySensor;
}(_sensor2.default);

exports.default = MemorySensor;