const fs = require("fs")

const {getData} = require("./getData")

const mockData = [
  ["0000-mock-rfc", "mock content"]
]
const realPath = "root/path/to/0000-real-rfc"

jest.mock("fs", () => ({
  readFileSync: () => "# Totally Real RFC"
}))

jest.mock("../common/getPaths", () => ({
  getPaths: (dir, fn) => {
    fn() // purely for code coverage reporting

    return [`/${realPath}/RFC.md`]
  },
}))

jest.mock("./mockData", () => ({mockData}))

jest.mock("./parseRFC", () => ({
  parseRFC: (id, md) => ({id, md})
}))

describe("getData", () => {
  const mapParse = (rfc) => rfc.reduce((id, md) => ({id, md}))

  it("should return mock data", () => {
    const expected = mockData
      .map(mapParse)

    expect(getData("", true)).toEqual(expected)
  })

  it('should return "real" data', () => {
    const expected = [
      [realPath, fs.readFileSync()]
    ].map(mapParse)

    expect(getData()).toEqual(expected)
  })
})
