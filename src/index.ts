const puppeteer = require('puppeteer');
import { executablePath } from "puppeteer";
require('dotenv').config();


(async () => {
    const sleep = async () => await new Promise((r) => setTimeout(r, 100));
    const browser = await puppeteer.launch({
        slowMo: 100,
        ignoreHTTPSErrors: true,
        headless: false, executablePath: executablePath(), ignoreDefaultArgs: ['--disable-save-password-bubble'], args:
            [
                '--disable-infobars',
                '--disable-web-notification-custom-layouts',
                "--allow-popups-during-page-unload",
                "--no-sandbox",
                "--disable-popup-blocking",
                "--disable-permissions-api",
                '--start-maximized',
                '--disable-blink-features=PasswordGeneration,PasswordManager',
                '--disable-notifications',
                '--disable-save-password-bubble',

            ],
        // ignoreDefaultArgs: ['--enable-automation']
    });
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(
        'https://www.facebook.com', [
        "geolocation", "midi", "notifications", "camera", "microphone", "background-sync", "ambient-light-sensor", "accelerometer", "gyroscope", "magnetometer", "accessibility-events", "clipboard-read", "clipboard-write", "payment-handler", "idle-detection", "midi-sysex"
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

    await page.type('#pass', 'Pranta@141219', { delay: 200 });

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

    (await page.$x('(//span[contains(text(), "What\'s on your mind")])'))[0].click();

    await sleep();

    await page.click('div[aria-label="Photo/Video"]')
    // (await page.$x('//*[@id="mount_0_0_6A"]/div[1]/div[1]/div/div[4]/div/div/div[1]/div/div[2]/div/div/div/form/div/div[1]/div/div/div/div[3]/div[1]/div[2]/div/div[1]/div/div/span/div/div/div[1]/div/div/div[1]/i')).click();
    // (await page.$x('//div/i'))[17].click();



    // (await page.$x('//div/i'))[17].click();
    // console.log(btn)
    // await page.($x('//span[contains(text(), "What\'s on your mind")]'))

    // await btn.click();
    // await page.click('#checkpointSubmitButton');


    await sleep();

})();
