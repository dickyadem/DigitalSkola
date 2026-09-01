# Mobile Login Test

Folder ini berisi automated UI test untuk proses login pada aplikasi **Sauce Labs My Demo App Android** menggunakan WebdriverIO, Appium, dan Mocha.

## Struktur Folder

```text
test/
├── locators/
│   └── login.locator.js   # Selector elemen halaman login
├── page/
│   └── login.page.js      # Page Object untuk aksi pada halaman login
├── specs/
│   └── login.spec.js      # Skenario pengujian login
└── utils/
    └── action.util.js     # Utility wait, click, input, dan scroll
```

## Skenario Test

Test pada `specs/login.spec.js` memverifikasi alur berikut:

1. Membuka menu aplikasi.
2. Scroll ke menu **Log In**.
3. Mengisi email dan password.
4. Menekan tombol **Tap to login with given credentials**.
5. Mengakhiri aplikasi setelah test selesai.

Kredensial yang digunakan oleh skenario saat ini:

- Email: `bod@example.com`
- Password: `10203040`

## Prasyarat

- Node.js dan npm.
- Android Emulator dengan device name `emulator-5554`.
- Aplikasi Sauce Labs My Demo App Android sudah terpasang pada emulator.
- Appium Server berjalan pada `127.0.0.1:4723`.
- Dependency pada folder `tugas 14` sudah terpasang.

Install dependency dari folder parent:

```bash
cd "tugas 14"
npm install
```

## Menjalankan Test

Pastikan Appium Server dan Android Emulator sudah aktif, kemudian jalankan dari folder `tugas 14`:

```bash
cd "tugas 14"
npm test
```

Konfigurasi WebdriverIO membaca seluruh spec dari `test/specs/**/*.js` melalui file `wdio.conf.js`.

## Page Object Model

`page/login.page.js` memisahkan aksi halaman dari file spec. Class `LoginPage` menyediakan method:

- `openLoginForm()` untuk membuka form login.
- `fillCredentials(email, password)` untuk mengisi kredensial.
- `clickTapToLogin()` untuk menekan tombol login.

Selector disimpan terpisah di `locators/login.locator.js`, sedangkan operasi umum seperti menunggu elemen, klik, input, dan scroll tersedia di `utils/action.util.js`.

## Allure Report

Test menggunakan reporter `@wdio/allure-reporter` dan menyimpan hasil mentah ke folder `allure-results` pada folder `tugas 14`. Allure membaca hasil mentah tersebut dan mengubahnya menjadi report HTML interaktif.

### Prasyarat Allure

Pastikan dependency `allure-commandline` sudah terpasang pada folder `tugas 14`:

```bash
cd "tugas 14"
npm install -D allure-commandline
```

Jalankan test terlebih dahulu agar folder `allure-results` berisi hasil terbaru:

```bash
npm test
```

Buat dan buka report dengan:

```bash
cd "tugas 14"
npm run allure
```

Perintah tersebut menjalankan dua tahap:

1. `allure:generate` menghapus report lama dan membuat report baru pada folder `allure-report`.
2. `allure:open` membuka report menggunakan server lokal Allure.

Tahap tersebut juga dapat dijalankan secara terpisah:

```bash
npm run allure:generate
npm run allure:open
```

Report dapat dibuka melalui alamat lokal yang ditampilkan oleh perintah `allure:open`. Gunakan server lokal tersebut agar asset dan tampilan report dimuat dengan benar.

## Catatan Konfigurasi

Capability Android pada `wdio.conf.js` menggunakan:

- Platform: `Android`
- Automation engine: `UiAutomator2`
- Device: `emulator-5554`
- Package: `com.saucelabs.mydemoapp.android`
- Activity awal: `com.saucelabs.mydemoapp.android/.view.activities.SplashActivity`

Jika nama emulator, package aplikasi, atau port Appium berbeda, sesuaikan nilai tersebut di `wdio.conf.js` sebelum menjalankan test.
