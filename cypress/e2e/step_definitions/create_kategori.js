import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

Given("Pengguna sudah login ke backoffice pawoon dan masuk ke halaman produk", function () {
    cy.login();
    cy.get('.navbar-fixed.navbar-dark').get('a').contains('Produk').click();
    cy.screenshot();
});

When("Pengguna masuk ke halaman kategori", function () {
    cy.get('#page-wrapper > div.row.row-m > div');
    cy.get('#tab-kategori').click();
});

When("Pengguna melakukan input data kategori", function () {
    cy.get('.action-create').click();
    cy.get('#modal-form-category > div > div > div.modal-header > h4')
        .should('have.text', 'Tambah Kategori')
        .should('be.visible');
        cy.screenshot();
    cy.log('Berhasil masuk ke halaman create kategori');

    cy.fixture('fixtures').then((data) => {
        let counter = 1; // Mulai dari 1
        let categoryName = data.nama_kategori; // Ambil nama kategori dari fixture

        function inputCategory() {
            // Masukkan nama kategori
            cy.get('#modal-form-category input.form-control').clear().type(categoryName, { force: true });
            cy.screenshot();
            cy.get('.action-submit').click();
            cy.wait(3000);

            // Cek apakah error muncul
            cy.get('body').then(($body) => {
                if ($body.find('.label-error > div').length > 0) {
                    cy.get('.label-error > div').invoke('text').then((text) => {
                        if (text.includes('Nama kategori sudah ada!')) {
                            // Jika kategori sudah ada, tambahkan angka dan coba lagi
                            categoryName = `${data.nama_kategori} ${counter}`;
                            counter++;
                            inputCategory(); // Rekursi untuk mencoba lagi
                        } else {
                            cy.log('Kategori berhasil ditambahkan');
                        }
                    });
                } else {
                    // Jika tidak ada error, lanjutkan ke skenario berikutnya
                    cy.log('Kategori berhasil ditambahkan, lanjutkan ke skenario berikutnya');
                }
            });
        }

        inputCategory(); // Panggil fungsi pertama kali
    });
});

Then("Pengguna berhasil membuat kategori di pawoon", function () {
    cy.get('#page-wrapper > div:nth-child(1) > div.top-notification > div > div').should('include.text', 'Kategori produk berhasil ditambahkan');
    cy.screenshot();
    cy.log('Anda Berhasil Membuat Kategori');
});