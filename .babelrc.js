module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          underscore: 'lodash',
        },
      },
    ],
  ],
};
