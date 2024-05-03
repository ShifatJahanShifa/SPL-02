const puppeteer = require('puppeteer');

async function extractButtonAndInputValues(url) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
  
        const buttonValues = await page.evaluate(() => {
            const buttonElements = Array.from(document.querySelectorAll('button[type="submit"]'));
            const inputElements = Array.from(document.querySelectorAll('input[type="submit"]'));
            const values = [];
            
            buttonElements.forEach(button => {
                const tagName = button.tagName.toLowerCase();
                const id = button.id || 'N/A';
                const className = button.className || 'N/A';
                const innerText = button.innerText.trim();
                values.push({ tagName, id, className, text: innerText });
            });

            inputElements.forEach(input => {
                const tagName = input.tagName.toLowerCase();
                const id = input.id || 'N/A';
                const className = input.className || 'N/A';
                const value = input.value || 'Submit';
                values.push({ tagName, id, className, text: value });
            });

            return values;
        });

        // Check for differing inner text values
        const uniqueValues = new Set(buttonValues.map(value => value.text));
        if (uniqueValues.size > 1) {
            console.log('Different inner texts found:');
            buttonValues.forEach(({ tagName, id, className, text }) => {
                console.log(`- TagName: ${tagName}`);
                console.log(`- ID: ${id}`);
                console.log(`- Class: ${className}`);
                console.log(`- Text: ${text}`);
                console.log('');
            });
        } 
        else {
            console.log('All inner texts are the same.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}

const url='http://www.iit.du.ac.bd/';
const url1='https://codeforces.com/settings/social';
extractButtonAndInputValues(url1);


//const url='http://cocom/settings/social/';
//checkSkipLink(url1);

//https://codeforces.com/settings/social