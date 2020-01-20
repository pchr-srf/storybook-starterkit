/**
 * This is our customization of Storybook's built-in Webpack.
 * For the webpack config used for production see the webpack.config.js at root.
 */

const path = require('path');
const _ = require('lodash');

const { entry, output, resolve, loaders, plugins } = require('../.webpack');

module.exports = async ({ config, mode }) => {
  // Prevent Storybook generic SVG loader from taking care of SVG icons going in the sprite
  const fileLoader = config.module.rules.find((rule, i) => {
    return rule.loader && rule.loader.match(/file-loader/);
  });
  fileLoader.exclude = path.resolve('./src/assets/icons');

  // Combine our own config with Storybook's
  return _.mergeWith(
    config,
    {
      entry: [entry.styleguide],
      output,
      resolve,
      module: {
        rules: [
          ...loaders,
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              'style-loader',
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader',
            ],
          },
        ]
      },
      plugins
    },
    (objValue, srcValue) => {
      if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    },
  );
};
