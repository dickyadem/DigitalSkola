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

    async function loginAs(username) {
        await loginPage.login(username);

        if (username === "locked_out_user") {
            const errorMessage = await loginPage.waitForError();
            assert.strictEqual(await errorMessage.isDisplayed(), true);
            return;
        }

        const inventory = await loginPage.waitForInventory();
        assert.strictEqual(await inventory.isDisplayed(), true);
    }

    it("should match the login page visual baseline", async function () {
        await assertVisualMatch(driver, "login-page");
    });
    
    it("should login as standard_user", async function () {
        await loginAs("standard_user");
    });

    it("should reject locked_out_user", async function () {
        await loginAs("locked_out_user");
    });

    it("should login as problem_user", async function () {
        await loginAs("problem_user");
    });

    it("should login as performance_glitch_user", async function () {
        await loginAs("performance_glitch_user");
    });

    it("should login as error_user", async function () {
        await loginAs("error_user");
    });

    it("should login as visual_user", async function () {
        await loginAs("visual_user");
    });
});
