# external loader for webpack

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var url = require("external-loader!./file.json");
// => emits a require to ./file.json on filesystem, and adds it to external resources
// => returns `require("/project/path/file.json")`
```

If `name` param is provided, resource is copied to public directory, just like [file-loader](https://github.com/webpack/file-loader).

You can specify module system explicitly by setting `libraryTarget` param.

You can override publicPath by setting `publicPath` param.

## Examples

``` javascript
require("external-loader?name=js/[hash].script.[ext]!./javascript.js");
// => require("public_path/0dcbbaa701328a3c262cfd45869e351f.script.js")

require("external-loader?name=js/[hash].script.[ext]&publicPath=./foobar!./javascript.js");
// => require("./foobar/0dcbbaa701328a3c262cfd45869e351f.script.js")

require("external-loader!./javascript.js");
// => require("/path/to/project/javascript.js");
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
