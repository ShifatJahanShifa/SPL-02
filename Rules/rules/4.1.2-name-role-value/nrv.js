const puppeteer = require('puppeteer');

async function extractLinks(url) {
    const browser = await puppeteer.launch({timeout: 0});
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Extract all <a> elements from the page
        const links = await page.evaluate(() => {
            const linkElements = Array.from(document.querySelectorAll('a'));
            const linkData = [];

            linkElements.forEach(link => {
                const linkText = link.textContent.trim();
                const hasTitleAttribute = link.hasAttribute('title');

                // Check conditions for storing in map
                if (!linkText && !hasTitleAttribute) {
                    const key = `${link.tagName}.${link.id || ''}.${link.className || ''}`;
                    linkData.push({
                        key,
                        tagName: link.tagName,
                        id: link.id || null,
                        className: link.className || null,
                        href: link.href || null,
                        title: link.getAttribute('title') || null
                    });
                }
            });

            return linkData;
        });

        
        if (links.length > 0) {
            console.log('Links with missing link text and title attribute:');
            links.forEach(link => {
                console.log(`Key: ${link.key}`);
                console.log(`Tag Name: ${link.tagName}`);
                console.log(`ID: ${link.id}`);
                console.log(`Class Name: ${link.className}`);
                console.log(`Href: ${link.href}`);
                console.log(`Title: ${link.title}`);
                console.log('---');
            });
        } 
        else {
            console.log('No links found with missing link text and title attribute.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}

// Usage example:
const url = 'http://www.iit.du.ac.bd/'; // Replace with the URL of the webpage you want to check
extractLinks(url);
