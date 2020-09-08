const path = require('path');

module.exports = {
  module: {
    rules: [
      ...require('./webpack.rules'),
      {
        test: /\.scss$/,
        use: ['style-loader' , 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader' , 'css-loader'],
      }
    ],
  },
  plugins: [
    ...require('./webpack.plugins')
  ],
  resolve: {
    alias: {
      states: path.resolve(__dirname, 'src/states'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss']
  },
};
