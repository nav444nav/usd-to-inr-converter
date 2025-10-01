module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: { 
        node: 'current' 
      },
      modules: 'commonjs'
    }],
    '@babel/preset-typescript',
    ['@babel/preset-react', { 
      runtime: 'automatic' 
    }],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      useESModules: false
    }],
    '@babel/plugin-transform-modules-commonjs'
  ]
};
