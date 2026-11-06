module.exports = function (eleventyConfig) {
  // Copy static assets (images) and the CMS admin folder straight through
  eleventyConfig.addPassthroughCopy({ "src/static": "." });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });

  // Lagoon Glow logo colours (Nov 2026). The source SVGs keep the original orange artwork;
  // the published copies are recoloured here so the logo matches the site palette.
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    const fs = require("fs"), path = require("path");
    const recolour = {
      // Wave mark stays orange (Lagoon Glow secondary on dark; original brand orange on light)
      "logo-dark.svg": [["#E87722", "#FF9A45"], ["#5FC5C9", "#4FE3D4"]],
      "logo-light.svg": [["#033F3D", "#0B2E31"], ["#0C7A82", "#08807A"]],
    };
    for (const [file, swaps] of Object.entries(recolour)) {
      const p = path.join(dir.output, "assets/img", file);
      if (!fs.existsSync(p)) continue;
      let svg = fs.readFileSync(p, "utf8");
      for (const [from, to] of swaps) svg = svg.split(`fill="${from}"`).join(`fill="${to}"`);
      fs.writeFileSync(p, svg);
    }
  });

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
