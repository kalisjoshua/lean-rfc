const fs = require("fs")
const path = require("path")

const {getPaths} = require("./getPaths")

const createPath = (...args) => path.join(process.cwd(), ...args)
const mockFilesystem = {
  [createPath("mock")]: ["1.file", "directory", "folder", "2.file"],
  [createPath("mock", "directory")]: ["3.file", "4.file"],
  [createPath("mock", "folder")]: ["5.file", "6.file", "7.file"],
}

jest.mock("fs", () => ({
  readdirSync: (dir) => mockFilesystem[dir],
  statSync: (filepath) => ({isDirectory: () => mockFilesystem[filepath]}),
}))

const sep = "/"
jest.mock("path", () => ({
  join: (_, ...args) => args.join(sep),
  resolve: (...args) => args.join(sep),
  sep,
}))

describe("getPaths", () => {
  it("should throw an error when no path is provided", () => {
    const error = new Error(`Invalid dir provided: "undefined"`)

    expect(() => getPaths()).toThrow(error)
  })

  it("should throw an error when a non-string path is provided", () => {
    const error = new Error(`Invalid dir provided: "1"`)

    expect(() => getPaths(1)).toThrow(error)
  })

  it("should throw an error when a non-function filterFn is provided", () => {
    const error = new Error(`Invalid filterFn provided: "1"`)

    return expect(() => getPaths(".", 1)).toThrow(error)
  })

  it("should return an array of strings (everything)", () => {
    const allPaths = JSON.stringify([
      "mock/1.file",
      "mock/directory",
      "mock/directory/3.file",
      "mock/directory/4.file",
      "mock/folder",
      "mock/folder/5.file",
      "mock/folder/6.file",
      "mock/folder/7.file",
      "mock/2.file",
    ])

    expect(JSON.stringify(getPaths("mock"))).toEqual(allPaths)
  })

  it("should apply a filter function inside getPaths", () => {
    const allPaths = JSON.stringify([
      "mock/1.file",
      "mock/directory/3.file",
      "mock/directory/4.file",
      "mock/folder/5.file",
      "mock/folder/6.file",
      "mock/folder/7.file",
      "mock/2.file",
    ])
    const filterFn = (filepath) => /\.file$/.test(filepath)

    expect(JSON.stringify(getPaths("mock", filterFn))).toEqual(allPaths)
  })
})
