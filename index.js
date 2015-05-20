/* jshint node: true, -W030 */

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Kiril Vatev @catdad
*/

var path = require("path");
var loaderUtils = require("loader-utils");
var SourceListMap = require("source-list-map").SourceListMap;
var CleanCSS = require("clean-css");

module.exports = function(content, map) {
	var query = loaderUtils.parseQuery(this.query);
    
    this.cacheable && this.cacheable();
	this.value = content;
    
    if (typeof map !== 'string') {
        map = JSON.stringify(map);
    }
    
    var result = [];
    
    var minimize = (this && this.minimize) || false;
    
    if(minimize) {
		var options = Object.create(query);
		if(query.sourceMap && map) {
			options.sourceMap = map;
		}
		var minimizeResult = new CleanCSS(options).minify(content);
		map = minimizeResult.sourceMap;
		content = minimizeResult.styles;
		if(typeof map !== "string") {
			map = JSON.stringify(map);
        }
	} else {
        var cssRequest = loaderUtils.getRemainingRequest(this);
        var request = loaderUtils.getCurrentRequest(this);

        var sourceMap = new SourceListMap();
        sourceMap.add(content, cssRequest, content);
        map = sourceMap.toStringWithSourceMap({
            file: request
        }).map;

        if(map.sources) {
            map.sources = map.sources.map(function(source) {
                var p = path.relative(query.context || this.options.context, source).replace(/\\/g, "/");
                if(p.indexOf("../") !== 0) {
                    p = "./" + p;
                }
                return "/" + p;
            }, this);
            map.sourceRoot = "webpack://";
        }
        map = JSON.stringify(map);
    }
    
    var css = JSON.stringify(content);
    
    result.push("exports.push([module.id, " + css + ", \"\", " + map + "]);");
    
    return "exports = module.exports = require(" + loaderUtils.stringifyRequest(this, require.resolve("./css-base.js")) + ")();\n" +
		result.join("\n");
};
module.exports.seperable = true;
