module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  env: {
    build: {
      ignore: [
        'fixtures',
        '__tests__',
      ],
    },
  },
  ignore: ['node_modules'],
};
