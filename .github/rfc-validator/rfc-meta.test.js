const rule = require("./rfc-meta").rule

describe("rfc-directory", () => {
  it("should describe some meta information about the rule", () => {
    const isString = (q) => ({}).toString.call(q) === "[object String]"

    // names
    expect(rule.names.length).toBe(2)
    expect(rule.names.every(isString)).toBe(true)

    // description
    expect(typeof rule.description).toBe("string")

    // tags
    expect(rule.tags.every(isString)).toBe(true)
  })

  describe("validation function", () => {
    const fn = rule.function
    const name = "/following/directory/naming/9876-mock-rfc/RFC.md"
    const tokens = [
      {
        line: "",
        lineNumber: 1,
        map: [1, 1],
        tag: "not a list or list item",
        type: "heading; not part of a list",
      },
      {
        line: "",
        lineNumber: 2,
        map: [2, 6],
        tag: "ul",
        type: "bullet_list_open",
      },
      {
        line: "  * Discussion: https://example.com/discussion",
        lineNumber: 3,
        map: [3, 3],
        tag: "li",
        type: "list_item_open",
      },
      {
        line: "  * Replaces: none",
        lineNumber: 4,
        map: [4, 4],
        tag: "li",
        type: "list_item_open",
      },
      {
        line: "  * Replaced by: none",
        lineNumber: 5,
        map: [5, 5],
        tag: "li",
        type: "list_item_open",
      },
      {
        line: "  * Topics: mock, rfc, topics, hyphenated-topic-item",
        lineNumber: 6,
        map: [6, 6],
        tag: "li",
        type: "list_item_open",
      },
    ]

    it("should return undefined for files that are not an RFC", () => {
      const onError = jest.fn()

      fn(undefined, onError)
      fn({name: "/mock/filesystem/path/to/non/RFC"}, onError)

      expect(onError.mock.calls.length).toBe(0)
    })

    it("should find everything where it should be and not call the error handler fn", () => {
      const onError = jest.fn()

      fn({name, tokens}, onError)

      expect(onError.mock.calls.length).toBe(0)
    })

    it("should find everything (no topics) where it should be and not call the error handler fn", () => {
      const onError = jest.fn()
      const tokensCopy = JSON.parse(JSON.stringify(tokens))

      tokensCopy[5].line = "  * Topics:"

      fn({
        name,
        tokens: tokensCopy,
      }, onError)

      expect(onError.mock.calls.length).toBe(1)

      tokensCopy[5].line = "  * Topics:     "

      fn({
        name,
        tokens: tokensCopy,
      }, onError)

      expect(onError.mock.calls.length).toBe(2)
    })

    it("should detect an extra item and call the error handler fn", () => {
      const onError = jest.fn()

      fn({
        name,
        tokens: [
          ...tokens.slice(0, 2),
          {
            line: "  * Something else: random content",
            lineNumber: 6,
            map: [6, 6],
            tag: "li",
            type: "list_item_open",
          },
          ...tokens.slice(3),
        ],
      }, onError)

      expect(onError.mock.calls.length).toBe(1)
    })

    it("should detect an invalid (Replaces) item values and call the error handler fn", () => {
      const onError = jest.fn()
      const copy = JSON.parse(JSON.stringify(tokens))

      copy[3].line = copy[3].line.replace("none", "invalid content")

      fn({
        name,
        tokens: copy,
      }, onError)

      expect(onError.mock.calls.length).toBe(1)
    })

    it("should detect an invalid (Replaced by) item values and call the error handler fn", () => {
      const onError = jest.fn()
      const copy = JSON.parse(JSON.stringify(tokens))

      copy[4].line = copy[4].line.replace("none", "invalid content")

      fn({
        name,
        tokens: copy,
      }, onError)

      expect(onError.mock.calls.length).toBe(1)
    })

    it("should detect an invalid (Topics) item values and call the error handler fn", () => {
      const onError = jest.fn()
      const copy = JSON.parse(JSON.stringify(tokens))

      copy[5].line = copy[5].line.replace("mock, rfc, topics", "")

      fn({
        name,
        tokens: copy,
      }, onError)

      expect(onError.mock.calls.length).toBe(1)
    })

    it("should detect a missing (Discussion) item and call the error handler fn", () => {
      const onError = jest.fn()

      fn({
        name,
        tokens: [
          ...tokens.slice(0, 2),
          ...tokens.slice(3),
        ],
      }, onError)

      expect(onError.mock.calls.length).toBe(3)
    })

    it("should detect a missing (Replaces) item and call the error handler fn", () => {
      const onError = jest.fn()

      fn({
        name,
        tokens: [
          ...tokens.slice(0, 3),
          ...tokens.slice(4),
        ],
      }, onError)

      expect(onError.mock.calls.length).toBe(2)
    })

    it("should detect a missing (Replaced by) item and call the error handler fn", () => {
      const onError = jest.fn()

      fn({
        name,
        tokens: [
          ...tokens.slice(0, 4),
          ...tokens.slice(5),
        ],
      }, onError)

      expect(onError.mock.calls.length).toBe(1)
    })
  })
})
