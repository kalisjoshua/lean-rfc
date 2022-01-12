const {htmler} = require("./htmler")

describe("htmler", () => {
  // {html, id, topics, type}
  it("should return html content with \"unknown\" filed in for all template variables", () => {
    expect(htmler()).toMatchSnapshot()
  })

  it("should return html content with \"unknown\" filed in for all template variables", () => {
    const data = {
      allRFCs: [
        {
          html: "Mock RFC article.",
          id: "mock-1",
          topics: ["mock", "test"],
          type: "mock",
        }
      ],
      pageTitle: "Mock Title",
      SHA: "12345",
      version: "m.o.c-k",
    }

    expect(htmler(data)).toMatchSnapshot()
  })
})
