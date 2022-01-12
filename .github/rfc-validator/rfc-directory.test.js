const rule = require("./rfc-directory").rule

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

    it("should return undefined for files that are not an RFC", () => {
      const onError = jest.fn()

      fn(undefined, onError)
      fn({name: "/mock/filesystem/path/to/non/RFC"}, onError)

      expect(onError.mock.calls.length).toBe(0)
    })

    it("should call the error handler fn", (done) => {
      const error = `The RFC directory "naming" should follow the naming convention "0000-rfc-short-name"`

      fn({name: "/not/following/directory/naming/RFC.md"}, ({detail}) => {
        expect(detail).toBe(error)
        done()
      })
    })

    it("should not call the error handler fn", () => {
      const onError = jest.fn()
      const name = "/following/directory/naming/9876-mock-rfc/RFC.md"

      fn({name}, onError)

      expect(onError.mock.calls.length).toBe(0)
    })
  })
})
