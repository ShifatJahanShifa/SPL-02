const fs = require('fs');
const cheerio = require('cheerio');

function checkDeviceOrientation(html) {
    try {
        // Load the HTML content into Cheerio for easy DOM manipulation
        const $ = cheerio.load(html);

        // Define an array to store the elements and messages related to device orientation
        const elementsToCheck = [
            { selector: '.rotate', message: 'Message asking to reorient device' },
            { selector: '.content', message: 'Content to be displayed after reorientation' },
            { selector: '.landscape', message: 'Content restricted to landscape orientation' },
            { selector: '.portrait', message: 'Content restricted to portrait orientation' },
            { selector: '.orientation-control', message: 'Control to allow changing orientation' },
            { selector: '.orientation-failure', message: 'Failure due to orientation restriction' },
            { selector: '.orientation-failure-message', message: 'Message asking to reorient device (failure)' },
            { selector: '.reorientation-info', message: 'Information about reorientation' },
            { selector: '.orientation-alert', message: 'Alert about orientation restriction' },
            { selector: '.orientation-warning', message: 'Warning about orientation restriction' },
            { selector: '.orientation-error', message: 'Error due to orientation restriction' },
        ];
        
        // Loop through each element and message to check their presence
        elementsToCheck.forEach(({ selector, message }) => {
            const element = $(selector);
            if (element.length > 0) {
                console.log(`${message} found:`, element.text());
            } else {
                console.log(`${message} not found.`);
            }
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Read HTML file
fs.readFile('1.3.4/orientation.html', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }
    // Call the function with the HTML content
    checkDeviceOrientation(data);
});
