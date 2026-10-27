module.exports = function (eleventyConfig) {
  // Copy static assets (images) and the CMS admin folder straight through
  eleventyConfig.addPassthroughCopy({ "src/static": "." });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });

  // Only Nunjucks templates are processed
  eleventyConfig.setTemplateFormats(["njk"]);

  // Strip spaces for tel: links
  eleventyConfig.addFilter("noSpace", (s) => (s || "").replace(/\s+/g, ""));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
  };
};
