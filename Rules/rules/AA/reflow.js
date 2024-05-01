const puppeteer = require('puppeteer');

async function checkScrolling(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const pageWidth = await page.evaluate(() => document.body.scrollWidth);
        const pageHeight = await page.evaluate(() => document.body.scrollHeight);
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        const viewportHeight = await page.evaluate(() => window.innerHeight);

        const hasHorizontalScroll = pageWidth > viewportWidth;
        const hasVerticalScroll = pageHeight > viewportHeight;

        if (!hasHorizontalScroll && !hasVerticalScroll) {
            console.log('All content and functionality is available without scrolling.');
        } else {
            if (hasHorizontalScroll) {
                console.log('Content or functionality requires horizontal scrolling.');

                const horizontalScrollingElements = await page.evaluate(() => {
                    const elements = Array.from(document.querySelectorAll('*'));
                    const scrollingElements = elements.filter(element => {
                        const elementWidth = element.scrollWidth;
                        const elementVisibleWidth = element.clientWidth;
                        return elementWidth > elementVisibleWidth;
                    });
                    return scrollingElements.map(element => ({
                        tagName: element.tagName,
                        className: element.className,
                        id: element.id,
                        textContent: element.innerText.trim()
                    }));
                });

                console.log('Elements requiring horizontal scrolling:');
                horizontalScrollingElements.forEach(element => {
                    console.log(`- TagName: ${element.tagName}`);
                    console.log(`- ID: ${element.id || 'N/A'}`);
                    console.log(`- Class: ${element.className || 'N/A'}`);
                    //console.log(`- Text: ${element.textContent}`);
                    console.log();
                });
            }
            if (hasVerticalScroll) {
                console.log('Content or functionality requires vertical scrolling.');

                // Gather elements causing vertical scrolling
                const verticalScrollingElements = await page.evaluate(() => {
                    const elements = Array.from(document.querySelectorAll('*'));
                    const scrollingElements = elements.filter(element => {
                        const elementHeight = element.scrollHeight;
                        const elementVisibleHeight = element.clientHeight;
                        return elementHeight > elementVisibleHeight;
                    });
                    return scrollingElements.map(element => ({
                        tagName: element.tagName,
                        className: element.className,
                        id: element.id,
                        textContent: element.innerText.trim()
                    }));
                });

                console.log('Elements requiring vertical scrolling:');
                verticalScrollingElements.forEach(element => {
                    console.log(`- TagName: ${element.tagName}`);
                    console.log(`- ID: ${element.id || 'N/A'}`);
                    console.log(`- Class: ${element.className || 'N/A'}`);
                    //console.log(`- Text: ${element.textContent}`);
                    console.log();
                });
            }
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}

// Usage example:
const url = 'http://www.iit.du.ac.bd'; // Replace with the URL of the webpage you want to check
checkScrolling(url);
