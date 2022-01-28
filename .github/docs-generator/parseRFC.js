const {marked} = require("marked")
const sanitizeHtml = require("sanitize-html")

const rH1 = /<h1>(.+?)<\/h1>/
const rH2 = /<h2>(.+?)<\/h2>/g
const rReplaces = /^\s*[-*+]\s*replaces\s*:\s*(.+)\n?$/i
const rReplaced = /^\s*[-*+]\s*replaced\s*by\s*:\s*(.+)\n?$/i
const rTitle = /^\s*#\s*(.+)\n?$/
const rTopics = /^\s*[-*+]\s*topics\s*:\s*(.+)\n?$/i

const fields = (acc, line) => {
  if (!acc.replaces && rReplaces.test(line)) {
    acc.replaces = rReplaces.exec(line)[1]
  }

  if (!acc.replacedBy && rReplaced.test(line)) {
    acc.replacedBy = rReplaced.exec(line)[1]
  }

  if (!acc.title && rTitle.test(line)) {
    acc.title = rTitle.exec(line)[1]
  }

  if (!acc.topics && rTopics.test(line)) {
    acc.topics = rTopics.exec(line)[1].split(/\s*,\s*/).map((s) => s.toLowerCase())
  }

  return acc
}

function parseRFC (id, md, excludeHTML) {
  const pullRequest = id.match(/\d+/)[0]
  const starter = { id }

  if (!excludeHTML) {
    starter.html = sanitizeHtml(marked.parse(md))
      .replace(rH1, `<h1><a href="#${id}">${pullRequest} - $1</a></h1>`)
      .replace(rH2, `<h2 class="$1">$1</h2>`)
  }

  const rfc = md
    .split("\n")
    .reduce(fields, starter)

  rfc.type = rfc.replaces !== "none"
    ? "replacement"
    : rfc.replacedBy !== "none"
      ? "replaced"
      : "root"

  return rfc
}

module.exports = {parseRFC}
