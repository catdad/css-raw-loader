/* jshint node: true, -W030 */

/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Kiril Vatev @catdad
 */

var path = require('path');
var loaderUtils = require('loader-utils');
var CleanCSS = require('clean-css');
var RequestShortener = require('webpack/lib/RequestShortener');

module.exports = function (content, map) {
    var config = loaderUtils.getLoaderConfig(this, 'cssRawLoader');

    this.cacheable && this.cacheable();
    this.value = content;

    if (config.minimize || this.minimize && config.minimize !== false) {
        var options = Object.create(config);
        if (config.sourceMap || this.sourceMap && config.sourceMap !== false) {
            options.sourceMap = typeof map === 'string' ? map : (map ? JSON.stringify(map) : true);
        }
        var minimizeResult = new CleanCSS(options).minify(content);
        map = JSON.stringify(minimizeResult.sourceMap); // Make the SourceMapGenerator a plain object
        if (map) {
            map = JSON.parse(map);
        }
        content = minimizeResult.styles;
    }

    if (map && map.sources) {
        var context = config.context || this.options.context || process.cwd();
        var requestShortener = new RequestShortener(context);
        map.sources = map.sources.map(function (source) {
            return requestShortener.shorten(path.resolve(context, source));
        }, this);
        map.sourceRoot = config.sourceRoot;
    }

    if (map && config.sourceMap !== false) {
        return 'module.exports = [[module.id, ' + JSON.stringify(content) + ', "", ' + JSON.stringify(map) + ']];';
    } else {
        return 'module.exports = ' + JSON.stringify(content) + ';';
    }
};
module.exports.seperable = true;
