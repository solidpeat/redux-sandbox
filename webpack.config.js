var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + "/src",
  entry: './index.js',
  output: {
    path: __dirname + "/dist",
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /(\.css|\.sass)$/,
        loader: ExtractTextPlugin.extract(["css", "sass?includePaths[]=./node_modules"])
      },
      {
        test: /\.pug$/,
        loader: "pug?pretty=true"
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: "index.pug"
    })
  ],
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true
  }
}
