describe('Cypress simulator', () => {
  beforeEach(() => {
    cy.visit('./src/index.html?skipCaptcha=true', {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
    cy.contains('button', 'Login').click();
  });
  it(`Success: valid cypress command`, () => {
    cy.get('#codeInput')
      .type('cy.log("Yay!")')

    cy.get('#runButton')
      .click();

    cy.get('#outputArea', { timeout: 6000 })
      .should('contain', 'Success:')
      .and('contain', 'cy.log("Yay!") // Logged message "Yay!"')
      .and('be.visible')
  })

  it('Error: invalid cypress command ', () => {
    cy.get('#codeInput')
      .type('cy.run()')

    cy.get('#runButton')
      .click();

    cy.get('#outputArea', { timeout: 6000 })
      .should('contain', 'Error:')
      .and('contain', 'Invalid Cypress command: cy.run()')
      .and('be.visible')
  });

  it('Warning: Cypress command not implemented', () => {
    cy.get('#codeInput')
      .type('cy.contains("Login")')

    cy.get('#runButton')
      .click();

    cy.get('#outputArea', { timeout: 6000 })
      .should('contain', 'Warning:')
      .and('contain', 'The `cy.contains` command has not been implemented yet.')
      .and('be.visible')
  });

  it('Error: valid command withou parentheses', () => {
    cy.get('#codeInput')
      .type('cy.visit')

    cy.get('#runButton')
      .click();

    cy.get('#outputArea', { timeout: 6000 })
      .should('contain', 'Error:')
      .and('contain', 'Missing parentheses on `cy.visit` command')
      .and('be.visible')
  });

  it('Help command', () => {
    cy.get('#codeInput')
      .type('help')

    cy.get('#runButton')
      .click();

    cy.get('#outputArea', { timeout: 6000 })
      .should('contain', 'Common Cypress commands and examples:')
      .and('contain', 'For more commands and details, visit the official Cypress API documentation.')
      .and('be.visible')

    cy.contains('#outpuArea a', 'official Cypress API documentation')
      .should('have.attr', 'href', 'https://docs.cypress.io/api/table-of-contents')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
      .and('be.visible')
  });

  it('maximizes and minimizes a simulation results', () => {
    cy.get('#codeInput')
      .type('cy.log("Yay!")')
    cy.get('#runButton')
      .click();

    cy.get('.expand-collapse').click()

    cy.get('#outputArea', { timeout: 6000 })
      .should('contain', 'Success')
      .and('contain', 'cy.log("Yay!") // Logged message "Yay!"')
      .and('be.visible')
    cy.get('#collapseIcon').should('be.visible')

    cy.get('.expand-collapse').click()
    cy.get('#expandIcon').should('be.visible')
  });

  it('logout successfully', () => {
    cy.get('#sandwich-menu').click()
    cy.get('#logoutButton').click()

    cy.get('#login').should('be.visible')
      .and("contain", "Let's get started!")

    cy.get('#sandwich-menu').should('not.be.visible')

  });

  it.only('Show and hide logout button', () => {
    cy.get('#sandwich-menu').click()
    cy.get('#logoutButton').should('be.visible')

    cy.get('#sandwich-menu').click()
    cy.get('#logoutButton').should('not.be.visible')
  });

  it('Running... state', () => {

  });

  it('Accept cookies', () => {

  });

  it('Decline cookies', () => {

  });

  it('Captcha button states', () => {

  });

  it('Captcha error', () => {

  });

  it('Run button - enable/disable states', () => {

  });

  it('Reset textarea on logout and login', () => {

  });

  it('Disable run button on logout and login', () => {

  });

  it('Reset output on logout an login', () => {

  });

  it('No cookings banner on the login page', () => {

  });
})