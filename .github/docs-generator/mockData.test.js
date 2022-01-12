const {mockData} = require("./mockData")

const isString = (q) => ({}).toString.call(q) === "[object String]"

describe("mockData", () => {
  it("should be the correct schema", () => {
    const allMatching = mockData
      .every(([path, md]) => isString(path) && isString(md))

    expect(allMatching).toBe(true)
  })
})
