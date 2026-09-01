const authPage = require('../pages/auth.page');

describe("Belajar Bareng Apps - Flow Register & Login", () => {

    after(async () => {
        await browser.terminateApp('com.example.belajar_bareng');
    });

    it("should register and login successfully with dynamic user data", async () => {
        const timestamp = Date.now();
        const dynamicName = `User QA ${timestamp}`;
        const dynamicEmail = `user_${timestamp}@example.com`;
        const defaultPassword = 'Password123!';

        // 1. Ke Halaman Register
        await authPage.navigateToRegister();

        // 2. Isi Form Register & Submit
        await authPage.fillRegisterForm(dynamicName, dynamicEmail, defaultPassword);
        await authPage.submitRegister();

        // 3. ASSERT REGISTER
        await authPage.toastSuccessRegister.waitForExist({ timeout: 5000 });

        // 4. Jeda transisi ke Halaman Login
        await browser.pause(3000);

        // 5. Isi Form Login & Submit
        await authPage.fillLoginForm(dynamicEmail, defaultPassword);
        await authPage.submitLogin();

        // 6. ASSERT LOGIN (Menunggu keberadaan Snackbar "Login berhasil")
        await authPage.toastSuccessLogin.waitForExist({ timeout: 5000 });
        await expect(authPage.toastSuccessLogin).toExist();

        await browser.pause(3000);
    });

});