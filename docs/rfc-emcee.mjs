import {h, render} from "./lib/preact.mjs"
import {useState} from "./lib/preact-hooks.mjs"
import htm from "./lib/htm.mjs"

// Initialize htm with Preact
const html = htm.bind(h)

const getState = () => unescape(window.location.search)
  .slice(1)
  .split("&")
  .reduce((acc, query) => {
    if (query) {
      const [key, value = ""] = query.split("=")

      acc[key] = value.split(/\s*,\s*/).map(unescape)
    }

    return acc
  }, {})
const navigation = {
  next (url, title, data) {
    history.pushState(data, title, url)
    navigation.update(url)
  },
  popstate: () => navigation.update(serialize(getState())),
  register ([_, set]) {
    navigation.update = set
    window.removeEventListener("popstate", navigation.popstate)
    window.addEventListener("popstate", navigation.popstate)
  },
}
const serialize = (state) => `?${Object.entries(state)
  .filter(([key]) => key)
  .map(([key, value]) => value.join(",") ? `${key}=${value.join(",")}` : "")
  .join("&")}`
const titles = {
  root: "A foundational RFC that has no predecessor and establishes a new standard.",
  replacement: "A replacement for an existing RFC.",
  replaced: "An obsolete RFC which has been replaced by a newer RFC.",
}
const types = ["root", "replacement", "replaced"]
const typing = debounce((event) => {
  const activeState = getState()

  activeState.search = [event.target.value.trim()]

  navigation.next(serialize(activeState))
})

function debounce (fn, delay = 400) {
  let pending

  return (...args) => {
    pending && clearTimeout(pending)
    pending = setTimeout(fn.bind(this, ...args), delay)
  }
}

function FilterLink ({children: label, group}) {
  const activeState = getState()
  const onclick = (event) => {
    event.preventDefault()

    const articles = Array.from(document.querySelectorAll(`[data-topics*="${label}"]`))
    const futureState = getState()

    futureState[group] = futureState[group] || []

    if (futureState[group].includes(label)) {
      futureState[group] = futureState[group]
        .filter((v) => v !== label)
    } else {
      futureState[group].push(label)
    }

    navigation.next(serialize(futureState))
  }

  return html`
    <li data-isActive="${activeState[group]?.includes(label)}">
      <span onclick=${onclick}>${label}</span>
    </li>
  `
}

function getTopicsAndApplyFiltersToDOM (active) {
  const rTopics = /topics\s*:\s*([^,]+(?:\s*,\s*[^,]+)*)/i

  return Array.from(document.querySelectorAll("article"))
    .reduce((acc, article) => {
      const topics = Array.from(article.querySelector("ul").children)
        .flatMap((el) => rTopics.exec(el.innerText)?.pop()?.split(/\s*,\s*/))
        .filter(Boolean)
      const show = true
        && (!active?.search?.toString() || article.innerText.toLowerCase().includes(active?.search?.toString()?.toLowerCase()))
        && (!active?.topics?.length || active?.topics?.some((t) => topics.includes(t)))
        && (!active?.types?.length || active?.types?.includes(article.dataset.type))

      article.style.display = show ? "" : "none"

      return Array.from(new Set(acc.concat(topics)))
    }, [])
}

function Nav () {
  const active = getState()
  const topics = getTopicsAndApplyFiltersToDOM(active).sort()

  navigation.register(useState())

  return html`
    <nav class="navigation" role="navigation">
      <div class="search">
        <h3>Search: </h3>
        <input onkeydown=${typing} value=${active?.search} />
      </div>

      <div class="filterLinks">
        <h3>Type: </h3>
        <ul>
          ${types.map((text) => html`<${FilterLink} group="types">${text}<//>`)}
        </ul>

        <h3>Topics: </h3>
        <ul>
          ${topics.map((text) => html`<${FilterLink} group="topics">${text}<//>`)}
        </ul>
      </div>
    </nav>
  `
}

document.addEventListener("click", (event) => {
  const {target} = event

  if (target.nodeName === "A" && target.href.match(/#.*/)[0] === window.location.hash) {
    event.preventDefault()
    window.location.hash = `#`
  }
})

render(html`<${Nav} />`, document.querySelector("[data-app]"))
