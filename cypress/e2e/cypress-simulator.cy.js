describe("Cypress Simulator", () => {
  beforeEach(() => {
    cy.visit("./src/index.html?skipCaptcha=true")
    cy.contains("button", "Login").click()
  })

  it("success", () => {
    
  })

  it("error: invalid command scenario", () => {
    
  })

  it("warning", () => {
    
  })

  it("error: valid comand without parentheses", () => {
    
  })

  it("help", () => {
    
  })

  it("maximize/minimize", () => {
    
  })

  it("logout", () => {
    
  })

  it("show and hide logout button", () => {
    
  })

  it("Running... state", () => {
    
  })

  it("Accept cookies", () => {
    
  })

  it("Decline cookies", () => {
    
  })

  it("Captcha button states", () => {
    
  })

  it("Captcha error", () => {
    
  })

  it("Run button - enabled/disabled states", () => {
    
  })

  it("Reset textarea on logout and login", () => {
    
  })

  it("Disable run button on logout and login", () => {
    
  })

  it("Reset output on logout and login", () => {
    
  })

  it("No cookings banner on the login page", () => {
    
  })

  it("No cookings banner on the login page", () => {
    
  })
})
