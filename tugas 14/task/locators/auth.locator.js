module.exports = {
    // Register Locators
    goToRegisterBtn: '~Belum punya akun? Register',
    registerNameInput: '//android.widget.EditText[1]',
    registerEmailInput: '//android.widget.EditText[2]',
    registerPasswordInput: '//android.widget.EditText[3]',
    registerSubmitBtn: '~Register',

    // Login Locators
    loginEmailInput: '//android.widget.EditText[@resource-id="email_input"]',
    loginPasswordInput: '//android.widget.EditText[@resource-id="password_input"]',
    loginSubmitBtn: '~Login',
    
    // Toast / Snackbar Locators
    toastSuccessRegister: '//android.widget.Toast | //*[contains(@text, "Register berhasil") or contains(@content-desc, "Register berhasil")]',
    toastSuccessLogin: '//android.widget.Toast | //*[contains(@text, "Login berhasil") or contains(@content-desc, "Login berhasil")]'
};