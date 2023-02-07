const puppeteer = require('puppeteer');
import { executablePath } from "puppeteer";
require('dotenv').config();
// const user: string = process.env.USERNAME as string;
// const pass: string = process.env.PASS as string;

(async () => {
    const sleep = async () => await new Promise((r) => setTimeout(r, 100));
    const browser = await puppeteer.launch({
        slowMo: 100,
        ignoreHTTPSErrors: true,
        headless: false, executablePath: executablePath(), args: ['--disable-infobars', '--disable-notifications', '--start-maximized', '--disable-blink-features=PasswordGeneration,PasswordManager', '--disable-web-notification-custom-layouts', "--disable-popup-blocking", "--allow-popups-during-page-unload", "--no-sandbox", "--disable-popup-blocking", "--disable-permissions-api", '--enable-automation'], ignoreDefaultArgs: ['--disable-save-password-bubble', '--enable-automation']
    });
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://www.facebook.com', ["geolocation", "midi", "notifications", "camera", "microphone", "background-sync", "ambient-light-sensor", "accelerometer", "gyroscope", "magnetometer", "accessibility-events", "clipboard-read", "clipboard-write", "payment-handler", "idle-detection", "midi-sysex"
    ]);
    const page = await browser.newPage();
    await page.setRequestInterception(false);
    // await page.setJavaScriptEnabled(false);
    await page.setViewport({ width: 1920, height: 1080 });

    page.on('dialog', async (dialog: any) => {
        console.log(dialog.message());
        await dialog.dismiss();
    });

    // Login to Facebook
    await page.goto('https://facebook.com/', { waitUntill: 'documentloaded' });

    await page.type('#email', 'prantaabir856@gmail.com', { delay: 200 });
    await page.waitForTimeout(600);

    await page.type('#pass', 'Pranta@141219', { delay: 400 });

    await sleep();

    await page.click("button[type='submit']");

    await page.waitForNavigation();


    // await page.goto('https://facebook.com/');
    await sleep();

    await page.on('dialog', async (dialog: any) => {
        console.log(dialog.message());
        await dialog.dismiss();
    });
    await sleep();

    // await page.click('#checkpointSubmitButton');

    await page.waitForSelector("What's on your mind, Rcs?")
    await sleep();

})();
