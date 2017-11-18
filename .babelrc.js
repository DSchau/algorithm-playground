const is = env => process.env.NODE_ENV === env;

const TEST = is('test');
const PRODUCTION = is('production');

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: TEST ? 'commonjs' : false,
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
        extractStatic: PRODUCTION,
        sourceMap: PRODUCTION
      }
    ],
    'polished'
  ].concat(PRODUCTION ? ['@babel/transform-runtime'] : [])
};
