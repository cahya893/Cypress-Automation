import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("Pengguna membuka halaman login backoffice pawoon", function () {
  cy.visit("https://my-v2-stg-ic.pawoon.com/");
  cy.viewport(1920, 1080)
  cy.get('a.phpdebugbar-close-btn').click();
  });

  When("Pengguna masuk ke halaman register pawoon", function () {
    cy.get('a.link-blue').click();
    cy.get('form.fl-form').should('be.visible');
    cy.screenshot();
    cy.log('Berhasil masuk ke halaman register');
   
    });

    When("Pengguna menginput data akun pawoon", function () {
      cy.fixture('fixtures').then((data) => {
        let counter = 1; // Mulai dari 1
        let emailName = data.email_register;

        function inputEmail() {
      cy.get('#reg-fullname').clear({ force: true }).type('Automation Cypress', {force: true});
      cy.get('#reg-email').clear({ force: true }).type(emailName + '@gmail.com', { force: true });
      cy.get('#reg-phone').clear({ force: true }).type('089620142271', {force: true});
      cy.get('#reg-password').clear({ force: true }).type('123456', {force: true});
      cy.get('.regular-checkbox').check();
      cy.wait(1000);
      cy.screenshot();
      cy.get('#do-regist-step1').click();
      cy.wait(2000);

            // Cek apakah error muncul
            cy.get('body').then(($body) => {
                if ($body.find('.top-left').length > 0) {
                    cy.get('.top-left').invoke('text').then((text) => {
                        if (text.includes('Email sudah digunakan')) {
                            // Jika email sudah digunakan, tambahkan angka dan coba lagi
                            emailName = `${data.email_register}${counter}`;
                            counter++;
                            inputEmail(); // Rekursi untuk mencoba lagi
                        } else {
                            cy.log('Email berhasil dibuat');
                        }
                    });
                } else {
                    
                    cy.log('lanjutkan ke skenario berikutnya');
                }
            });
        }

        inputEmail(); // Panggil fungsi pertama kali
      });
      
  
      cy.get('#reg-business-name').type('Automation cypress', {force: true});
      cy.get('#reg-business-type').click();
      cy.get('[d-alias="food-beverage"]').click();  
      cy.get(':nth-child(1) > .list-child > :nth-child(1) > span').click();
      cy.wait(1000);
      cy.get('#reg-business-city').type('Jakarta', {force: true});
      cy.wait(3000);
      cy.get('.all-list > :nth-child(1) > span').click();
      cy.wait(1000);
      cy.screenshot();
      cy.get('#do-regist-step2').click();
      cy.wait(1000);
      cy.screenshot();
      cy.get(':nth-child(2) > .btn').click();
      
      });

      When("Pengguna berhasil membuat akun pawoon", function () {
      cy.get('.top-left').should('be.visible');
      cy.screenshot();
      cy.log('Anda berhasil membuat akun pawoon');
      });