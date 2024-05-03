const puppeteer = require('puppeteer');

async function checkForTableOfContents(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Extract text content from all elements
        const elementsText = await page.evaluate(() => {
            const elements = document.querySelectorAll('*');
            const texts = [];

            elements.forEach(element => {
                const text = element.innerText;
                if (text) {
                    texts.push(text.trim());
                }
            });

            return texts;
        });

        // Convert texts to lowercase for case-insensitive comparison
        const lowerCaseTexts = elementsText.map(text => text.toLowerCase());

        // Check if any text contains the phrase "table of contents"
        const hasTableOfContents = lowerCaseTexts.some(text => text.includes('table of contents'));

        if (hasTableOfContents) {
            console.log('Table of Contents section found on the website.');
        } else {
            console.log('No Table of Contents section found on the website.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}

// Usage example:
//const url = 'https://seocrawl.com/en/how-to-find-a-sitemap/';
const url='https://www.w3.org/TR/WCAG21/';
checkForTableOfContents(url);
