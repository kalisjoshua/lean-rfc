const lines = [3, 4, 5, 6]
const urlBasic = "http[s]?://.*"
const variants = ["none", urlBasic, `\\[.*?\\]\\(${urlBasic}\\)`].join("|")
const rCommaList = /^[^,]+(?:,\s*[^,]+)*$/
const rListItem = (item) => new RegExp(`^  \\* ${item}: (${variants}|.*)$`, "i")
const rVariants = new RegExp(variants, "i")
const listItems = [
  rListItem("discussion"),
  rListItem("replaces"),
  rListItem("replaced by"),
  /^  \* Topics:\s*(.*)$/,
]

function checkRule (node, index, onError) {
  let detail
  const foundAt = listItems
    .findIndex((regex) => regex.test(node.line))
  const matches = listItems[index] && listItems[index].exec(node.line)

  if (foundAt < 0) {
    detail = [
      `Meta-list item "${node.line.slice(4)}" found unexpectedly;`,
      "should this be included in a section (below)?",
    ].join(" ")
  } else if (foundAt !== index) {
    detail = [
      `Meta-list item "${node.line.slice(4)}" is out of order;`,
      `found in position ${index + 1}`,
      `should be in position ${foundAt + 1}.`,
    ].join(" ")
  } else if (matches && !rVariants.test(matches[1]) && foundAt !== 3) {
    detail = [
      `Meta-list item "${node.line.slice(4)}" has an incorrect value;`,
      `found "${matches[1]}" when it should be "none" or link/URL.`,
    ].join(" ")
  } else if (foundAt === 3 && !rCommaList.test(matches[1])) {
    detail = [
      `Meta-list item "Topics" should be a comma-separated list of`,
      `lower-cased topics; found: "${matches[1] || "<nothing>"}".`,
    ].join(" ")
  }

  if (detail) {
    onError({
      context: node.line,
      detail,
      lineNumber: node.lineNumber,
    })
  }
}

// get the first list in the document and its elements
function tokensFilter (acc, token) {
  const firstList = !acc.length
    && token.tag === "ul"
    && token.type === "bullet_list_open"
  const firstListItem = acc.length
    && token.lineNumber <= acc[0].map[1]
    && token.tag === "li"
    && token.type === "list_item_open"

  if (firstList || firstListItem) {
    acc.push(token)
  }

  return acc
}

const rule = {
  names: ["RFC02", "rfc-meta"],
  description: "RFC meta info should be included and consistent",
  tags: ["meta", "rfc schema"],
  function: (params = {}, onError) => {
    if (!/RFC\.md$/.test(params.name)) return

    const metaList = params.tokens
      .reduce(tokensFilter, [])
      .slice(1) // skip the opening "ul" token
      .forEach((item, index) => checkRule(item, index, onError))
  },
}

module.exports = {rule}
