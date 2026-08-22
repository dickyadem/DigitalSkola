const assert = require("node:assert");
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

describe("SauceDemo Login", function () {
  this.timeout(30000);

  let driver;

  before(async function () {
    const options = new chrome.Options()
  .addArguments(
    "--headless",
    "--incognito",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-background-networking",   // matikan koneksi latar belakang (termasuk GCM)
    "--disable-component-update",        // matikan update komponen
    "--disable-sync",                    // matikan sinkronisasi
    "--no-first-run",                    // tidak ada first run
    "--disable-default-apps",            // matikan aplikasi bawaan
    "--disable-extensions",              // matikan ekstensi
    "--disable-notifications",           // matikan notifikasi push
    "--log-level=3",                     // hanya tampilkan error fatal
    "--silent"                           // mode senyap (opsional)
  )
  .setLoggingPrefs({ browser: 'OFF' });  // matikan log browser Selenium
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  });

  beforeEach(async function () {
    await driver.manage().deleteAllCookies();
    await driver.get("https://www.saucedemo.com/");
    await driver.executeScript(
      "window.localStorage.clear(); window.sessionStorage.clear();",
    );
    await driver.get("https://www.saucedemo.com/");
  });

  after(async function () {
    await driver.quit();
  });

  async function loginAs(username) {
      const usernameInput = await driver.wait(
        until.elementLocated(By.id("user-name")),
        10000,
      );
      const passwordInput = await driver.wait(
        until.elementLocated(By.id("password")),
        10000,
      );
      const loginButton = await driver.wait(
        until.elementLocated(By.id("login-button")),
        10000,
      );

      await usernameInput.sendKeys(username);
      await passwordInput.sendKeys("secret_sauce");
      await loginButton.click();

      if (username === "locked_out_user") {
        const errorMessage = await driver.wait(
          until.elementLocated(By.css('[data-test="error"]')),
          10000,
        );
        assert.strictEqual(await errorMessage.isDisplayed(), true);
      } else {
        const inventory = await driver.wait(
          until.elementLocated(By.id("inventory_container")),
          15000,
        );
        assert.strictEqual(await inventory.isDisplayed(), true);
      }
  }

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
