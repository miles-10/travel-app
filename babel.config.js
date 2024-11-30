module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-typescript'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
    // 'inline-dotenv',
    'react-native-reanimated/plugin',
  ],
};
