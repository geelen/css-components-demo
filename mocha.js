var babelConfig = require('react-scripts/config/babel.dev')
// babel-loader option (we don't use babel-loader so babel will throw)
delete babelConfig.cacheDirectory
require('babel-core/register')(babelConfig)
