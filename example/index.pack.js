//PACK ROOT=D:\data\htdocs\pack
(function() {

	var modules = {};
modules["060b8cb1"] = {exports: {}, uri: "/example/test/test.html"};
(<div>"TEST-TEMPLATE"</div>)(_require, modules["060b8cb1"].exports, modules["060b8cb1"]);
modules["1b347cbd"] = {exports: {}, uri: "/example/test/test.js"};
(function (require,exports,module) {
	var tpl = require("060b8cb1"); // 加载资源模板
	alert(tpl);
	exports.start = function() {
		alert('start');
	};
})(_require, modules["1b347cbd"].exports, modules["1b347cbd"]);
modules["706dd570"] = {exports: {}, uri: "/example/index.js"};
(function (require,exports,module) {
	var mongo = require("1b347cbd"); // 加载模块
	mongo.start();
})(_require, modules["706dd570"].exports, modules["706dd570"]);
function _require(id) { if(typeof(modules[id]) === "string"){ return modules[id]; } else { return modules[id].exports; } }
_require("/example/index.js");

})();
