const {minify} = require("html-minifier")

const minifyOptions = [
  "keepClosingSlash",
  "collapseBooleanAttributes",
  "collapseWhitespace",
  "removeComments",
  "removeEmptyAttributes",
  // "removeEmptyElements", // can not be used because of script tag includes
  "removeOptionalTags",
  "removeRedundantAttributes",
  "removeScriptTypeAttributes",
  "removeTagWhitespace",
].reduce((acc, prop) => ({...acc, [prop]: true}), {})

const minifier = (html) => minify(html, minifyOptions)

const article = ({html, id, topics, type}) =>
  `<article data-topics="${topics}" data-type="${type}" id="${id}">${html}</article>`
const htmler = ({allRFCs, pageTitle, SHA, version} = {}) => minifier(`
<!DOCTYPE html>
<html lang="en-US" />
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <meta name="description" content="parent git commit: ${SHA}" />
  <meta name="description" content="Lean RFC version: ${version}" />

  <link href="./chimera.ico" rel="icon" />
  <link href="./chimera.png" rel="icon" type="image/png" />
  <link href="./chimera.svg" rel="icon" type="image/svg+xml" />

  <title>${pageTitle}</title>

  <link href="./rfc-emcee.css" rel="stylesheet" />

  <script defer src="./rfc-emcee.mjs" type="module"></script>

<body id="top">
  <a class="skip-to-main" href="#main">Skip to main content</a>

  <div class="layout">
    <header role="banner">
      <h1>${pageTitle}</h1>
    </header>

    <div data-app></div>

    ${(allRFCs || []).map(article).join("\n\n")}
  </div>
`)

module.exports = {htmler}
