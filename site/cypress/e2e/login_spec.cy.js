/* eslint-disable no-undef */
describe("login", () => {
  it("user can edit and save recipe", () => {
    // login
    cy.visit("http://localhost:3000");
    cy.findByPlaceholderText(/paste a recipe's url/i).type(
      "https://www.dinneratthezoo.com/slow-cooker-teriyaki-chicken/"
    );
    cy.findByRole("button", { name: /get recipe/i }).click();
    cy.findByRole("button", { name: /edit/i }).click();
    cy.findByLabelText(/username/i).type("Dfsdf");
  });
});
