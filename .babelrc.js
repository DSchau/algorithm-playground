module.exports = {
  presets: [
    ['@babel/env', { modules: false }],
    '@babel/react',
    '@babel/flow',
    '@babel/stage-2'
  ],
  plugins: [
    [
      'emotion',
      {
        extractStatic: process.env.NODE_ENV === 'production',
        sourceMap: process.env.NODE_ENV === 'production'
      }
    ],
    'babel-plugin-polished'
  ]
};
