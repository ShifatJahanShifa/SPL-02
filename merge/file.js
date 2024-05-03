const puppeteer = require('puppeteer');
const fs=require('fs');
const { get } = require('https');
const axios=require('axios');

// async function getSourceCode(url) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     try {
//         await page.goto(url, { waitUntil: 'domcontentloaded' });
//         const sourceCode = await page.content();
//         const filePath='SPL-02/merge/sourcecode.html';
//         fs.writeFileSync(filePath, sourceCode);
//         //return sourceCode;
//     } catch (error) {
//         console.error('Error:', error);
//         return null;
//     } finally {
//         await browser.close();
//     }
// }

async function getSourceCode(url)
{
    try
    {
        const response = await axios.get(url);
        const htmlContent = response.data;
        const filePath='SPL-02/merge/sourcecode.html';
        fs.writeFileSync(filePath, htmlContent);
    }
    catch(error)
    {
        console.error("error downloading ...");
    }
}
// Example usage:
const url = 'http://www.iit.du.ac.bd/';
getSourceCode(url);
// getSourceCode(url).then(sourceCode => {
//     //console.log('Source Code:', sourceCode);
// });
