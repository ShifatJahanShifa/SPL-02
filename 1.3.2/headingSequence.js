const fs = require('fs');
const cheerio = require('cheerio');

function checkHeadingHierarchy(html) {
    try {
        // Load the HTML content into Cheerio for easy DOM manipulation
        const $ = cheerio.load(html);

        // Define heading elements to check
        const headingsToCheck = ['h2', 'h3', 'h4', 'h5', 'h6'];

        // Loop through each heading element to check
        for (let i = 0; i < headingsToCheck.length; i++) {
            const currentHeading = headingsToCheck[i];
            const currentHeadingIndex = parseInt(currentHeading.charAt(1)); // Extract heading level number

            // Select all headings of the current type
            const currentHeadings = $(currentHeading);

            // Loop through each heading of the current type
            currentHeadings.each((index, element) => {
                const currentHeadingText = $(element).text().trim();

                // Select all headings of greater level than the current heading
                for (let j = currentHeadingIndex - 1; j >= 1; j--) {
                    const higherHeading = `h${j}`;
                    const higherHeadings = $(higherHeading);

                    // Loop through each higher level heading
                    higherHeadings.each((higherIndex, higherElement) => {
                        const higherHeadingText = $(higherElement).text().trim();

                        // Check if the current heading contains the higher level heading
                        if (currentHeadingText.includes(higherHeadingText)) {
                            console.log(`${currentHeading} "${currentHeadingText}" contains ${higherHeading} "${higherHeadingText}"`);
                        }
                    });
                }
            });
        }

        console.log('Heading hierarchy check complete.');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Read HTML file
fs.readFile('1.3.2/heading.html', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }
    // Call the function with the HTML content
    checkHeadingHierarchy(data);
});
