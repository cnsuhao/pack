(function() {
	var _defined = {}, _depended = {}, UID = 0,
		_head = document.getElementsByTagName('HEAD')[0];

	var extract_require = function(str, deps) {
		var p = /require\s*\(\s*["']([^"']+)["']\s*\)/g,
			t;

		while(p.exec(str)) {
			t = RegExp.$1;
			if(t.match(/\.js$/)) {
				deps.push(t);
			}else{
				var x = new XMLHttpRequest();
				x.open('GET',t,false);
				x.onreadystatechange = function() {
					if(x.readyState == 4) {
						_defined[ t ] = {exports: x.responseText};
					}
				};
				x.send();
			}
		}
	};

	var notify_depended = function(path) {
		if(_depended[path]) {
			_depended[path].forEach(function(item) {
				-- _defined[item].depends;
				if(_defined[item].depends === 0) {
					actual_define(item);
				}
			});
		}
	};

	var actual_define = function(path) {
		var _export = _defined[path]['define'](function(p) {
				return _defined[p]['exports'];
			}, _defined[path]['exports'], _defined[path]);
		if(_export) {
			_defined[path].exports = _export;
		}
		// 通知依赖的项
		notify_depended(path);
	}


	// 模块定义函数
	window.define = function(def) {
		++UID;

		var path = document.currentScript.src.substr(location.origin.length),
			deps = [];

		
		// 提取依赖项
		extract_require(def.toString(), deps);
		// 模块定义
		_defined[path] = { exports: {}, define: def, path: path, depends: deps.length };

		if(deps.length > 0) {
			// 依赖关系整理
			for(var i=0;i<deps.length;++i) {
				if(_depended[deps[i]]) {
					_depended[deps[i]].push(path);
				}else{
					_depended[deps[i]] = [path];
				}
			}

			while(deps.length>0) {
				var depend = deps.pop();
				if(!_defined[depend]) {
					document.write( '<script async="false" defer="false" src="'+depend+'"></script>' );
				}
			}
		}else{
			actual_define(path);
		}
	};
})();
