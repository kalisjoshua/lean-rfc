const rule = require("./rfc-sections-order").rule

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
        line: "# RFC Title",
        lineNumber: 1,
        map: [1, 1],
        tag: "h1",
        type: "heading_open",
      },
      // ...
      {
        line: "",
        lineNumber: 2,
        map: [2, 6],
        tag: "some meta content",
        type: "not a heading_open token",
      },
      // ...
      {
        line: "## Summary",
        lineNumber: 7,
        map: [7, 7],
        tag: "h2",
        type: "heading_open",
      },
      // ...
      {
        line: "",
        lineNumber: 2,
        map: [2, 6],
        tag: "some meta content",
        type: "not a heading_open token",
      },
      // ...
      {
        line: "## Conventions",
        lineNumber: 10,
        map: [10, 10],
        tag: "h2",
        type: "heading_open",
      },
      // ...
      {
        line: "",
        lineNumber: 2,
        map: [2, 6],
        tag: "some meta content",
        type: "not a heading_open token",
      },
      // ...
      {
        line: "## Motivation",
        lineNumber: 20,
        map: [20, 20],
        tag: "h2",
        type: "heading_open",
      },
      // ...
      {
        line: "",
        lineNumber: 2,
        map: [2, 6],
        tag: "some meta content",
        type: "not a heading_open token",
      },
      // ...
      {
        line: "## Design",
        lineNumber: 30,
        map: [30, 30],
        tag: "h2",
        type: "heading_open",
      },
      // ...
      {
        line: "",
        lineNumber: 2,
        map: [2, 6],
        tag: "some meta content",
        type: "not a heading_open token",
      },
      // ...
      {
        line: "## Drawbacks",
        lineNumber: 40,
        map: [40, 40],
        tag: "h2",
        type: "heading_open",
      },
      // ...
      {
        line: "",
        lineNumber: 2,
        map: [2, 6],
        tag: "some meta content",
        type: "not a heading_open token",
      },
      // ...
      {
        line: "## Alternatives",
        lineNumber: 50,
        map: [50, 50],
        tag: "h2",
        type: "heading_open",
      },
      // ...
      {
        line: "",
        lineNumber: 2,
        map: [2, 6],
        tag: "some meta content",
        type: "not a heading_open token",
      },
      // ...
      {
        line: "## Unresolved (questions)",
        lineNumber: 60,
        map: [60, 60],
        tag: "h2",
        type: "heading_open",
      },
      // ...
      {
        line: "",
        lineNumber: 2,
        map: [2, 6],
        tag: "some meta content",
        type: "not a heading_open token",
      },
      // ...
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

    it("should detect a missing (Summary) heading and call the error handler fn", () => {
      const onError = jest.fn()

      fn({
        name,
        tokens: [
          ...tokens.slice(0, 2),
          ...tokens.slice(3),
        ],
      }, onError)

      expect(onError.mock.calls.length).toBe(7)
    })

    it("should detect a missing (Conventions) heading and call the error handler fn", () => {
      const onError = jest.fn()

      fn({
        name,
        tokens: [
          ...tokens.slice(0, 4),
          ...tokens.slice(5),
        ],
      }, onError)

      expect(onError.mock.calls.length).toBe(6)
    })

    it("should detect a missing (Motivation) heading and call the error handler fn", () => {
      const onError = jest.fn()

      fn({
        name,
        tokens: [
          ...tokens.slice(0, 6),
          ...tokens.slice(7),
        ],
      }, onError)

      expect(onError.mock.calls.length).toBe(5)
    })

    it("should detect a missing (Design) heading and call the error handler fn", () => {
      const onError = jest.fn()

      fn({
        name,
        tokens: [
          ...tokens.slice(0, 8),
          ...tokens.slice(9),
        ],
      }, onError)

      expect(onError.mock.calls.length).toBe(4)
    })

    it("should detect a missing (Drawbacks) heading and call the error handler fn", () => {
      const onError = jest.fn()

      fn({
        name,
        tokens: [
          ...tokens.slice(0, 10),
          ...tokens.slice(11),
        ],
      }, onError)

      expect(onError.mock.calls.length).toBe(3)
    })

    it("should detect a missing (Alternatives) heading and call the error handler fn", () => {
      const onError = jest.fn()

      fn({
        name,
        tokens: [
          ...tokens.slice(0, 12),
          ...tokens.slice(13),
        ],
      }, onError)

      expect(onError.mock.calls.length).toBe(2)
    })

    it("should detect a missing (Unresolved (questions)) heading and call the error handler fn", () => {
      const onError = jest.fn()

      fn({
        name,
        tokens: [
          ...tokens.slice(0, 14),
          ...tokens.slice(15),
        ],
      }, onError)

      expect(onError.mock.calls.length).toBe(1)
    })

    it("should detect an extra heading and call the error handler fn", () => {
      const onError = jest.fn()

      fn({
        name,
        tokens: tokens.concat({
          line: "## Some Unexpected Section",
          lineNumber: 7,
          map: [7, 7],
          tag: "h2",
          type: "heading_open",
        }),
      }, onError)

      expect(onError.mock.calls.length).toBe(1)
    })
  })
})
