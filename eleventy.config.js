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
      "logo-dark.svg": [["#E87722", "#FF9A45"], ["#5FC5C9", "#00B9B5"]],
      "logo-light.svg": [["#033F3D", "#0B2E31"], ["#0C7A82", "#08807A"]],
      // Square mark (favicon, badges, card watermarks) in the same apricot as the logo wave on dark
      "mark.svg": [["#E87722", "#FF9A45"]],
    };
    // More space between "wavelength" and "MIGRATION SERVICES": wordmark up 25 units, descriptor down 15 (Nov 2026)
    const spacing = { "logo-dark.svg": ["#FFFFFF", "#5FC5C9"], "logo-light.svg": ["#033F3D", "#0C7A82"] };
    const orig = "translate(0.000000,600.000000) scale(0.100000,-0.100000)";
    for (const [file, swaps] of Object.entries(recolour)) {
      const p = path.join(dir.output, "assets/img", file);
      if (!fs.existsSync(p)) continue;
      let svg = fs.readFileSync(p, "utf8");
      if (spacing[file]) {
        const [wordmark, descriptor] = spacing[file];
        svg = svg.replace(`${orig}" fill="${wordmark}"`, `translate(0,575) scale(0.1,-0.1)" fill="${wordmark}"`);
        svg = svg.replace(`${orig}" fill="${descriptor}"`, `translate(0,615) scale(0.1,-0.1)" fill="${descriptor}"`);
      }
      for (const [from, to] of swaps) svg = svg.split(`fill="${from}"`).join(`fill="${to}"`);
      fs.writeFileSync(p, svg);
    }
  });

  // Only Nunjucks templates are processed
  eleventyConfig.setTemplateFormats(["njk", "md"]);

  // Navigation: is this menu item the current section?
  eleventyConfig.addFilter("isActive", (pageUrl, itemUrl) =>
    itemUrl === "/" ? pageUrl === "/" : (pageUrl || "").startsWith(itemUrl) ||
      (itemUrl === "/resources/" && (pageUrl || "").startsWith("/blog/")));

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
