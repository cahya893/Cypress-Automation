Feature: Create Produk Pawoon

  Scenario: Membuat produk baru
    Given Pengguna sudah login ke backoffice pawoon dan masuk ke halaman produk
    When Pengguna masuk ke halaman Opsi tambahan
    And Pengguna melakukan input data opsi tambahan
    Then Pengguna berhasil membuat kategori di opsi tambahan