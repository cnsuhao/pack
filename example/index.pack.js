//PACK ROOT=D:\data\htdocs\pack
(function() {

	var modules = {};
modules["/example/test/test.html"] = "<div>\"TEST-TEMPLATE\"</div>";
modules["/example/test/test.js"] = {exports: {}, uri: "/example/test/test.js"};
(function (require,exports,module) {
	var tpl = require("/example/test/test.html"); // 加载资源模板
	alert(tpl);
	exports.start = function() {
		alert('start');
	};
})(_require, modules["/example/test/test.js"].exports, modules["/example/test/test.js"]);
modules["/example/index.js"] = {exports: {}, uri: "/example/index.js"};
(function (require,exports,module) {
	var mongo = require("/example/test/test.js"); // 加载模块
	mongo.start();
})(_require, modules["/example/index.js"].exports, modules["/example/index.js"]);
function _require(id) { if(typeof(modules[id]) === "string"){ return modules[id]; } else { return modules[id].exports; } }
_require("/example/index.js");

})();
