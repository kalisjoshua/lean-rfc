const cp = require("child_process")
const fs = require("fs")
const path = require("path")

const {getData} = require("./getData")
const {htmler} = require("./htmler")

const cwd = process.cwd()
const resolve = (...args) => path.resolve(cwd, ...args)
const config = {
  pageTitle: "RFC Emcee",
  SHA: cp.execSync("git rev-parse HEAD").toString(),
  docs: resolve("..", "docs", "index.html"),
  package: resolve("package.json"),
  rfc: resolve("..", "rfc"),
}

fs.statSync(config.docs) // check that index.html file exists
fs.statSync(config.package) // check that the package.json file exists
fs.statSync(config.rfc) // check that the RFCs directory exists

fs.writeFileSync(
  config.docs,
  htmler({
    allRFCs: getData(config.rfc, process.argv[2] === "--mock"),
    pageTitle: config.pageTitle,
    SHA: config.SHA,
    version: JSON.parse(fs.readFileSync(config.package, "utf8")).version,
  }),
  "utf8",
)
