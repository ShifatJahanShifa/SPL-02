const puppeteer = require('puppeteer');
const fs=require('fs');

async function getSourceCode(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        const sourceCode = await page.content();
        const filePath='SPL-02/Rules/rules/check/source.html';
        fs.writeFileSync(filePath, sourceCode);
        //return sourceCode;
    } catch (error) {
        console.error('Error:', error);
        return null;
    } finally {
        await browser.close();
    }
}

// Example usage:
const url = 'https://www.amazon.com/';
getSourceCode(url).then(sourceCode => {
    //console.log('Source Code:', sourceCode);
});
