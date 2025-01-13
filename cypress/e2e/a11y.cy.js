describe("Cypress Simulator - A11y Checks", () => {
  beforeEach(() => {
    cy.visit("./src/index.html?skipCaptcha=true", {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
    cy.contains("button", "Login").click()
    cy.injectAxe()
  })

  it("successfully simulates a Cypress command (e.g., cy.log('Yay!'))", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.log('Yay!')")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Success:")
      .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
      .and("be.visible")
  })

  it("shows an error when entering and running an invalid Cypress command (e.g., cy.run())", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.run()")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Error:")
      .and("contain", "Invalid Cypress command: cy.run()")
      .and("be.visible")
  })

  it("shows a warning when entering and running a not-implemented Cypress command (e.g., cy.contains('Login'))", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.contains('Login')")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000})
      .should("contain", "Warning:")
      .and("contain", "The `cy.contains` command has not been implemented yet.")
      .and("be.visible")
  })

  it("asks for help and gets common Cypress commands and examples with a link to the docs", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("help")
    cy.contains("button", "Run").click()

    cy.get("#outputArea", { timeout: 6000})
      .should("contain", "Common Cypress commands and examples:")
      .and("contain","For more commands and details, visit the official Cypress API documentation.")
      .and("be.visible")
    cy.contains("#outputArea a", "official Cypress API documentation")
      .should("have.attr", "href", "https://docs.cypress.io/api/table-of-contents")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noopener noreferrer")
      .and("be.visible")
  })

  it("maximizes and minimizes a simulation result", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.log('Yay!')")
    cy.contains("button", "Run").click()

    cy.get('.expand-collapse').click()

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Success:")
      .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
      .and("be.visible")
    cy.get("#collapseIcon").should("be.visible")

    cy.checkA11y()

    cy.get(".expand-collapse").click()

    cy.get("#expandIcon").should("be.visible")
  })

  it("logs out successfully", () => {
    cy.get("#sandwich-menu").click()
    cy.contains("button", "Logout").click()

    cy.contains("button", "Login").should("be.visible")
    cy.get("#sandwich-menu").should("not.be.visible")

    cy.checkA11y()
  })

  it("shows and hides the logout button", () => {
    cy.get("#sandwich-menu").click()
    cy.contains("button", "Logout").should("be.visible")

    cy.checkA11y()

    cy.get("#sandwich-menu").click()
    cy.contains("button", "Logout").should("not.be.visible")
  })

  it("shows the running state before showing the final result", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.log('Yay!')")
    cy.contains("button", "Run").click()

    cy.contains("button", "Running...").should("be.visible")
    cy.contains("#outputArea", "Running... Please wait.")
      .should("be.visible")

    cy.checkA11y()

    cy.contains(
      "button",
      "Running...",
      { timeout:  6000 }
    ).should("not.exist")
    cy.contains("button", "Run").should("be.visible")
    cy.contains("#outputArea", "Running... Please wait.", { timeout: 6000})
      .should("not.exist")
    cy.get("#outputArea")
      .should("contain", "Success:")
      .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
      .and("be.visible")
  })
})

describe("Cypress Simulator - Cookies Consent", () => {
  beforeEach(() => {
    cy.visit("./src/index.html?skipCaptcha=true")
    cy.contains("button", "Login").click()
    cy.injectAxe()
  })

  it("consents on the cookies usage", () => {
    cy.get("#cookieConsent")
      .as("cookieConsentBanner")
      .should("be.visible")

    cy.checkA11y()

    cy.get("@cookieConsentBanner")
      .find("button:contains('Accept')")
      .click()

    cy.get("@cookieConsentBanner").should("not.be.visible")
    cy.window()
      .its("localStorage.cookieConsent")
      .should("be.equal", "accepted")
  })
})

describe("Cypress Simulator - Captcha", () => {
  beforeEach(() => {
    cy.visit("./src/index.html")
    cy.contains("button", "Login").click()
  })

  it("disables the captcha verify button when no answer is provided or it's cleared", () => {
    cy.contains("button", "Verify").should("be.disabled")

    cy.get("input[placeholder='Enter your answer']").type("1")

    cy.contains("button", "Verify").should("be.enabled")

    cy.get("input[placeholder='Enter your answer']").clear()

    cy.contains("button", "Verify").should("be.disabled")
  })

  it("shows an error on a wrong captcha answer and goes back to its initial state", () => {
    cy.get("input[placeholder='Enter your answer']").type("1000")
    cy.contains("button", "Verify").should("be.enabled")

    cy.contains("button", "Verify").click()

    cy.contains(".error", "Incorrect answer, please try again.")
      .should("be.visible")
    cy.get("input[placeholder='Enter your answer']")
      .should("have.value", "")
    cy.contains("button", "Verify").should("be.disabled")
  })
})
