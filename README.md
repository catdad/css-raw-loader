# CSS Raw loader for Webpack

# About

This loader is based on the [original CSS loader](https://github.com/webpack/css-loader) and the [raw loader](https://github.com/webpack/raw-loader). A lot of the credit goes to [@sokra](https://github.com/sokra). I am just enabling my own needs. 

It is intended to allow developers to write CSS and use it Webpack without having Webpack resolve imports and image URLs from the CSS code. It will import exactly the CSS code that you wrote. It also plays nice with Less, Sass, and the ExtractTextPlugin.

## Installation

```
npm install css-raw-loader
```

## Usage

``` javascript
module: {
    loaders: [
        { test: /\.less$/, loader: 'style-loader!css-raw-loader!less-loader') },
        { test: /\.css$/, loader: 'style-loader!css-raw-loader') }
    ]
}
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)