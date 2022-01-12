const headings = [
  "## Summary",
  "## Conventions",
  "## Motivation",
  "## Design",
  "## Drawbacks",
  "## Alternatives",
  "## Unresolved (questions)",
]
const headingText = (node) => node.line.replace(node.markup, "").trim()

function checkRule (node, index, onError) {
  let detail
  const foundAt = headings.indexOf(node.line)

  if (foundAt < 0) {
    detail = [
      `Section "${headingText(node)}" found unexpectedly;`,
      "should this be a subsection?",
    ].join(" ")
  } else if (foundAt !== index) {
    detail = [
      `Section "${headingText(node)}" is out of order;`,
      `found in position ${index + 1}`,
      `should be in position ${foundAt + 1}.`,
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

function tokensFilter (acc, token) {
  if (token.type === "heading_open" && token.tag === "h2") {
    acc.push(token)
  }

  return acc
}

const rule = {
  names: ["RFC01", "rfc-section-order"],
  description: "RFC sections should follow a consistent order",
  tags: ["headings", "rfc schema", "sections"],
  function: (params = {}, onError) => {
    if (!/RFC\.md$/.test(params.name)) return

    const sections = params.tokens
      .reduce(tokensFilter, [])
    const simple = sections
      .map(({line}) => line)

    sections
      .forEach((node, index) => checkRule(node, index, onError))

    headings
      .forEach((expected) => {
        if (!simple.includes(expected)) {
          onError({
            detail: `Missing section "${expected.slice(3)}".`,
            lineNumber: 1,
          })
        }
      })
  },
}

module.exports = {rule}
