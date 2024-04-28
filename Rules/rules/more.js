const puppeteer = require('puppeteer');

async function checkDefaultEventOverrides(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        console.log(url);
        await page.goto(url, { waitUntil: 'networkidle2' }); // Use 'networkidle2' instead of 'domcontentloaded'

        console.log('hereee');
        const overriddenElements = await page.evaluate(() => {
            console.log('hereee');
            const overriddenElements = [];
            const allElements = document.querySelectorAll('a, button');
            console.log('Total elements:', allElements.length); // Check if elements are found
            console.log('Elements:', allElements); // Log the elements

            allElements.forEach(element => {
                ['mousedown', 'click'].forEach(eventType => {
                    const eventListener = element.events && element.events[eventType];
                    console.log(eventListener);
                    console.log();
                    if (eventListener && eventListener.length > 0) {
                        overriddenElements.push({
                            tagName: element.tagName.toLowerCase(),
                            id: element.id || '',
                            className: element.className || '',
                            eventType: eventType
                        });
                    }
                });
            });

            return overriddenElements;
        });

        if (overriddenElements.length > 0) {
            console.log('Elements with overridden default events:');
            overriddenElements.forEach(element => {
                console.log(`- TagName: ${element.tagName}`);
                console.log(`- ID: ${element.id || 'N/A'}`);
                console.log(`- Class: ${element.className || 'N/A'}`);
                console.log(`- Event Type: ${element.eventType}`);
            });
        } else {
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
