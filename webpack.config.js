module.exports = {
    entry: './src/emitter.js',
    output: {
        path: __dirname + '/dist',
        filename: 'emitter.js'
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    }
}
