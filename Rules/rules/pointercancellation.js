const puppeteer = require('puppeteer');

async function checkDefaultEventOverrides(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        let enter=0;
        const overriddenElements = await page.evaluate(() => {
            const overriddenElements = [];
            const allElements = Array.from(document.querySelectorAll('marquee'));
            if(allElements.length!=0) enter=1;

            allElements.forEach(element => {
                enter=1;
                if (element.getAttribute('onmouseover}')) {
                    elementsWithEvent.push({
                        tagName: element.tagName.toLowerCase(),
                        id: element.id || '',
                        className: element.className || '',
                        eventType: eventType
                    });
                }
            });

            return overriddenElements;
        });

        if (overriddenElements.length > 0) 
        {
            console.log('Elements with overridden default events:');
            overriddenElements.forEach(element => {
                console.log(`- TagName: ${element.tagName}`);
                console.log(`- ID: ${element.id || 'N/A'}`);
                console.log(`- Class: ${element.className || 'N/A'}`);
                console.log(`- Event Type: ${element.eventType}`);
            });
        } 
        else 
        {
            console.log(enter);
            console.log('No elements with overridden default events found.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}

// Usage example:
const url = 'http://www.iit.du.ac.bd'; // Replace with the URL of the webpage you want to check
//const url='https://seocrawl.com/en/how-to-find-a-sitemap/';
checkDefaultEventOverrides(url);
