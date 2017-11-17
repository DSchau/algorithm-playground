const is = env => process.env.NODE_ENV === env;

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: is('test') ? 'commonjs' : false,
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/react',
    '@babel/flow',
    '@babel/stage-2'
  ],
  plugins: [
    [
      'emotion',
      {
        extractStatic: is('production'),
        sourceMap: is('production')
      }
    ],
    'polished'
  ].concat(is('production') ? ['@babel/transform-runtime'] : [])
};
