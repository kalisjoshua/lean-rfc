const fs = require("fs")
const path = require("path")

function getPaths (dir, filterFn = () => true) {
  if (({}).toString.call(dir) !== "[object String]") {
    throw new Error(`Invalid dir provided: "${dir}"`)
  }

  if (({}).toString.call(filterFn) !== "[object Function]") {
    throw new Error(`Invalid filterFn provided: "${filterFn}"`)
  }

  return Array
    .from(getPathsGen(dir, filterFn))
}

// sourced from:
// https://exploringjs.com/impatient-js/ch_sync-generators.html#reusing-traversals
function* getPathsGen (dir, filterFn) {
  for (const fileName of fs.readdirSync(dir)) {
    const filePath = path.resolve(dir, fileName)

    if (filterFn(filePath)) {
      yield filePath
    }

    if (fs.statSync(filePath).isDirectory()) {
      yield* getPathsGen(filePath, filterFn)
    }
  }
}

module.exports = {getPaths}
