# Templat Next.js dengan NextAuth.js

## Changelog

### 0.1.4 - Sign Up functionality completed

- Menampilkan indikator bahwa data sedang diproses
- Menampilkan pesan _error_ ketika data gagal diproses
- Mengalihkan laman ke `/login` setelah data berhasil diproses

### 0.1.3 - Hash password

- Menggunakan [bcryptjs](https://www.npmjs.com/package/bcryptjs) untuk _hashing_ kata sandi sebelum disimpan ke Firebase

### 0.1.2 - Add Sign Up functionality

- Memvalidasi setiap _input_ yang dikirim oleh form di laman `/signup`
- Menyimpan data ke Firebase (Realtime Database)
- Memvalidasi apakah email sudah terdaftar atau belum

### 0.1.1 - Create Sign Up form

- Membuat form di laman `/signup` dengan fungsionalitas sampai mencetak _input_ ke _Console_
- Menambahkan tombol di laman `/login` dan `/signup` untuk berpindah antara halaman

### 0.1.0 - Create Login form

- Membuat form di laman `/login` dengan fungsionalitas sampai mencetak _input_ ke _Console_
