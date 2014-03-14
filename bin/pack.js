#!/bin/env node
var fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');

if(process.argv.length != 4 || process.argv[2] === '--help' || process.argv[2] == '-h') {
	console.log('pack $entry_file $root_directory');
	console.log('\t$entry_file\t\tentry module file');
	console.log('\t$root_directory\t\troot directory of the website');
	process.exit();
}

var ENTRY_FILE = path.resolve(path.normalize(process.argv[2])),
	ROOT  = path.resolve(path.normalize(process.argv[3]));

if(!fs.existsSync(ENTRY_FILE) || !fs.existsSync(ROOT)) {
	console.log('entry file or root path does not exist');
	process.exit();
}


var RESULT = {}, MODULES = [], PARSED = {}, PATTERN = /require\s*\(\s*['|"]([^'"]+)['"]\s*\)/g, FILES = [];
function parse(file) {
	if(path.extname(file) === '.js') {
		var _path = path.dirname(file),
			box = {
				$_module_: null,
				define: function(func) {
					this.$_module_ = func;
				},
			};
		var code = fs.readFileSync(file), match;
		vm.runInNewContext(code, box);
		code = box.$_module_.toString();
		code = code.replace(PATTERN, function(match, $1) {
			if($1[0] !== '/') {
				_file = path.resolve(_path, $1);
			}else{
				_file = ROOT+$1;
			}
			FILES.push(_file);
			return 'require("'+_file+'")';
		});
		MODULES.unshift([file,code,true]);
	}else{
		MODULES.unshift([file,fs.readFileSync(file).toString(),false]);
	}

	PARSED[file] = true;
}

function short(index) {
	var path = MODULES[index][0].substr(ROOT.length).replace(/\\/g,'/');
	if(MODULES[index][2]) {
		MODULES[index][2] = path;
	}

	_file = crypto.createHash('md5').update(path).digest('hex').substr(0,8);
	var pattern;
	for(var i=0;i<MODULES.length;++i) {
		if(i !== index) {
			MODULES[i][1] = MODULES[i][1].replace('require("'+MODULES[index][0]+'")','require("'+_file+'")');
		}
	}

	MODULES[index][0] = _file;
	// RESULT[_file] = MODULES[file];
}

function output() {
	var code = '//PACK ROOT='+ROOT+'\n(function() {\n\n';
	code += '\tvar modules = {};\n';
	for(var index = 0; index<MODULES.length; ++index) {
		if(MODULES[index][2]) {
			code += 'modules["'+MODULES[index][0]+'"] = {exports:{}};('+MODULES[index][1]+')(_require, modules["'+MODULES[index][0]+'"].exports, modules["'+MODULES[index][0]+'"]);\n';
		}else{
			code += 'modules["'+MODULES[index][0]+'"] = '+ JSON.stringify(MODULES[index][1]) + ';\n';
		}
	}
	code += 'function _require(id) { if(typeof(modules[id]) === "string"){ return modules[id]; } else { return modules[id].exports; } }\n';
	code += '_require("'+MODULES[MODULES.length-1][0]+'");\n\n})();';
	var pack_file = path.dirname(ENTRY_FILE)+'/'+path.basename(ENTRY_FILE,'.js')+'.pack'+path.extname(ENTRY_FILE);
	fs.writeFile(pack_file, code, function() {
		console.log(pack_file);
		console.log('DONE');
	});
}

function start() {
	while(FILES.length>0) {
		var file = FILES.shift();
		if(!MODULES[file]) {
			parse(file);
		}
	};
	for(var index = 0; index<MODULES.length; ++index) {
		short(index);
	}
	output();
}

FILES.push(ENTRY_FILE);

start();
