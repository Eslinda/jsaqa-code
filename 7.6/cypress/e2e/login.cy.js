beforeEach( () => {
  cy.visit("/");
})

it("Should open the main page", () => {
  cy.contains("Books list");
});

it("Should successfully login", () => {
  cy.login("test@test.com", "test");
  cy.contains("Добро пожаловать test@test.com").should("be.visible");
});

it("Should not login with empty login", () => {
  cy.contains("Log in").click();
  cy.get("#mail").type(" ");
  cy.get("#pass").type("test");
  cy.contains("Submit").click();
  cy.get("#mail")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
  cy.get("#mail")
    .then(($el) => $el[0].validationMessage)
    .should("contain", "Заполните это поле.");
});

it("Should not login with empty password", () => {
  cy.contains("Log in").click();
  cy.get("#mail").type("test@test.com");
  cy.contains("Submit").click();
  cy.get("#pass")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
});

describe ("When user add the books", () => {
  beforeEach( () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать").should("be.visible");
  })
  it("Should successfully add new book", () => {
    cy.addNewBook(
      "Ведьмак",
      "Геральт из Ривии — один из последних «ведьмаков», бродячих охотников на чудовищ ",
      "",
      "",
      "Анджей Санковский"
    );
    cy.contains("Ведьмак").should("be.visible");
  });

  it("Should successfully add book to favourites ", () => {
    cy.addNewBook(
      "Киндрэт. Кровные братья",
      "С начала времен миром правит тайное общество – кланы могущественных вампиров, которые могут даровать бессмертие избранным и владеют магией.",
      "",
      "",
      "Алексей Пехов",
      "+"
    );
    cy.contains("Favorites").click();
    cy.contains("Киндрэт. Кровные братья").should("be.visible");
  });

  it("Should delete a book from favorites", () => {
    cy.contains("Books list").click();
    cy.contains("Favorites").click();
    cy.contains("Киндрэт. Кровные братья").contains("Delete from favorite").click();
    cy.contains("Киндрэт. Кровные братья").should("not.exist");
  });
})