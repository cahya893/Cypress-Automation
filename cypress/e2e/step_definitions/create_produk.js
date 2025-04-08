import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

Given("Pengguna sudah login ke backoffice pawoon", function () {
  cy.login();
});

When("Pengguna masuk ke halaman produk pawoon", function () {
  cy.get('.navbar-fixed.navbar-dark').get('a').contains('Produk').click();
  cy.get('div.col-md-6.col-xs-12.center-less.text-right').get('#add-new-product').contains('Tambah Produk').click();
  cy.screenshot();

});

When("Pengguna melakukan input data produk", function () {
  cy.get('div.box-wrapper.col-md-12.col-xs-12');
  cy.fixture('fixtures').then((data) => {
    let counter = 1; // Mulai dari 1
        let produkName = data.nama_produk;

        function inputProduk() {
          // Masukkan nama kategori
          cy.get('input#name.form-control').clear().type(produkName, { force: true });
          cy.get('button.btn.dropdown-toggle.bs-placeholder.btn-default').find('span.filter-option.pull-left').click();
          cy.get('#form_product > div:nth-child(2) > div.box-wrapper.col-md-12.col-xs-12 > div:nth-child(1) > div.form-group.col-md-12.col-xs-12.selectpicker-tooltip.product-category > div > div > div > ul')
          .should('have.length', 1);
          cy.get('#form_product > div:nth-child(2) > div.box-wrapper.col-md-12.col-xs-12 > div:nth-child(1) > div.form-group.col-md-12.col-xs-12.selectpicker-tooltip.product-category > div > div > div > div > input')
          .click().type('Automation Cypress', { force: true });
          cy.get('#form_product > div:nth-child(2) > div.box-wrapper.col-md-12.col-xs-12 > div:nth-child(1) > div.form-group.col-md-12.col-xs-12.selectpicker-tooltip.product-category > div > div > div > ul > li.active > a')
          .click();
          cy.get('input#price.form-control').click().type('10000', { force: true });
          cy.screenshot();
          cy.get('#page-wrapper > div:nth-child(2) > div > div.col-md-4.col-xs-12.center-less.text-right > button').click();
          cy.wait(3000);
        
          // Cek apakah error muncul
          cy.get('body').then(($body) => {
              if ($body.find('.label-error > div').length > 0) {
                  cy.get('.label-error > div').invoke('text').then((text) => {
                      if (text.includes('Nama produk sudah ada!')) {
                          // Jika produk sudah ada, tambahkan angka dan coba lagi
                          produkName = `${data.nama_produk} ${counter}`; // Update variable for product name
                          counter++;
                          inputProduk(); // Rekursi untuk mencoba lagi
                      } else {
                          cy.log('Produk berhasil ditambahkan');
                      }
                  });
              } else {
                  // Jika tidak ada error, lanjutkan ke skenario berikutnya
                  cy.log('Kategori berhasil ditambahkan, lanjutkan ke skenario berikutnya');
              }
          });
      }

      inputProduk(); // Panggil fungsi pertama kali
  }); 
  });

Then("Pengguna berhasil membuat produk di pawoon", function () {
  cy.get('#page-wrapper > div:nth-child(1) > div.top-notification > div > div').should('include.text', 'berhasil disimpan');
  cy.screenshot();
  cy.log('Anda Berhasil Membuat Produk');
});
