module.exports = {
  entry: {
    index: [
      './app/index.js',
      './app/index.html',
      './app/stream.html',
      './app/native.html'
    ],
    config: './app/config.js',
    fahrplan: './app/fahrplan.js',
    langswitch: './app/langswitch.js'
  },
  output: {
    filename: '[name].js',
    path: './dist'
  },
  module: {
    postLoaders: [
      {
        include: /mumble-streams\/lib\/data.js/,
        loader: 'transform-loader?brfs'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.html$/,
        loaders: [
          'file-loader?name=[name].[ext]',
          'extract-loader',
          'html-loader?' + JSON.stringify({
            attrs: ['img:src', 'link:href'],
            interpolate: 'require'
          })
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'file-loader',
          'extract-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'file-loader?name=[hash].css',
          'extract-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /manifest\.json$|\.xml$/,
        loaders: [
          'file-loader',
          'extract-loader',
          'regexp-replace-loader?' + JSON.stringify({
            match: {
              pattern: "#require\\('([^']*)'\\)",
              flags: 'g'
            },
            replaceWith: '"+require("$1")+"'
          }),
          'raw-loader'
        ]
      },
      {
        test: /\.json$/,
        exclude: /manifest\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(svg|png|ico)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      webworkify: 'webworkify-webpack'
    }
  },
  includes: {
    pattern: function (filepath) {
      return {
        re: /#require\((.+)\)/,
        index: 1
      }
    }
  }
}
