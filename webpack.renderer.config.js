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
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss']
  },
};
