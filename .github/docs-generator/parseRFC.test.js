const fs = require("fs")
const path = require("path")

const {marked} = require("marked")
const sanitizeHtml = require("sanitize-html")

const {parseRFC} = require("./parseRFC")

const mocks = [1, 2, 3, 4, 5, 6, 7, 8]
  .map((num) => {
    const filepath = path.join("docs-generator", "rfcMocks", `000${num}.md`)
    const md = fs.readFileSync(filepath, "utf8")
    const [title, digits] = md.match(/#\s(.*?)\s+(\d+)[\n$]/).slice(1)
    const id = `#${digits}-${title.toLowerCase().replace(/\s+/g, "-")}`

    return [id, md]
  })

describe("parseRFC", () => {
  it("should throw an error when given a non-string 'id'", () => {
    expect(parseRFC).toThrow("Cannot read properties of undefined (reading 'match')")
  })

  it("should parse a complete and valid RFC markdown", () => {
    expect(parseRFC(...mocks[0])).toMatchSnapshot()
  })

  it("should parse partial RFC markdown", () => {
    expect(parseRFC(...mocks[1])).toMatchSnapshot()
    expect(parseRFC(...mocks[2])).toMatchSnapshot()
    expect(parseRFC(...mocks[3])).toMatchSnapshot()
    expect(parseRFC(...mocks[4])).toMatchSnapshot()
  })

  it("should parse RFC markdown and detect the \"type\"", () => {
    const basic = parseRFC(...mocks[0])
    const replaced = parseRFC(...mocks[5])
    const replacement = parseRFC(...mocks[6])

    expect(basic.type).toBe("root")
    expect(replaced.type).toBe("replaced")
    expect(replacement.type).toBe("replacement")
  })

  it("should skip parsing HTML if the flag is set to true", () => {
    const output = parseRFC(...mocks[0])

    delete output.html

    expect(parseRFC(...mocks[0], true)).toEqual(output)
  })
})
