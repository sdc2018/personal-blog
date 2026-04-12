const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // Copy static files to output
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("llms.txt");

  // Date filter for templates (Luxon format tokens)
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
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
