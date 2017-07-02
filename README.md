# CSS Raw loader for Webpack

[![Downloads][1]][2] [![Version][3]][2] [![ISC License][4]][5] 

[1]: https://img.shields.io/npm/dm/css-raw-loader.svg?style=flat
[2]: https://www.npmjs.com/package/css-raw-loader

[3]: https://img.shields.io/npm/v/css-raw-loader.svg

[4]: https://img.shields.io/npm/l/css-raw-loader.svg?style=flat
[5]: http://opensource.org/licenses/MIT

## About

This loader is based on the [original CSS loader](https://github.com/webpack/css-loader) and the [raw loader](https://github.com/webpack/raw-loader). A lot of the credit goes to [@sokra](https://github.com/sokra). I am just enabling my own needs. 

It is intended to allow developers to write CSS and use Webpack without having Webpack resolve imports and image URLs from the CSS code. It will import exactly the CSS code that you wrote. It also plays nice with Less, Sass, and the ExtractTextPlugin. It will automatically produce sourcemaps for dev builds and minify for production builds.

## Installation

```
npm install css-raw-loader
```

## Usage

``` javascript
module: {
    loaders: [
        { test: /\.less$/, loader: 'style-loader!css-raw-loader!less-loader' },
        { test: /\.css$/, loader: 'style-loader!css-raw-loader' }
    ]
}
```

## License

[MIT](http://www.opensource.org/licenses/mit-license.php)

[![Analytics](https://ga-beacon.appspot.com/UA-17159207-7/css-raw-loader/readme)](https://github.com/igrigorik/ga-beacon)
