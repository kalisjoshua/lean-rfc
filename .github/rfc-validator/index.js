const fs = require("fs")
const path = require("path")

const markdownlint = require("markdownlint")

const {getPaths} = require("../common/getPaths.js")
const lintConfig = require("./lintConfig.json")
const rfcDirectory = require("./rfc-directory.js")
const rfcMeta = require("./rfc-meta.js")
const rfcSections = require("./rfc-sections-order.js")

const rfcPath = path.resolve("..", "rfc")

fs.statSync(rfcPath) // check that the RFCs directory exists

const options = {
  files: getPaths(rfcPath, (filepath) => /RFC\.md$/i.test(filepath)),
  config: lintConfig,
  customRules: [
    rfcDirectory.rule,
    rfcMeta.rule,
    rfcSections.rule,
  ],
}

const errors = markdownlint.sync(options)
const exitCode = Object.entries(errors)
  .reduce((acc, [filepath, errors]) => acc + errors.length, 0)

if (exitCode) {
  console.log(errors)

  process.exit(exitCode)
}
