const puppeteer = require('puppeteer');

async function checkLabelsHaveText(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        //await page.goto(url, { waitUntil: 'domcontentloaded' });
        await page.setContent(url, { waitUntil: 'domcontentloaded' });

        // Evaluate the page to find all label elements
        const labelsWithText = [];
        const labelsWithoutText = {};

        const labelElements = await page.evaluate(() => {
            const labels = Array.from(document.querySelectorAll('label'));
            return labels.map(label => ({
                tagName: label.tagName.toLowerCase(),
                id: label.id || '',
                className: label.className || '',
                textContent: label.innerText.trim()
            }));
        });

        // Check each label's text content
        labelElements.forEach(label => {
            const { tagName, id, className, textContent } = label;
            const key = `${tagName}#${id}.${className}`.replace(/\s+/g, ''); // Create a unique key for the object

            if (!textContent) {
                if (!labelsWithoutText[key]) {
                    labelsWithoutText[key] = [];
                }
                labelsWithoutText[key].push(label);
            } else {
                labelsWithText.push(label);
            }
        });

        // Log labels without text
        if (Object.keys(labelsWithoutText).length > 0) {
            console.log('Labels without text content:');
            Object.entries(labelsWithoutText).forEach(([key, labels]) => {
                console.log(`- Key: ${key}`);
                labels.forEach(label => {
                    console.log(`  - Tag Name: ${label.tagName}`);
                    console.log(`  - ID: ${label.id || 'N/A'}`);
                    console.log(`  - Class Name: ${label.className || 'N/A'}`);
                });
            });
        } else {
            console.log('All label elements contain text content.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}

// Usage example:
const url = 'SPL-02/Rules/rules/doit/dekhi.html'; // Replace with the URL of the webpage you want to check
checkLabelsHaveText(url);
