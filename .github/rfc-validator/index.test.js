const markdownlint = require("markdownlint")

jest.mock("fs", () => ({
  statSync: () => {},
}))

jest.spyOn(console, "log")
  .mockImplementation(jest.fn())

jest.spyOn(process, "exit")
  .mockImplementation(jest.fn())

jest.mock("markdownlint", () => ({
  sync: jest.fn()
}))

jest.mock("../common/getPaths", () => ({
  getPaths: (_, fn) => {
    fn()
  }
}))

describe("rfc-validator", () => {
  it("should exit without errors", () => {
    markdownlint.sync
      .mockImplementation(() => ["", []])

    jest.isolateModules(() => {
      require("./index")
    })

    expect(process.exit.mock.calls.length).toBe(0)
  })

  it("should exit with errors", () => {
    markdownlint.sync
      .mockImplementation(() => ["", ["yes there are errors"]])

    jest.isolateModules(() => {
      require("./index")
    })

    expect(process.exit.mock.calls.length).toBe(1)
  })
})
