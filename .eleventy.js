const config = require('@andystevenson/11ty')

module.exports = function (eleventyConfig) {
  const newConfig = config(eleventyConfig)
  return newConfig
}
