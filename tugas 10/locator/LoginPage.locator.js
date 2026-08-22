const LoginPageLocator = {
  usernameInput: "#user-name",
  passwordInput: "#password",
  loginButton: "#login-button",
  errorMessage: '[data-test="error"]',
  inventory: "#inventory_container",
};

const UrlLocator = {
  loginPage: "https://www.saucedemo.com/",
};

module.exports = { LoginPageLocator, UrlLocator };
