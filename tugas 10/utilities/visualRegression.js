const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const pixelmatchModule = require("pixelmatch");
const { PNG } = require("pngjs");

const pixelmatch = pixelmatchModule.default || pixelmatchModule;
const screenshotRootDir = path.join(__dirname, "..", "screenshots");
const baselineDir = path.join(screenshotRootDir, "baseline");
const currentDir = path.join(screenshotRootDir, "current");
const diffDir = path.join(screenshotRootDir, "diff");

async function assertVisualMatch(driver, name) {
  fs.mkdirSync(baselineDir, { recursive: true });
  fs.mkdirSync(currentDir, { recursive: true });
  fs.mkdirSync(diffDir, { recursive: true });

  const screenshot = Buffer.from(await driver.takeScreenshot(), "base64");
  const actual = PNG.sync.read(screenshot);
  const viewportName = `${name}-${actual.width}x${actual.height}`;
  const actualPath = path.join(currentDir, `${viewportName}.png`);
  const baselinePath = path.join(baselineDir, `${viewportName}.png`);
  fs.writeFileSync(actualPath, screenshot);

  if (!fs.existsSync(baselinePath)) {
    fs.writeFileSync(baselinePath, screenshot);
    return;
  }

  const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
  assert.strictEqual(actual.width, baseline.width, "Visual width changed");
  assert.strictEqual(actual.height, baseline.height, "Visual height changed");

  const diff = new PNG({ width: actual.width, height: actual.height });
  const mismatchedPixels = pixelmatch(
    baseline.data,
    actual.data,
    diff.data,
    actual.width,
    actual.height,
    { threshold: 0.1 },
  );
  fs.writeFileSync(
    path.join(diffDir, `${viewportName}.png`),
    PNG.sync.write(diff),
  );

  const mismatchRatio = mismatchedPixels / (actual.width * actual.height);
  const matchPercentage = (1 - mismatchRatio) * 100;
  assert.ok(
    matchPercentage >= 90,
    `Visual regression detected: ${matchPercentage.toFixed(2)}% match`,
  );
}

module.exports = { assertVisualMatch };
