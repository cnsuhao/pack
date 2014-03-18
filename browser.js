(function() {
	var $$_exports, $$_head = document.getElementsByTagName('HEAD')[0];

	function _require2(path) {
		if(path.match(/\.js$/)) {
			var script = document.createElement('script');
			// script.onload = function() {};
			script.src   = path;
			script.async = false;
			$$_head.appendChild(script);
		}else{
			var x = new XMLHttpRequest();
			x.open("GET",path,false); // 同步加载
			x.onreadystatechange = function() { if(x.readyState == 4) $$_exports = x.responseText; }
			x.send();
		}
		return $$_exports;
	}
	
	// 模块定义函数
	window.define = function(def) {
		var module = {exports: {}};
		var exports = def(_require2, module.exports, module);
		if(exp) {
			$$_exports = exports;
		}else{
			$$_exports = module.exports;
		}
	};
})();
