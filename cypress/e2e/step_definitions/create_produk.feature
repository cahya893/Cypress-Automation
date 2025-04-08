Feature: Create Produk Pawoon

  Scenario: Membuat produk baru
    Given Pengguna sudah login ke backoffice pawoon
    When Pengguna masuk ke halaman produk pawoon
    When Pengguna melakukan input data produk
    Then Pengguna berhasil membuat produk di pawoon