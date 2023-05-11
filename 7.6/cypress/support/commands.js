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

Cypress.Commands.add("login", (login, password) => {
  cy.contains("Log in").click();
  cy.get("#mail").type(login);
  cy.get("#pass").type(password);
  cy.contains("Submit").click();
});

Cypress.Commands.add("addNewBook", (title, description, cover, file, authors, addFavorites) => {
    cy.contains("Add new").click();
    if (title) {
      cy.get("#title").type(title);
    }
    if (description) {
      cy.get("#description").type(description);
    }
    if (cover) {
      cy.get("#fileCover").type(cover);
    }
    if (file) {
      cy.get("#fileBook").type(file);
    }
    if (authors) {
      cy.get("#authors").type(authors);
    }
    if (addFavorites) {
      cy.get("#favorite").click();
    }
    cy.contains("Submit").click();
  }
);