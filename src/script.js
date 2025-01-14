document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login")
  const loginButton = document.querySelector("#login form button")
  const mainContent = document.querySelector(".content")
  const logoutButton = document.getElementById("logoutButton")
  const sandwichMenu = document.getElementById("sandwich-menu")
  const dropdownMenu = document.getElementById("dropdown-menu")
  const codeInput = document.getElementById("codeInput")
  const runButton = document.getElementById("runButton")
  const outputSection = document.querySelector(".output")
  const outputArea = document.getElementById("outputArea")
  const expandCollapseDiv = document.querySelector(".expand-collapse")
  const cookieConsentBanner = document.getElementById("cookieConsent")
  const acceptCookiesBtn = document.getElementById("acceptCookies")
  const declineCookiesBtn = document.getElementById("declineCookies")
  const captchaSection = document.getElementById("captcha")
  const captchaChallenge = document.querySelector(".captcha-challenge")
  const captchaInput = document.getElementById("captchaInput")
  const verifyCaptchaButton = document.getElementById("verifyCaptcha")
  const captchaError = document.getElementById("captchaError")

  // eslint-disable-next-line no-undef
  lucide.createIcons()

  const urlParams = new URLSearchParams(window.location.search)
  const chancesOfError = urlParams.get("chancesOfError")
  const skipCaptcha = urlParams.get("skipCaptcha") === "true"

  const checkExistingSession = () => {
    const sessionData = localStorage.getItem("cypressSimulatorSession")
    if (sessionData) {
      const { expiresAt } = JSON.parse(sessionData)
      if (new Date().getTime() < expiresAt) {
        loginForm.style.display = "none"
        captchaSection.style.display = "none"
        mainContent.style.display = "flex"
        sandwichMenu.style.display = "flex"
      } else {
        localStorage.removeItem("cypressSimulatorSession")
      }
    }
  }

  checkExistingSession()

  const cypressCommands = {
    "cy.visit": "Visit a URL",
    "cy.get": "Get DOM elements by selector",
    "cy.contains": "Find elements by text and optionally click",
    "cy.request": "Make an HTTP request",
    "cy.exec": "Execute a system command",
    "cy.log": "Print a message to the Cypress Command Log",
    "cy.clearAllCookies": "Clear all cookies",
    "cy.clearAllLocalStorage": "Clear localStorage data for all origins with which the test has interacted",
    "cy.clearAllSessionStorage": "Clear sessionStorage data for all origins with which the test has interacted",
    "cy.clearCookie": "Clear a specific browser cookie",
    "cy.clearCookies": "Clear browser cookies for a domain",
    "cy.clearLocalStorage": "Clear data in localStorage for current domain and subdomain",
    "cy.clock": "cy.clock() overrides native global functions related to time allowing them to be controlled synchronously via cy.tick() or the yielded clock object",
    "cy.debug": "Set a debugger and log what the previous command yields",
    "cy.document": "Get the window.document of the page that is currently active",
    "cy.fixture": "Load a fixed set of data located in a file",
    "cy.focused": "Get the DOM element that is currently focused",
    "cy.getAllCookies": "Get all browser cookies",
    "cy.getAllLocalStorage": "Get localStorage data for all origins with which the test has interacted",
    "cy.getAllSessionStorage": "Get sessionStorage data for all origins with which the test has interacted",
    "cy.getCookie": "Get a browser cookie by its name",
    "cy.getCookies": "Get browser cookies for the current domain or the specified domain",
    "cy.go": "Navigate back or forward to the previous or next URL in the browser's history",
    "cy.hash": "Get the current URL hash of the page that is currently active",
    "cy.intercept": "Spy and stub network requests and responses",
    "cy.location": "Get the global window.location object of the page that is currently active",
    "cy.origin": "Visit multiple domains of different origin in a single test",
    "cy.pause": "Stop cy commands from running and allow interaction with the application under test.",
    "cy.readFile": "Read a file and yield its contents",
    "cy.reload": "Reload the page",
    "cy.root": "Get the root DOM element",
    "cy.screenshot": "Take a screenshot of the application under test",
    "cy.scrollTo": "Scroll to a specific position",
    "cy.session": "Cache and restore cookies, localStorage, and sessionStorage (i.e. session data) in order to recreate a consistent browser context between tests",
    "cy.setCookie": "Set a browser cookie",
    "cy.spy": "Wrap a method in a spy in order to record calls to and arguments of the function",
    "cy.stub": "Replace a function, record its usage and control its behavior",
    "cy.task": "Execute code in Node via the task plugin event",
    "cy.tick": "Move time after overriding a native time function with cy.clock()",
    "cy.title": "Get the document.title property of the page that is currently active",
    "cy.url": "Get the current URL of the page that is currently active",
    "cy.viewport": "Control the size and orientation of the screen for your application",
    "cy.wait": "Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command",
    "cy.window": "Get the window object of the page that is currently active",
    "cy.wrap": "Yield the object passed into .wrap(). If the object is a promise, yield its resolved value",
    "cy.writeFile": "Write to a file with the specified contents",
    "cy.on": "Liston to a single browser event, which is unbound when the test ends",
    ".and": "An alias of .should",
    ".as": "Assign an alias for later use",
    ".blur": "Blur a focused element",
    ".check": "Check checkbox(es) or radio(s)",
    ".children": "Get the children of each element within a set of DOM elements",
    ".clear": "Clear the value of an input or textarea",
    ".click": "Click a DOM element",
    ".closest": "Get the first DOM element that matches the selector (whether it be itself or one of its ancestors)",
    ".dblclick": "Double-click a DOM element",
    ".each": "Iterate through an array like structure (arrays or objects with a length property)",
    ".end": "End a chain of commands",
    ".eq": "Get A DOM element at a specific index in an array of elements",
    ".filter": "Get the DOM elements that match a specific selector",
    ".find": "Get the descendent DOM elements of a specific selector",
    ".first": "Get the first DOM element within a set of DOM elements",
    ".focus": "Focus on a DOM element",
    ".invoke": "Invoke a function on the previously yielded subject",
    ".its": "Get a property's value on the previously yielded subject",
    ".last": "Get the last DOM element within a set of DOM elements",
    ".next": "Get the immediately following sibling of each DOM element within a set of DOM elements",
    ".nextAll": "Get all following siblings of each DOM element in a set of matched DOM elements",
    ".nextUntil": "Get all following siblings of each DOM element in a set of matched DOM elements up to, but not including, the element provided",
    ".not": "Filter DOM element(s) from a set of DOM elements",
    ".parent": "Get the parent DOM element of a set of DOM elements",
    ".parents": "Get the parent DOM elements of a set of DOM elements",
    ".parentsUntil": "Get all ancestors of each DOM element in a set of matched DOM elements up to, but not including, the element provided",
    ".prev": "Get the immediately preceding sibling of each element in a set of the elements",
    ".prevAll": "Get all previous siblings of each DOM element in a set of matched DOM elements",
    ".prevUntil": "Get all previous siblings of each DOM element in a set of matched DOM elements up to, but not including, the element provided",
    ".rightClick": "Right click a DOM element",
    ".scrollIntoView": "Scroll an element into view",
    ".select": "Select an <option> within a <select>",
    ".selectFile": "Selects a file or files in an HTML5 input element or simulates dragging a file or files into the browser",
    ".shadow": "Traverse into the shadow DOM of an element",
    ".should": "Create an assertion. Assertions are automatically retried until they pass or time out",
    ".siblings": "Get sibling DOM elements",
    ".spread": "Expand an array into multiple arguments",
    ".submit": "Submit a form",
    ".then": "Enables you to work with the subject yielded from the previous command",
    ".trigger": "Trigger an event on a DOM element",
    ".type": "Type into a DOM element",
    ".uncheck": "Uncheck checkbox(es)",
    ".within": "Scopes all subsequent cy commands to within this element",
    "Cypress.on": "Listen to browser events",
    "Cypress.Commands.add": "Creates a Cypress custom command",
    "Cypress.Commands.overwrite": "Overwrites a Cypress native Command",
    "Cypress.Commands.addQuery": "Creates a Cypress custom query",
    "Cypress.Commands.overwriteQuery": "Overwrites  a Cypress custom query",
    "Cypress.arch": "Cypress.arch returns you the CPU architecture name of the underlying OS, as returned from Node's os.arch()",
    "Cypress.browser": "Cypress.browser returns you browser's properties",
    "Cypress.config": "get and set configuration options in your tests",
    "Cypress.Cookies.debug": "Cookies.debug() enables you to generate logs to the console whenever any cookies are modified",
    "Cypress.currentRetry": "Cypress.currentRetry is a number representing the current test retry count",
    "Cypress.currentTest": "Cypress.currentTest is an object representing the currently executing test instance, with properties to access the title of the test",
    "Cypress.log": "This is the internal API for controlling what gets printed to the Command Log",
    "Cypress.dom": "Cypress.dom.method() is a collection of DOM related helper methods",
    "Cypress.ensure": "Cypress.ensure is a collection of helper methods for making assertions",
    "Cypress.env": "get and set environment variables in your tests",
    "Cypress.isBrowser": "Cypress.isBrowser checks if the current browser matches the given name or filter",
    "Cypress.isCy": "Cypress.isCy() checks if a variable is a valid instance of cy or a cy chainable",
    "Cypress.Keyboard": "The Keyboard API allows you set the default values for how the .type() command is executed",
    "Cypress.platform": "Cypress.platform returns the underlying OS name, as returned from Node's os.platform()",
    "Cypress.require": "Cypress.require enables utilizing dependencies within the cy.origin() callback function. It is used to require modules such as npm packages and other local files",
    "Cypress.Screenshot": "The Screenshot API allows you set defaults for how screenshots are captured during .screenshot and automatic screenshots taken during test failures",
    "Cypress.SelectorPlayground": "The Selector Playground exposes APIs that enable you to: a) Change the default selector strategy; and b) Override the selectors that are returned per element",
    "Cypress.session": "Cypress.session is a collection of async session-related helper methods intended to be used alongside the cy.session() command",
    "Cypress.spec": "Cypress.spec returns you the properties of the spec under test",
    "Cypress.testingType": "Cypress.testingType returns the current testing type, determined by your selection in the Cypress Launchpad. The Cypress.testingType returns e2e for E2E Testing or component for Component Testing",
    "Cypress.version": "Cypress.version returns you the current version of Cypress you are running",
    "Cypress._": "Cypress automatically includes lodash and exposes it as Cypress._",
    "Cypress.$": "Cypress automatically includes jQuery and exposes it as Cypress.$",
    "Cypress.Blob": "Cypress automatically includes a Blob library and exposes it as Cypress.Blob",
    "Cypress.Buffer": "Cypress automatically includes a Buffer polyfill for the browser and exposes it as Cypress.Buffer",
    "Cypress.minimatch": "Cypress automatically includes minimatch and exposes it as Cypress.minimatch",
    "Cypress.Promise": "Cypress automatically includes Bluebird and exposes it as Cypress.Promise",
    "Cypress.sinon": "Cypress automatically includes Sinon.JS and exposes it as Cypress.sinon",
    "describe": "Describes and wraps a test suite implementation",
    "context": "Describes and wraps a test sub-suite implementation",
    "it": "Describes and wraps a test case implementation",
    "before": "Callback function that runs before the test suite",
    "beforeEach": "Callback function that runs before each test case in a suite or sub-suite",
    "after": "Callback function that runs after the test suite",
    "afterEach": "Callback function that runs after each test case in a suite or sub-suite",
    ".only": "A feature that allows you to run only the specified suit, sub-suite, or test case",
    ".skip": "A feature that allows you to skip only the specified suite, sub-suite, or test case",
    "expect": "Chai's expect command provides a readable, natural-language syntax for writing assertions, like expect(value).to.equal(expectedValue), making it easy to validate conditions in tests"
  }

  const checkCookieConsent = () => {
    const storedConsent = localStorage.getItem("cookieConsent")
    const isLoggedIn = localStorage.getItem("cypressSimulatorSession")

    if (!isLoggedIn) {
      cookieConsentBanner.style.display = "none"
      return
    }

    if (storedConsent === "accepted" || storedConsent === "declined") {
      cookieConsentBanner.style.display = "none"
    } else {
      cookieConsentBanner.style.display = "block"
    }
  }

  acceptCookiesBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted")
    cookieConsentBanner.style.display = "none"
  })

  declineCookiesBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "declined")
    cookieConsentBanner.style.display = "none"
  })

  checkCookieConsent()

  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const operator = Math.random() < 0.5 ? "+" : "-"

    captchaChallenge.textContent = `What is ${num1} ${operator} ${num2}?`
    verifyCaptchaButton.disabled = true

    return operator === "+" ? num1 + num2 : num1 - num2
  }

  loginButton.addEventListener("click", event => {
    event.preventDefault()

    if (skipCaptcha) {
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 30)

      localStorage.setItem("cypressSimulatorSession", JSON.stringify({
        loggedIn: true,
        expiresAt: expiresAt.getTime()
      }))

      loginForm.style.display = "none"
      mainContent.style.display = "flex"
      sandwichMenu.style.display = "flex"
      checkCookieConsent()
    } else {
      loginForm.style.display = "none"
      captchaSection.style.display = "flex"
      window.expectedCaptchaResult = generateCaptcha()
    }
  })

  verifyCaptchaButton.addEventListener("click", () => {
    const userAnswer = parseInt(captchaInput.value, 10)

    if (userAnswer === window.expectedCaptchaResult) {
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 30)

      localStorage.setItem("cypressSimulatorSession", JSON.stringify({
        loggedIn: true,
        expiresAt: expiresAt.getTime()
      }))

      captchaSection.style.display = "none"
      mainContent.style.display = "flex"
      sandwichMenu.style.display = "flex"
      captchaError.style.display = "none"
      captchaInput.value = ""
      verifyCaptchaButton.disabled = true

      checkCookieConsent()
    } else {
      captchaError.style.display = "block"
      captchaInput.value = ""
      verifyCaptchaButton.disabled = true
      window.expectedCaptchaResult = generateCaptcha()
    }
  })

  captchaInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      verifyCaptchaButton.click()
    }
  })

  captchaInput.addEventListener("input", () => {
    verifyCaptchaButton.disabled = !captchaInput.value.trim()
  })

  sandwichMenu.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show")
    sandwichMenu.setAttribute("aria-expanded", dropdownMenu.classList.contains("show"))
  })

  document.addEventListener("click", event => {
    if (!sandwichMenu.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove("show")
      sandwichMenu.setAttribute("aria-expanded", "false")
    }
  })

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("cypressSimulatorSession")

    // codeInput.value = ""
    outputArea.innerHTML = ""
    runButton.disabled = true
    loginForm.style.display = "flex"
    captchaSection.style.display = "none"
    mainContent.style.display = "none"
    sandwichMenu.style.display = "none"
    dropdownMenu.classList.remove("show")
    cookieConsentBanner.style.display = "none"
    captchaError.style.display = "none"
    captchaInput.value = ""
  })

  codeInput.addEventListener("input", () => {
    runButton.disabled = !codeInput.value.trim()
  })

  expandCollapseDiv.addEventListener("click", toggleExpansion)
  expandCollapseDiv.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      toggleExpansion(event)
    }
  })

  function toggleExpansion(event) {
    const target = event.target.closest(".expand-collapse")
    const expandIcon = document.getElementById("expandIcon")
    const collapseIcon = document.getElementById("collapseIcon")

    if (outputSection.classList.contains("expanded")) {
      outputSection.classList.remove("expanded")
      mainContent.style.position = ""
      mainContent.style.overflow = ""
      expandIcon.style.display = "block"
      collapseIcon.style.display = "none"
      target.setAttribute("aria-expanded", "false")
    } else {
      outputSection.classList.add("expanded")
      mainContent.style.position = "relative"
      mainContent.style.overflow = "hidden"
      expandIcon.style.display = "none"
      collapseIcon.style.display = "block"
      target.setAttribute("aria-expanded", "true")
    }
  }

  runButton.addEventListener("click", runCode)

  function runCode() {
    const code = codeInput.value

    runButton.disabled = true
    runButton.classList.add("loading")
    runButton.innerHTML = "<div class='spinner'></div> Running..."

    outputArea.textContent = "Running... Please wait."
    outputArea.classList.remove("success")
    outputArea.classList.remove("error")
    outputArea.classList.remove("warning")

    setTimeout(() => {
      let message

      if (code === "help") {
        const helpMessage = `Common Cypress commands and examples:

1. cy.visit(url: string)
Description: Navigate to a specific URL.
Example: <strong><span class="cy">cy</span><span class="dot">.</span><span class="command">visit</span><span class="parens">(</span><span class="string">'https://example.com'</span><span class="parens">)</span></strong>

2. cy.get(selector: string)
Description: Get a DOM element based on a selector.
Example: <strong><span class="cy">cy</span><span class="dot">.</span><span class="command">get</span><span class="parens">(</span><span class="string">'.button-class'</span><span class="parens">)</span></strong>

3. cy.contains(text: string)
Description: Find an element by its text and optionally perform actions.
Example: <strong><span class="cy">cy</span><span class="dot">.</span><span class="command">contains</span><span class="parens">(</span><span class="string">'Submit'</span><span class="parens">)</span><span class="dot">.</span><span class="command">click</span><span class="parens">()</span></strong>

4. cy.contains(selector: string, text: string)
Description: Find an element by the combinatoin of its selector and text, and optionally perform actions.
Example: <strong><span class="cy">cy</span><span class="dot">.</span><span class="command">contains</span><span class="parens">(</span><span class="string">'a'</span><span class="parens">, </span><span class="string">'Subscribe to our newsletter'</span><span class="parens">)</span><span class="dot">.</span><span class="command">click</span><span class="parens">()</span></strong>

5. cy.request(method: string, url: string)
Description: Make an HTTP request (GET, POST, etc.)
Example: <strong><span class="cy">cy</span><span class="dot">.</span><span class="command">request</span><span class="parens">(</span><span class="string">'GET'</span><span class="parens">, </span><span class="string">'https://api.example.com/users'</span><span class="parens">)</span></strong>

6. cy.exec(command: string)
Description: Execute a system command (on the host machine).
Example: <strong><span class="cy">cy</span><span class="dot">.</span><span class="command">exec</span><span class="parens">(</span><span class="string">'ls'</span><span class="parens">)</span></strong>

7. cy.log(message: string)
Description: Log a message to the Cypress command log.
Example: <strong><span class="cy">cy</span><span class="dot">.</span><span class="command">log</span><span class="parens">(</span><span class="string">'Test completed successfully'</span><span class="parens">)</span></strong>

For more commands and details, visit the <a href="https://docs.cypress.io/api/table-of-contents" target="_blank" rel="noopener noreferrer">official Cypress API documentation</a>.`

        outputArea.innerHTML = helpMessage
      } else if (Math.random() < (chancesOfError || 0.01)) {
        message = "There's a glitch in the Matrix."
        outputArea.classList.add("error")

        outputArea.textContent = message
      } else {
        message = `Code executed successfully:\n\n${code}`

        const command = code.split("(")[0]

        // eslint-disable-next-line no-prototype-builtins
        if (cypressCommands.hasOwnProperty(command)) {
          switch (command) {
          case "cy.visit":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Visited URL ${code.split("(")[1].replace(")", "")}`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "cy.get":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Got element by selector ${code.split("(")[1].replace(")", "")}`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "cy.exec":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Executed system command ${code.split("(")[1].replace(")", "")}`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "cy.log":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Logged message ${code.split("(")[1].replace(")", "")}`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "cy.pause":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Paused Cypress execution`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "cy.title":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Got the document.title property of the active page`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "cy.focused":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Got the DOM element that is currently focused`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "cy.fixture":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Loaded a fixed set of data located in the ${code.split("(")[1].replace(")", "")} file`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "cy.task":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Executed Node code via the ${code.split("(")[1].replace(")", "")} task`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "cy.reload":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Reloaded the page`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "cy.readFile":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Read the ${code.split("(")[1].replace(")", "")} file and yielded its contents`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case ".type":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Typed the ${code.split("(")[1].replace(")", "")} text`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case ".selectFile":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Uploaded the ${code.split("(")[1].replace(")", "")} file`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "Cypress.env":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Got the ${code.split("(")[1].replace(")", "")} environment variable`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "describe":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Defined the ${code.split("(")[1].replace(")", "")} test suite`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "context":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Defined the ${code.split("(")[1].replace(")", "")} test sub-suite`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          case "it":
            if (code.includes("(")) {
              message = `Success:\n\n${code} // Defined the ${code.split("(")[1].replace(")", "")} test case`
              outputArea.classList.add("success")
            } else {
              message = `Error:\n\nMissing parentheses on \`${code}\` command`
              outputArea.classList.add("error")
            }
            break
          default:
            message = `Warning:\n\nThe \`${command}\` command has not been implemented yet.`
            outputArea.classList.add("warning")
            break
          }
        } else {
          message = `Error:\n\nInvalid Cypress command: ${code}`
          outputArea.classList.add("error")
        }

        outputArea.textContent = message
      }

      runButton.disabled = false
      runButton.classList.remove("loading")
      runButton.innerHTML = "Run"
    }, (Math.floor(Math.random() * 5) + 1) * 1000)
  }
})
