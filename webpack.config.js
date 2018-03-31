const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

const client = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  entry: `${SRC_DIR}/client.js`,
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: ['node_modules'],
        loader: 'babel-loader',      
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};

// See: https://stackoverflow.com/questions/37788142/webpack-for-back-end

const server = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  entry: `${SRC_DIR}/server.js`,
  target: 'node',
  output: {
    path: DIST_DIR,
    filename: 'bundle-server.js',
    libraryTarget: 'commonjs-module',
  },
  module : {
    loaders : [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: ['node_modules'],
        loader: 'babel-loader',      
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};

module.exports = [
  client,
  server
];