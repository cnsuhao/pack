(function() {
	// 实际加载资源的 require 函数
	function _require(path) {
		var x = new XMLHttpRequest();
		x.open("GET",path,false);
		var $_exports;
		if(path.match(/\.js$/)) {
			x.onreadystatechange = function() {
				if(x.readyState == 4) {
					var p1 = location.href.split('/'), p2 = path.split('/');
					p1.pop(); p2.shift();
					while(p2[0] === '..') {
						p2.shift();
						p1.pop();
					}
					eval('$_exports = '+x.responseText+'\n//# sourceURL='+p1.join('/')+'/'+p2.join('/'));
				}
			}
		}else{
			x.onreadystatechange = function() {
				if(x.readyState == 4) {
					$_exports = x.responseText;
				}
			}
		}
		x.send();
		return $_exports;
	}
	// 模块定义函数
	window.define = function(def) {
		var module = {exports: {}};
		def(_require, module, module.exports);
		return module.exports;
	};
})();
