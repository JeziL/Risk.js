const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  const defaultConfig = new CopyWebpackPlugin({
    patterns: [{ from: './src/assets/imgs', to: 'imgs' }]
  });

  const plugin = {
    production: defaultConfig,
    development: defaultConfig
  };

  return plugin[env];
};
