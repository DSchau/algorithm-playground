module.exports = {
  presets: [
    [
      '@babel/env',
      { modules: process.env.NODE_ENV === 'test' ? 'commonjs' : false }
    ],
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
    'polished'
  ].concat(process.env.NODE_ENV === 'production' ? ['@babel/transform-runtime'] : [])
};
