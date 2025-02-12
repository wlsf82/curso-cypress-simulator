describe('Cypress simulator', () => {
  beforeEach(() => {
    cy.visit('./src/index.html?skipCaptcha=true',{
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
    cy.contains('button', 'Login').click();
  });
  it.only(`it successfully simulates a Cypress command (cy.log('Yay!'))`, () => {
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

  });

  it('Warning', () => {

  });

  it('Error: valid command withou parentheses', () => {

  });

  it('Help', () => {

  });

  it('Maximize/minimize', () => {

  });

  it('Logout', () => {

  });

  it('Show and hide logout button', () => {

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