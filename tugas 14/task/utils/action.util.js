class ActionUtil {
    async hideKeyboard() {
        if (await browser.isKeyboardShown()) {
            await browser.execute('mobile: performEditorAction', { action: 'done' });
            await browser.pause(500);
        }
    }

    async waitAndClick(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
        await element.click();
    }

    async waitAndSetValue(element, value, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
        await element.click();
        await element.setValue(value);
    }
}

module.exports = new ActionUtil();