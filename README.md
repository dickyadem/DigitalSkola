# DigitalSkola Project QA Automation

Repository ini berisi kumpulan latihan dan tugas QA Automation DigitalSkola, mulai dari dasar JavaScript, pengujian API, pengujian end-to-end menggunakan Selenium WebDriver, sampai visual regression testing.

## Daftar Isi

- [Persiapan](#persiapan)
- [Ringkasan Task](#ringkasan-task)
- [Task 3: Perulangan JavaScript](#task-3-perulangan-javascript)
- [Task 4: Kalkulator JavaScript](#task-4-kalkulator-javascript)
- [Task 5: Latihan Git dan JavaScript](#task-5-latihan-git-dan-javascript)
- [Task 6: Koleksi Postman API](#task-6-koleksi-postman-api)
- [Task 7: API Automation dengan Mocha](#task-7-api-automation-dengan-mocha)
- [Task 8: UI Automation Belajar Bareng](#task-8-ui-automation-belajar-bareng)
- [Task 9: UI Automation dengan Setup Bersama](#task-9-ui-automation-dengan-setup-bersama)
- [Task 10: Page Object dan Visual Regression](#task-10-page-object-dan-visual-regression)
- [Quiz: Shopping Flow](#quiz-shopping-flow)

## Persiapan

- Node.js 18 atau versi yang lebih baru untuk mendukung `fetch` bawaan Node.js.
- Google Chrome untuk test Selenium.
- Koneksi internet karena test mengakses aplikasi `https://belajar-bareng.onrender.com` dan SauceDemo.

Setiap folder Node.js memiliki `package.json` sendiri. Jalankan instalasi dan test dari folder terkait:

```bash
cd "tugas 7"
npm install
npm test
```

Perintah `npm run report` tersedia di folder yang menggunakan Mochawesome untuk membuat ulang report HTML dan JSON.

## Ringkasan Task

| Bagian | Fokus | Artefak utama |
| --- | --- | --- |
| Task 3 | Perulangan dan output pola | `sesi3_DickyAdeMahendra.js` |
| Task 4 | Fungsi kalkulator dan ES module | `kalkulator.js`, `main.js` |
| Task 5 | Latihan staging Git dan JavaScript dasar | `fileMain.js`, `fileStaging.js`, `playground.js` |
| Task 6 | Skenario request API di Postman | Koleksi `.postman_collection.json` |
| Task 7 | API automation, CRUD, dan JSON Schema | Test Mocha, Chai, Ajv |
| Task 8 | UI automation alur login dan belanja | Selenium WebDriver |
| Task 9 | UI automation dengan lifecycle driver | Selenium WebDriver |
| Task 10 | Page Object Model dan visual regression | Selenium, `pixelmatch`, `pngjs` |
| Quiz | UI automation alur shopping sampai checkout | Selenium WebDriver |

## Task 3: Perulangan JavaScript

**Tujuan:** memahami `for loop`, akumulasi string, dan output bertahap ke console.

File [sesi3_DickyAdeMahendra.js](tugas%203/sesi3_DickyAdeMahendra.js) membuat pola bintang lima baris:

```text
*
**
***
****
*****
```

**Cara menjalankan:**

```bash
node "tugas 3/sesi3_DickyAdeMahendra.js"
```

## Task 4: Kalkulator JavaScript

**Tujuan:** membuat fungsi kalkulator yang dapat digunakan kembali dari file lain.

File [kalkulator.js](tugas%204/kalkulator.js) mengekspor fungsi `hitung(a, b, operator)` dengan dukungan:

- Penjumlahan: `+` atau `tambah`
- Pengurangan: `-` atau `kurang`
- Perkalian: `*` atau `kali`
- Pembagian: `/` atau `bagi`
- Modulus: `%` atau `modulus`
- Pangkat: `**` atau `pangkat`

Pembagian dengan nol menghasilkan pesan error dan operator yang tidak dikenali menghasilkan pesan `Operator tidak dikenal`. File [main.js](tugas%204/main.js) menjalankan contoh seluruh operasi.

**Cara menjalankan:**

```bash
node "tugas 4/main.js"
```

## Task 5: Latihan Git dan JavaScript

**Tujuan:** latihan konsep file `main` dan `staging`, serta deklarasi variabel sederhana.

- [fileMain.js](tugas%205/fileMain.js) berisi penanda latihan untuk file main.
- [fileStaging.js](tugas%205/fileStaging.js) berisi penanda latihan untuk file staging.
- [playground.js](tugas%205/playground.js) mendeklarasikan nama dan mencetaknya ke console.
- [secretcode.txt](tugas%205/secretcode.txt) menyimpan file latihan terkait secret code.
- [payment.js](tugas%205/payment.js) tersedia sebagai file latihan, tetapi saat ini belum memiliki implementasi.

**Cara menjalankan contoh JavaScript:**

```bash
node "tugas 5/playground.js"
```

## Task 6: Koleksi Postman API

File [DickyAdeMahendra– Batch 17.postman_collection.json](tugas%206/DickyAdeMahendra%E2%80%93%20Batch%2017.postman_collection.json) berisi koleksi request ke API Belajar Bareng.

Skenario yang tersedia:

1. `POST /api/login` untuk memperoleh token.
2. `GET /api/users` dengan autentikasi Bearer token.
3. `POST /api/add-user` untuk kasus positif.
4. `POST /api/add-user` untuk kasus negatif dengan username kosong dan age bukan angka.

Test Postman memeriksa status response, keberadaan token, serta struktur dasar response user. Variabel koleksi `base_url` dan `token` digunakan agar request dapat saling terhubung.

## Task 7: API Automation dengan Mocha

**Tujuan:** mengotomatisasi pengujian API menggunakan Node.js `fetch`, Mocha, Chai, dan Ajv.

Test pada folder [tugas 7/test](tugas%207/test) mencakup:

- Login valid dan pengambilan daftar user.
- Penambahan user untuk kasus positif dan negatif.
- Penghapusan user yang baru dibuat.
- Validasi JSON Schema untuk response login dan daftar user.

**Cara menjalankan:**

```bash
cd "tugas 7"
npm install
npm test
```

Report tersimpan di [mochawesome-report/mochawesome.html](tugas%207/mochawesome-report/mochawesome.html). Report yang ada mencatat 8 test lulus saat dibuat.

## Task 8: UI Automation Belajar Bareng

File [addUser.js](tugas%208/test/addUser.js) mengotomatisasi alur UI berikut:

1. Membuka aplikasi Belajar Bareng.
2. Login menggunakan akun admin.
3. Membuka menu shopping.
4. Menambahkan produk ke cart.
5. Membuka checkout.
6. Mengisi nama, email, alamat, dan captcha matematika.
7. Membuka dan menyetujui terms and conditions.
8. Mengirim checkout.

Elemen halaman dicari menggunakan atribut `data-testid`, sehingga locator lebih terarah daripada selector berbasis posisi atau teks visual.

**Cara menjalankan:**

```bash
cd "tugas 8"
npm install
npm test
```

Report yang tersedia dapat dibuka melalui [mochawesome-report/mochawesome.html](tugas%208/mochawesome-report/mochawesome.html).

## Task 9: UI Automation dengan Setup Bersama

File [addUser.js](tugas%209/test/addUser.js) mempraktikkan pengelolaan lifecycle Selenium yang lebih terstruktur:

- Driver dibuat sekali di `before` menggunakan Chrome headless.
- Login dilakukan ulang pada `beforeEach`.
- Cookie dan storage dibersihkan pada `afterEach`.
- Driver ditutup pada `after`.
- Test membuat username dan age dinamis, lalu memastikan form kembali kosong setelah submit.

**Cara menjalankan:**

```bash
cd "tugas 9"
npm install
npm test
```

Report tersimpan di [mochawesome-report/mochawesome.html](tugas%209/mochawesome-report/mochawesome.html). Isi report yang tersimpan perlu diperlakukan sebagai artefak historis karena nama file dan metadata report tidak sepenuhnya konsisten dengan struktur folder saat ini.

## Task 10: Page Object dan Visual Regression

**Tujuan:** memisahkan locator dan aksi halaman menggunakan Page Object Model, lalu membandingkan screenshot aktual dengan baseline.

- [LoginPage.locator.js](tugas%2010/locator/LoginPage.locator.js) menyimpan locator halaman login.
- [LoginPage.js](tugas%2010/page/LoginPage.js) membungkus aksi membuka halaman, login, dan menunggu inventory/error.
- [Login.spec.js](tugas%2010/specs/Login.spec.js) menguji login `standard_user` dan penolakan username invalid.

### Visual Regression

File [visualRegression.js](tugas%2010/utilities/visualRegression.js) menyimpan screenshot `current`, membuat baseline jika belum ada, serta menghitung perbedaan pixel menggunakan `pixelmatch`. Test visual dianggap lulus jika persentase kecocokan minimal 90%.

#### Baseline

Baseline adalah screenshot acuan yang digunakan sebagai pembanding untuk hasil test berikutnya. Lihat folder [screenshots/baseline](tugas%2010/screenshots/baseline/).

![Baseline login page](tugas%2010/screenshots/baseline/login-page.png)

#### Current

Current adalah screenshot terbaru yang diambil ketika test dijalankan. Lihat folder [screenshots/current](tugas%2010/screenshots/current/).

![Current login page](tugas%2010/screenshots/current/login-page.png)

#### Diff

Diff adalah hasil visual perbandingan antara baseline dan current. Area yang berbeda ditampilkan oleh `pixelmatch`. Lihat folder [screenshots/diff](tugas%2010/screenshots/diff/).

![Visual diff login page](tugas%2010/screenshots/diff/login-page.png)

Folder screenshot:

- [Folder Baseline](tugas%2010/screenshots/baseline/)
- [Folder Current](tugas%2010/screenshots/current/)
- [Folder Diff](tugas%2010/screenshots/diff/)

**Cara menjalankan:**

```bash
cd "tugas 10"
npm install
npm test
```

Report tersedia di [mochawesome-report/mochawesome.html](tugas%2010/mochawesome-report/mochawesome.html).

## Quiz: Shopping Flow

File [shoping.js](quiz/test/shoping.js) mengotomatisasi alur belanja end-to-end pada aplikasi Belajar Bareng:

1. Login.
2. Membuka menu shopping.
3. Menambahkan produk pertama ke cart.
4. Membuka cart dan checkout.
5. Mengisi data pelanggan dan captcha.
6. Menyetujui terms and conditions dan submit checkout.

**Cara menjalankan:**

```bash
cd quiz
npm install
npm test
```

Report tersedia di [mochawesome-report/mochawesome.html](quiz/mochawesome-report/mochawesome.html). Report yang tersimpan mencatat 1 test lulus.

## Catatan Struktur

Folder `tugas 1` dan `tugas 2` tidak tersedia pada repository saat dokumentasi ini dibuat. Dokumentasi di atas mencakup seluruh task dan artefak yang tersedia, termasuk folder `quiz`.
