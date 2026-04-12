const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // Copy CSS to output
  eleventyConfig.addPassthroughCopy("css");

  // Date filter for templates
  eleventyConfig.addFilter("date", (dateObj, format) => {
    return DateTime.fromJSDate(new Date(dateObj)).toFormat(format);
  });

  // All posts collection, sorted newest first
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md").sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
