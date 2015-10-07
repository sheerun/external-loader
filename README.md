# external loader for webpack

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var url = require("external-loader!./file.json");
// => emits a require to ./file.json on filesystem, and adds it to external resources
// => returns `require("/project/path/file.json")`
```

If `name` param is provided, resouce is copied to public directory, just like file-loader.

You can specify module system explicitly by setting `libraryTarget` param.

You can override publicPath by setting `publicPath` param.

## Filename templates

If running with `copy=1` parameter, external resource is copied to the public directory.

You can configure a custom filename template for your file using the query
parameter `name`. For instance, to copy a file from your `context` directory
into the output directory retaining the full directory structure, you might
use `?name=[path][name].[ext]`.

### Filename template placeholders

* `[ext]` the extension of the resource
* `[name]` the basename of the resource
* `[path]` the path of the resource relative to the `context` query parameter or option.
* `[hash]` the hash or the content
* `[<hashType>:hash:<digestType>:<length>]` optionally you can configure
  * other `hashType`s, i. e. `sha1`, `md5`, `sha256`, `sha512`
  * other `digestType`s, i. e. `hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64`
  * and `length` the length in chars
* `[N]` the N-th match obtained from matching the current file name against the query param `regExp`

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
