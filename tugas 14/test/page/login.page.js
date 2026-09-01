const locators = require('../locators/login.locator');
const actionUtil = require('../utils/action.util');

class LoginPage {
    get menuBtn() { return $(locators.viewMenuBtn); }
    get emailInput() { return $(locators.emailInput); }
    get passwordInput() { return $(locators.passwordInput); }
    get tapToLoginBtn() { return $(locators.tapToLoginBtn); }

    async openLoginForm() {
        await actionUtil.waitAndClick(this.menuBtn, 10000);
        await browser.pause(1000);

        // Pakai utility scroll
        const loginMenuItem = await actionUtil.scrollToText('Log In');
        await actionUtil.waitAndClick(loginMenuItem);
    }

    async fillCredentials(email, password) {
        await actionUtil.waitAndSetValue(this.emailInput, email);
        await actionUtil.waitAndSetValue(this.passwordInput, password);
    }

    async clickTapToLogin() {
        await actionUtil.waitAndClick(this.tapToLoginBtn);
    }
}

module.exports = new LoginPage();