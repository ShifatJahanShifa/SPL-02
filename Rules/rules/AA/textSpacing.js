const puppeteer = require('puppeteer');

async function extractLineHeights(url) {
    const browser = await puppeteer.launch({ timeout: 60000 }); // Increase timeout
    const page = await browser.newPage();

    try {
        const navigationPromise = page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 });

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

        await navigationPromise;

        // Evaluate line-height for all elements on the page
        const lineHeightsMap = {};
        const letterSpacingMap = {};
        const wordSpacingMap = {};

        const allElements = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('*'));

            return elements.map(el => ({
                tagName: el.tagName.toLowerCase(),
                id: el.id,
                className: el.className,
                lineHeight: window.getComputedStyle(el).getPropertyValue('line-height'),
                letterSpacing: window.getComputedStyle(el).getPropertyValue('letter-spacing'),
                wordSpacing: window.getComputedStyle(el).getPropertyValue('word-spacing')
            }));
        });

        // Organize line-height data into a map
        allElements.forEach(({ tagName, id, className, lineHeight, letterSpacing, wordSpacing }) => {
            const key = `${tagName}#${id}.${className}`.replace(/\s+/g, ''); // Combine tag, id, and class

            // Define thresholds for filtering
            const lineHeightThreshold = '1.5px';
            const letterSpacingThreshold = '0.12px';
            const wordSpacingThreshold = '0.16px';

            // Check conditions to populate maps
            if (lineHeight && lineHeight.trim() < lineHeightThreshold) {
                lineHeightsMap[key] = lineHeight.trim();
            }

            if (letterSpacing && letterSpacing.trim() < letterSpacingThreshold) {
                letterSpacingMap[key] = letterSpacing.trim();
            }

            if (wordSpacing && wordSpacing.trim() < wordSpacingThreshold) {
                wordSpacingMap[key] = wordSpacing.trim();
            }
        });

        return { lineHeightsMap, letterSpacingMap, wordSpacingMap };
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw error to propagate it to the caller
    } finally {
        await browser.close();
    }
}

const url = 'http://www.iit.du.ac.bd/';

// Usage of extractLineHeights function to retrieve and filter line heights, letter spacing, and word spacing
extractLineHeights(url)
    .then(({ lineHeightsMap, letterSpacingMap, wordSpacingMap }) => {
        console.log('Line Heights Map:');
        console.log(lineHeightsMap);

        console.log('Letter Spacing Map:');
        console.log(letterSpacingMap);

        console.log('Word Spacing Map:');
        console.log(wordSpacingMap);
    })
    .catch(error => {
        console.error('Error:', error);
    });
