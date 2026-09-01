const loginPage = require('../page/login.page');

describe("My Demo App - Login Test", () => {

    after(async () => {
        await browser.terminateApp('com.saucelabs.mydemoapp.android');
    });

    it("should login successfully using POM & Utilities", async () => {
        await loginPage.openLoginForm();
        await loginPage.fillCredentials('bod@example.com', '10203040');
        await loginPage.clickTapToLogin();

        await browser.pause(3000);
    });

});