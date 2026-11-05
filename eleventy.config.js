module.exports = function (eleventyConfig) {
  // Copy static assets (images) and the CMS admin folder straight through
  eleventyConfig.addPassthroughCopy({ "src/static": "." });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });

  // Only Nunjucks templates are processed
  eleventyConfig.setTemplateFormats(["njk", "md"]);

  // Strip spaces for tel: links
  eleventyConfig.addFilter("noSpace", (s) => (s || "").replace(/\s+/g, ""));

  // Blog dates, shown in Australian format (e.g. 5 November 2026)
  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }));
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
