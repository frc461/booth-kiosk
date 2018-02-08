'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PdfPage = function (_Component) {
  (0, _inherits3.default)(PdfPage, _Component);

  function PdfPage() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PdfPage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PdfPage.__proto__ || (0, _getPrototypeOf2.default)(PdfPage)).call.apply(_ref, [this].concat(args))), _this), _this.renderPage = function (pdfPage) {
      if (pdfPage) {
        var canvasContext = _this.canvas.getContext('2d');
        var _this$props = _this.props,
            scale = _this$props.scale,
            rotate = _this$props.rotate;

        var viewport = pdfPage.getViewport(scale, rotate);
        _this.canvas.height = viewport.height;
        _this.canvas.width = viewport.width;
        pdfPage.render({ canvasContext: canvasContext, viewport: viewport });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PdfPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.pdf.getPage(this.props.page).then(this.renderPage);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('canvas', { ref: function ref(canvas) {
          _this2.canvas = canvas;
        }, className: this.props.className });
    }
  }]);
  return PdfPage;
}(_react.Component);

PdfPage.propTypes = {
  page: _propTypes2.default.number,
  scale: _propTypes2.default.number,
  rotate: _propTypes2.default.number,
  className: _propTypes2.default.string,
  pdf: _propTypes2.default.object
};
exports.default = PdfPage;