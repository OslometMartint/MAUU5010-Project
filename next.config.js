// next.config.js
const withOffline = require('next-offline')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ]
      })
    )

    return config
  }
}
module.exports = withOffline(nextConfig)