const puppeteer = require('puppeteer');
const langdetect = require('langdetect');

async function checkLanguageConsistency(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const pageLanguage = await page.evaluate(() => {
            return document.documentElement.lang || 'en'; 
        });

        console.log(`Language specified for the entire page: ${pageLanguage}`);

        // Find all elements containing text
        const textElements = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('p, span, div, a, h1, h2, h3, h4, h5, h6'));
            return elements.map(element => ({
                text: element.innerText.trim(),
                tagName: element.tagName.toLowerCase(),
                id: element.id || '',
                className: element.className || ''
            }));
        });

        const mismatchedElementsMap = new Map();

        // Check language consistency for each text element
        for (const element of textElements) {
            const { text, tagName, id, className } = element;
            // Skip elements with no text
            if (!text) continue;

            try {
                const detectedLanguage = langdetect.detectOne(text);
                if (detectedLanguage && detectedLanguage !== pageLanguage) {
                    const key = `${tagName}#${id}.${className}`.replace(/\s+/g, ''); // Create a unique key for the map
                    if (!mismatchedElementsMap.has(key)) {
                        mismatchedElementsMap.set(key, {
                            tagName,
                            id,
                            className,
                            mismatchedTexts: []
                        });
                    }
                    mismatchedElementsMap.get(key).mismatchedTexts.push({ text, detectedLanguage });
                }
            } catch (error) {
                console.error('Error detecting language:', error);
            }
        }

        if (mismatchedElementsMap.size > 0) {
            console.log('Elements with mismatched language detected:');
            mismatchedElementsMap.forEach((elementInfo, key) => {
                console.log(`Element Key: ${key}`);
                console.log(`- Tag Name: ${elementInfo.tagName}`);
                console.log(`- ID: ${elementInfo.id || 'N/A'}`);
                console.log(`- Class Name: ${elementInfo.className || 'N/A'}`);
                console.log('- Mismatched Texts:');
                elementInfo.mismatchedTexts.forEach(mismatch => {
                    console.log(`  - Text: ${mismatch.text}`);
                    console.log(`    Detected Language: ${mismatch.detectedLanguage}`);
                });
                console.log(''); // Line break for clarity
            });
        } else {
            console.log('No elements with mismatched language found.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}

// Usage example:
const url = 'https://www.shafaetsplanet.com/';
checkLanguageConsistency(url);
