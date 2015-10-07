var loaderUtils = require("loader-utils");
var path = require("path");
var ExternalModule = require("webpack/lib/ExternalModule");

module.exports = function(content) {
	this.cacheable && this.cacheable();
	if(!this.emitFile) throw new Error("emitFile is required from module system");
	var query = loaderUtils.parseQuery(this.query);

	var publicPath = query.publicPath || this.options.output.publicPath;
	var libraryTarget = query.libraryTarget || this.options.output.libraryTarget;

	if (query.name) {
		var url = loaderUtils.interpolateName(this, query.name, {
			context: query.context || this.options.context,
			content: content,
			regExp: query.regExp
		});

		this.emitFile(url, content);

		var modulePath = loaderUtils.urlToRequest(path.join(publicPath, url));
	} else {
		var modulePath = this.resourcePath;
	}

	this.options.externals.push(modulePath);

	if (!query.type) {
		if (this.options.output.libraryTarget) {
			query.type = this.options.output.libraryTarget;
		} else {
			throw new Error("No target type specified for external-loader");
		}
	}

	var externalModule = new ExternalModule(modulePath, query.type);

	var sourceAndMap = externalModule.source().sourceAndMap();

	return sourceAndMap.source;
}

module.exports.raw = true;
