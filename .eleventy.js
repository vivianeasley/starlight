module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/images')
  eleventyConfig.addWatchTarget("./src");
  return {
    dir: { input: 'src', output: 'dist', data: '_data' },
    passthroughFileCopy: true,
    templateFormats: ['jstl', 'css', 'html'],
    htmlTemplateEngine: 'jstl',
  }
}
