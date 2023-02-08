const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.facebook.com');

    // Login to Facebook
    await page.type('#email', 'prantaabir856@gmail.com');
    await page.type('#pass', 'Pranta@141219');
    await page.click('#loginbutton');
    await page.waitForNavigation();

    // Click on the "What's on your mind?" button
    await page.click("[data-testid='status-attachment-mentions-input']");

    // Select the photo upload icon
    const input = await page.$("input[type='file']");
    await input.uploadFile("/asset/0x0.png");

    // Wait for the upload to finish and post the photo
    await page.waitForSelector("[data-testid='media-attachment-release-button']", { visible: true });
    await page.click("[data-testid='media-attachment-release-button']");
})();
