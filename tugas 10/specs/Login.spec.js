const assert = require("node:assert");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const LoginPage = require("../page/LoginPage");
const { assertVisualMatch } = require("../utilities/visualRegression");

describe("SauceDemo Login", function () {
    this.timeout(30000);

    let driver;
    let loginPage;

    before(async function () {
        const options = new chrome.Options().addArguments(
            //   "--headless",
            "--start-fullscreen",
            "--incognito",
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--disable-background-networking",
            "--disable-component-update",
            "--disable-sync",
            "--no-first-run",
            "--disable-default-apps",
            "--disable-extensions",
            "--disable-notifications",
            "--log-level=3",
            "--silent",
        );

        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();
        loginPage = new LoginPage(driver);
    });

    beforeEach(async function () {
        await driver.manage().deleteAllCookies();
        await loginPage.open();
        await driver.executeScript(
            "window.localStorage.clear(); window.sessionStorage.clear();",
        );
        await loginPage.open();
    });

    after(async function () {
        await driver.quit();
    });

    it("should login as standard_user", async function () {
        await loginPage.login("standard_user");
        const inventory = await loginPage.waitForInventory();

        assert.strictEqual(await inventory.isDisplayed(), true);
        await assertVisualMatch(driver, "positive-login");
    });

    it("should reject an invalid username", async function () {
        await loginPage.login("invalid_user");
        const errorMessage = await loginPage.waitForError();

        assert.strictEqual(await errorMessage.isDisplayed(), true);
        await assertVisualMatch(driver, "invalid-username-login");
    });
});
