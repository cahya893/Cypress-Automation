Feature: Create Produk Pawoon

  Scenario: Membuat produk baru
    Given Pengguna sudah login ke backoffice pawoon dan masuk ke halaman produk
    When Pengguna masuk ke halaman kategori
    And Pengguna melakukan input data kategori
    Then Pengguna berhasil membuat kategori di pawoon