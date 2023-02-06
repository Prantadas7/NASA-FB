const puppeteer = require('puppeteer');
import { executablePath } from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({
        slowMo: 100,
        headless: false, executablePath: executablePath(), args: ['--disable-infobars', '--start-maximized', '--disable-blink-features=PasswordGeneration,PasswordManager'], ignoreDefaultArgs: ['--enable-automation']
    });
    const page = await browser.newPage();

    page.on('dialog', async (dialog: any) => {
        await dialog.dismiss();
    });


    await page.setViewport({ width: 1920, height: 1080 });

    // Login to Facebook
    await page.goto('https://facebook.com/');
    await page.type('#email', 'pranta_das@coredevs.ltd');
    await page.type('#pass', 'Abir@141219');
    await new Promise((r) => setTimeout(r, 100));
    await page.click("button[type='submit']");
    await page.waitForNavigation();
    await new Promise((r) => setTimeout(r, 100));

    await page.goto('https://facebook.com/');
    await new Promise((r) => setTimeout(r, 100));
    await page.on('dialog', async (dialog: any) => {
        await dialog.dismiss();
    });
    await new Promise((r) => setTimeout(r, 100));
    const [button] = await page.$x("//button[contains(., 'Photo/video')]");
    if (button) {
        await button.click();
    }

    // if (element) { console.log(true) }    // Post a picture every 24 hours
    // setInterval(async () => {
    //     // Go to your profile
    //     // await page.goto('https://www.facebook.com/profile.php?id=100089928259018');

    //     // Click on the "Create Post" button
    //     await page.click('[data-testid="status-attachment-add-photo-video-button"]');

    //     // Select the picture to be posted
    //     const fileInput = await page.$('input[type="file"]');
    //     await fileInput.uploadFile('<YOUR_PICTURE_FILE_NAME>.jpg');

    //     // Add a caption to the picture
    //     await page.type('[data-testid="status-attachment-mentions-input"]', '<YOUR_CAPTION>');

    //     // Post the picture
    //     await page.click('[data-testid="react-composer-post-button"]');
    //     await page.waitFor(2000);
    // }, 24 * 60 * 60 * 1000);
})();
