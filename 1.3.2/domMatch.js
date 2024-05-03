const fs = require('fs');
const cheerio = require('cheerio');

function checkVisualOrder(html) {
    try {
        // Load the HTML content into Cheerio for easy DOM manipulation
        const $ = cheerio.load(html);

        // Get all elements with class .box
        const allElements = $('.box');

        // Initialize the previous element's position
        let prevPosition = null;

        // Flag to indicate if the visual order matches the original order
        let orderMatches = true;

        // Loop through each element
        allElements.each((index, element) => {
            // Get the position of the current element
            const currentPosition = {
                top: parseFloat($(element).css('top')),
                left: parseFloat($(element).css('left'))
            };

            // If the previous element exists and the current element is above or to the left of the previous element
            if (prevPosition && (currentPosition.top < prevPosition.top || currentPosition.left < prevPosition.left)) {
                // Set the flag to false and break out of the loop
                orderMatches = false;
                return false; // Break out of the loop
            }

            // Update the previous position for the next iteration
            prevPosition = currentPosition;
        });

        // Check if the visual order matches the original order
        if (orderMatches) {
            console.log('Visual order matches the original order.');
        } else {
            console.log('Error: Visual order does not match the original order.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Read HTML file
fs.readFile('1.3.2/domMatch.html', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }
    // Call the function with the HTML content
    checkVisualOrder(data);
});
