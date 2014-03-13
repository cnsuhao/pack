//PACK ROOT=D:\data\htdocs\pack\example
(function() {

	var modules = {};
modules["/test/test.html"] = "<div>\"TEST-TEMPLATE\"</div>";
modules["/test/test.js"] = {exports: {}};
(function (require,exports,module) {
	var tpl = require("/test/test.html"); // 加载资源模板
	alert(tpl);
	exports.start = function() {
		alert('start');
	};
})(_require, modules["/test/test.js"].exports, modules["/test/test.js"]);
modules["/index.js"] = {exports: {}};
(function (require,exports,module) {
	var mongo = require("/test/test.js"); // 加载模块
	mongo.start();
})(_require, modules["/index.js"].exports, modules["/index.js"]);
function _require(id) { if(typeof(modules[id]) === "string"){ return modules[id]; } else { return modules[id].exports; } }
_require("/index.js");

})();
