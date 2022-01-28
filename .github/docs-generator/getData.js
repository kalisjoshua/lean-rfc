const cp = require("child_process")
const fs = require("fs")
const path = require("path")

const {getPaths} = require("../common/getPaths")
const {parseRFC} = require("./parseRFC")

const isRFC = (filepath) => /RFC\.md$/i.test(filepath)
const getRFCs = (dir) => getPaths(dir, isRFC)
  .map((filepath) => [
    filepath.replace(dir, "").slice(1, -7),
    fs.readFileSync(filepath, "utf8"),
  ])

const data = (rfcPath, mock) => mock
  ? require("./mockData").mockData
  : getRFCs(rfcPath)
const getData = (rfcPath = "", mock = false) => data(rfcPath, mock)
  .map(([fileID, md]) => parseRFC(fileID, md))

module.exports = {getData}
