/* eslint-disable no-undef */
describe("Sign up", () => {
  it("User can scrape a recipe, create an account, and delete an account", () => {
    // Scrape recipe
    cy.visit("http://localhost:3000");
    cy.findByPlaceholderText(/paste a recipe's url/i).type(
      "https://www.dinneratthezoo.com/slow-cooker-teriyaki-chicken/"
    );
    cy.findByRole("button", { name: /get recipe/i }).click();
    cy.findByRole("button", { name: /edit/i }).click();

    // Sign up
    cy.get("#popup-signup-form")
      .findByLabelText(/username/i)
      .type("johndoe");
    cy.get("#popup-signup-form")
      .findByLabelText(/^password$/i)
      .type("123&K456");
    cy.get("#popup-signup-form")
      .findByLabelText(/confirm password/i)
      .type("123&K456");
    cy.get("#popup-signup-form")
      .findByRole("button", { name: /sign up/i })
      .click();

    // Delete account
    cy.findByText(/settings/i).click();
    cy.findByRole("button", { name: /delete account/i }).click();
    cy.findByRole("button", { name: /^delete$/i }).click();
    cy.findByText(/your account has been deleted/i).should("be.visible");
  });
});
