describe("My Demo App", () => {
after(async () => {
await browser.terminateApp('com.saucelabs.mydemoapp.android');
});
it("should have the right title", async () => {
    console.log("open test successful");
    await browser.pause(3000);
  }) 

})