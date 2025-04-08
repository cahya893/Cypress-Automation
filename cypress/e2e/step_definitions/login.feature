Feature: Login Ke Backoffice Pawoon

  Scenario: Login Ke Backoffice Pawoon
    Given Pengguna membuka halaman login backoffice pawoon
    When Pengguna memasukkan email dan password yang benar
    And Pengguna menekan tombol login
    Then Pengguna berhasil login ke backoffice pawoon