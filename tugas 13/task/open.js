describe("My Demo App", () => {
after(async () => {
await browser.terminateApp('com.example.belajar_bareng');
});
it("should have the right title", async () => {
    console.log("open test successful");
    await browser.pause(3000);
  }) 

})