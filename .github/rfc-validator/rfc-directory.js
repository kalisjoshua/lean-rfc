const regex = /\d{4}-(?:\w+(?:-\w+)*)/

const rule = {
  names: ["RFC03", "rfc-directory"],
  description: "RFC directory should follow the naming convention",
  tags: ["directory", "name", "rfc schema"],
  function: (params = {}, onError) => {
    if (!/RFC\.md$/.test(params.name)) return

    const name = params.name.split(/[\/\\]/).slice(-2)[0]

    if (!regex.test(name)) {
      onError({
        detail: `The RFC directory "${name}" should follow the naming convention "0000-rfc-short-name"`,
        lineNumber: 1,
      })
    }
  },
}

module.exports = {rule}
