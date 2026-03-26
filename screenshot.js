const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const machines = ['M001', 'M002', 'M003', 'M004', 'M005'];

    for (let m of machines) {
        await page.goto(`http://localhost:3000/exercise.html?machine=${m}`, { waitUntil: 'networkidle2' });
        // wait for AR/A-frame to load
        await page.waitForTimeout(3000); 
        await page.screenshot({ path: `${m}_screenshot.png`, fullPage: false });
        console.log(`Saved ${m}_screenshot.png`);
    }

    await browser.close();
})();
