const fs = require("fs")

require("./index")

jest.mock("child_process", () => ({execSync: () => "ABC123"}))

jest.mock("fs", () => ({
  readFileSync: () => (JSON.stringify({version: 1})),
  statSync: () => true,
  writeFileSync: jest.fn(),
}))

jest.mock("./getData", () => ({getData: jest.fn()}))

jest.mock("./htmler", () => ({htmler: () => "index.html content"}))

describe("docs-generator", () => {
  it("should build ../../docs/index.html", () => {
    const {calls} = fs.writeFileSync.mock
    const [[_, content]] = calls

    expect(content).toBe("index.html content")
    expect(calls.length).toBe(1)
  })
})
