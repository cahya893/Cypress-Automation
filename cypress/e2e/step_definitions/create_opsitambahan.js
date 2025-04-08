import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("Pengguna sudah login ke backoffice pawoon dan masuk ke halaman produk", function () {
    cy.login();
    cy.get('.navbar-fixed.navbar-dark').get('a').contains('Produk').click();
});

When("Pengguna masuk ke halaman Opsi tambahan", function () {
    cy.get('#page-wrapper > div.row.row-m > div');
    cy.get('#tab-opsi-tambahan').click();
    cy.screenshot();
    });

When("Pengguna melakukan input data opsi tambahan", function () {
    cy.get('#create-modifier').should('be.visible');
    cy.visit('https://my-v2-stg-ic.pawoon.com/modifiers/create');
    cy.get('#formCreateModifier strong').should('include.text', 'Nama Grup Opsi Tambahan').should('be.visible');    
    cy.log('Berhasil masuk ke halaman create opsi tambahan');

    cy.fixture('fixtures').then((data) => {
        cy.get('input#group_name.form-control').type(data.nama_opsitambahan, { force: true });
    });
    cy.get('input.form-control.modifiers_name').type('Telur', { force: true });
    cy.get('input.form-control.modifiers_price.nc-vl').type('1000', { force: true });
    cy.screenshot();
    cy.get('.action-submit').click();

});

Then("Pengguna berhasil membuat kategori di opsi tambahan", function () {
    cy.get('#page-wrapper > div:nth-child(1) > div.top-notification > div > div').should('include.text', 'Opsi Tambahan berhasil ditambah.');
    cy.screenshot();
    cy.log('Anda Berhasil Membuat Opsi Tambahan');
    });