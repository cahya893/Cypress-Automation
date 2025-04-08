import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("Pengguna membuka halaman login backoffice pawoon", function () {
  cy.visit("https://my-v2-stg-ic.pawoon.com/");
  cy.screenshot();
  });

When("Pengguna memasukkan email dan password yang benar", () => {
  cy.fixture("fixtures").then((data) => {
    cy.get("#loginForm").find('input.form-control.email-type')
      .type(data.email, { force: true });
    
    cy.get("#loginForm").find('input[name="password"]')
      .type(data.password, { force: true });
  });
  cy.screenshot();
});

When("Pengguna menekan tombol login", () => {
  cy.get("#loginForm").find('button[type="submit"]').click();
  cy.viewport(1920, 1080)
});

Then("Pengguna berhasil login ke backoffice pawoon", () => {
  cy.contains("Dashboard").should("be.visible");
  cy.screenshot();
  cy.log('Anda Berhasil login Pawoon');
});