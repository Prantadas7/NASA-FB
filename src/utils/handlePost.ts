const puppeteer = require('puppeteer');
import { executablePath } from "puppeteer";
require('dotenv').config();
const path = require('path');
import variableConfig from "../variable.config";
const sleep = async () => await new Promise((r) => setTimeout(r, 100));


const handlePost = async (data: any) => {
    const options = {
        waitUntil: 'networkidle2',
        timeout: 30000,
    };
    const browser = await puppeteer.launch({
        slowMo: 200,
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
    try {

        const page = await browser.newPage();
        await page.setRequestInterception(false);
        await page.setViewport({ width: 1920, height: 1080 });

        await page.setDefaultNavigationTimeout(0);

        page.on('dialog', async (dialog: any) => {
            console.log(dialog.message());
            await dialog.dismiss();
        });

        // Login to Facebook
        await page.goto('https://facebook.com/', options);

        await sleep();

        await page.type('#email', variableConfig?.username, { delay: 200 });

        await sleep();

        await page.type('#pass', variableConfig.pass, { delay: 200 });

        await sleep();

        await page.click("button[type='submit']");

        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });

        await sleep();

        (await page.$x('(//span[contains(text(), "What\'s on your mind")])'))[0].click();

        await sleep();

        await page.waitForSelector('[aria-label="Photo/video"]');

        await sleep();

        await page.click('[aria-label="Photo/video"]');

        await sleep();

        const input = await page.$x('//div/input[@type="file"]');
        if (input.length > 0) {
            await input[0].uploadFile(path.resolve() + '/asset/resized.jpg');
        }

        await sleep();

        const elem = await page.$('div[role="textbox"]');

        await elem.type(`#NASA_PICTURE_OF_THE_DAY \nBrought to you by a BOT \nDate: ${data.data.date} \nDescription:${data.data.explanation} `, { delay: 200 });

        await sleep();

        await page.waitForSelector('[aria-label="Post"]');

        await page.click('[aria-label="Post"]');

        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });

        console.log('Successfully posted!')
    }
    catch (e) {
        console.log(e);
        await browser.close();
    }

    finally {
        await sleep();
        await browser.close();
    }
};


module.exports = { handlePost };
