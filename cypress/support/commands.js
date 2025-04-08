// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add("login", () => {
    cy.visit("https://my-v2-stg-ic.pawoon.com");
    cy.viewport(1920, 1080)
    cy.get('a.phpdebugbar-close-btn').click();
    cy.fixture("fixtures").then((data) => {
      cy.get("#loginForm").find('input.form-control.email-type')
        .type(data.email, { force: true });
  
      cy.get("#loginForm").find('input[name="password"]')
        .type(data.password, { force: true });
  
      cy.get("#loginForm").find('button[type="submit"]').click();
    });
  
    cy.contains("Dashboard").should("be.visible");
  });
  