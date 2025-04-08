Feature: Register Akun Pawoon

  Scenario: Register akun pawoon
    Given Pengguna membuka halaman login backoffice pawoon
    When Pengguna masuk ke halaman register pawoon
    And Pengguna menginput data akun pawoon
    Then Pengguna berhasil membuat akun pawoon