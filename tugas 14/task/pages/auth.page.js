const locators = require('../locators/auth.locator');
const actionUtil = require('../utils/action.util');

class AuthPage {
    // Register Getters
    get goToRegisterBtn() { return $(locators.goToRegisterBtn); }
    get registerNameInput() { return $(locators.registerNameInput); }
    get registerEmailInput() { return $(locators.registerEmailInput); }
    get registerPasswordInput() { return $(locators.registerPasswordInput); }
    get registerSubmitBtn() { return $(locators.registerSubmitBtn); }
    get toastSuccessRegister() { return $(locators.toastSuccessRegister); } // <-- Wajib ada getter ini

    // Login Getters
    get loginEmailInput() { return $(locators.loginEmailInput); }
    get loginPasswordInput() { return $(locators.loginPasswordInput); }
    get loginSubmitBtn() { return $(locators.loginSubmitBtn); }
    get toastSuccessLogin() { return $(locators.toastSuccessLogin); }

    // Actions Register
    async navigateToRegister() {
        await actionUtil.waitAndClick(this.goToRegisterBtn);
        await browser.pause(1000);
    }

    async fillRegisterForm(name, email, password) {
        await actionUtil.waitAndSetValue(this.registerNameInput, name);
        await browser.pause(300);
        await actionUtil.waitAndSetValue(this.registerEmailInput, email);
        await browser.pause(300);
        await actionUtil.waitAndSetValue(this.registerPasswordInput, password);
        await browser.pause(300);
    }

    async submitRegister() {
        if (await browser.isKeyboardShown()) {
            await browser.back();
            await browser.pause(500);
        }
        await actionUtil.waitAndClick(this.registerSubmitBtn);
    }

    // Actions Login
    async fillLoginForm(email, password) {
        await actionUtil.waitAndSetValue(this.loginEmailInput, email);
        await browser.pause(500);
        await actionUtil.waitAndSetValue(this.loginPasswordInput, password);
        await browser.pause(500);
    }

    async submitLogin() {
        if (await browser.isKeyboardShown()) {
            await browser.back();
            await browser.pause(500);
        }
        await actionUtil.waitAndClick(this.loginSubmitBtn);
    }
}

module.exports = new AuthPage();