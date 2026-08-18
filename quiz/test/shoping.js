const assert = require("node:assert");
const { Builder, By, until } = require("selenium-webdriver");

describe("Belajar Bareng Shopping", function () {
  this.timeout(20000);

  it("should login and shop successfully", async function () {
    const driver = await new Builder().forBrowser("chrome").build();

    try {
      await driver.get("https://belajar-bareng.onrender.com/");

      const usernameInput = await driver.wait(
        until.elementLocated(By.css('[data-testid="username-input"]')),
        10000,
      );
      const passwordInput = await driver.wait(
        until.elementLocated(By.css('[data-testid="password-input"]')),
        10000,
      );
      const loginButton = await driver.wait(
        until.elementLocated(By.css('[data-testid="login-button"]')),
        10000,
      );

      await usernameInput.clear();
      await usernameInput.sendKeys("admin");

      await passwordInput.clear();
      await passwordInput.sendKeys("admin");

      await loginButton.click();

      const shopButton = await driver.wait(
        until.elementLocated(By.css('[data-testid="shop-button"]')),
        10000,
      );
      assert.strictEqual(await shopButton.isDisplayed(), true);
      await shopButton.click();

      const addToCartButton = await driver.wait(
        until.elementLocated(By.css('[data-testid="add-to-cart-1"]')),
        10000,
      );
      assert.strictEqual(await addToCartButton.isDisplayed(), true);
      await addToCartButton.click();

      const cartButton = await driver.wait(
        until.elementLocated(By.css('[data-testid="cart-button"]')),
        10000,
      );
      assert.strictEqual(await cartButton.isDisplayed(), true);
      await cartButton.click();

      const checkoutButton = await driver.wait(
        until.elementLocated(By.css('[data-testid="checkout-button"]')),
        10000,
      );
      assert.strictEqual(await checkoutButton.isDisplayed(), true);
      await checkoutButton.click();

      const checkoutName = await driver.wait(
        until.elementLocated(By.css('[data-testid="checkout-name"]')),
        10000,
      );
      const checkoutEmail = await driver.wait(
        until.elementLocated(By.css('[data-testid="checkout-email"]')),
        10000,
      );
      const checkoutAddress = await driver.wait(
        until.elementLocated(By.css('[data-testid="checkout-address"]')),
        10000,
      );
      const checkoutCaptcha = await driver.wait(
        until.elementLocated(By.css('[data-testid="checkout-captcha"]')),
        10000,
      );
      const captchaQuestion = await driver.wait(
        until.elementLocated(By.css('[data-testid="captcha-question"]')),
        10000,
      );
      const captchaText = await captchaQuestion.getText();
      const captchaMatch = captchaText.match(/(\d+)\s*\+\s*(\d+)/);
      const captchaAnswer = captchaMatch
        ? String(Number(captchaMatch[1]) + Number(captchaMatch[2]))
        : "18";
      const tncLink = await driver.wait(
        until.elementLocated(By.css('[data-testid="tnc-link"]')),
        10000,
      );
      const tncCheckbox = await driver.wait(
        until.elementLocated(By.css('[data-testid="tnc-checkbox"]')),
        10000,
      );
    
      const submitCheckout = await driver.wait(
        until.elementLocated(By.css('[data-testid="submit-checkout"]')),
        10000,
      );

    await checkoutName.clear();
await checkoutName.sendKeys("ade");
await checkoutEmail.clear();
await checkoutEmail.sendKeys("ade@example.com");
await checkoutAddress.clear();
await checkoutAddress.sendKeys("Jl. Testing 1");
await checkoutCaptcha.clear();
await checkoutCaptcha.sendKeys(captchaAnswer);

await tncLink.click();

const tncOkButton = await driver.wait(
  until.elementLocated(By.css('[data-testid="tnc-ok-button"]')),
  10000,
);
await driver.wait(until.elementIsVisible(tncOkButton), 10000);

await driver.executeScript("arguments[0].click();", tncCheckbox);
await tncOkButton.click();
await submitCheckout.click();

      assert.strictEqual(await submitCheckout.isDisplayed(), true);
    } finally {
    //   await driver.quit();
    }
  });
});
