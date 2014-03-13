define(function(require,exports,module) {
	var tpl = require("/test/template.html"); // 加载资源模板
	alert(tpl);
	exports.start = function() {
		alert('start');
	};
});
