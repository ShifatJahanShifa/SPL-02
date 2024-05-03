const puppeteer = require('puppeteer');

async function findTableOfContentsWithLinks(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Navigate to the specified URL
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Define selectors for potential table of contents elements
        const tocSelectors = ['table of contents', 'toc', '#toc', '.toc'];

        let tocElement = null;

        // Find the table of contents element based on selectors
        for (const selector of tocSelectors) {
            const element = await page.$(selector);
            if (element) {
                tocElement = element;
                break;
            }
        }

        if (tocElement) {
            console.log('Table of Contents section found on the webpage.');

            // Extract links within the table of contents element
            const tocLinks = await tocElement.evaluate(() => {
                const links = [];
                const tocItems = document.querySelectorAll('a'); // Assuming links are <a> elements in TOC

                tocItems.forEach(item => {
                    const href = item.href;
                    if (href) {
                        links.push(href);
                    }
                });

                return links;
            });

            if (tocLinks.length > 0) {
                console.log('Links found in the Table of Contents:');
                tocLinks.forEach(link => {
                    console.log(link);
                });
            } else {
                console.log('No links found in the Table of Contents.');
            }
        } else {
            console.log('No Table of Contents section found on the webpage.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}

// Example usage:
const url = 'https://seocrawl.com/en/how-to-find-a-sitemap/'; // Replace with the URL of the webpage to check
findTableOfContentsWithLinks(url);
