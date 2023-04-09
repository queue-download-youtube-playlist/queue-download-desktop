// const rules = require('./webpack.rules');
const rules = [];

let cssRule = {
  test: /\.css$/,
  use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
};
rules.push(cssRule);

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
};
