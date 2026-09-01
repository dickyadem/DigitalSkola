class ActionUtil {
    // Helper wait & click
    async waitAndClick(element, timeout = 5000) {
        await element.waitForDisplayed({ timeout });
        await element.click();
    }

    // Helper wait & type text
    async waitAndSetValue(element, value, timeout = 5000) {
        await element.waitForDisplayed({ timeout });
        await element.setValue(value);
    }

    // Helper scroll ke text tertentu (Android)
    async scrollToText(text) {
        return await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${text}"))`);
    }
}

module.exports = new ActionUtil();