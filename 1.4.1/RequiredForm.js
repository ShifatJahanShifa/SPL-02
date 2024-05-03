const fs = require('fs');
const cheerio = require('cheerio');

// Read HTML file
const html = fs.readFileSync('1.4.1/RequiredForm.html', 'utf8');

// Parse HTML using cheerio
const $ = cheerio.load(html);

// Check if form contains required fields marked with *
const requiredFields = $('form').find('[required]');
const requiredLabels = requiredFields.prev('label');

let requiredFieldsWithAsterisk = [];
requiredLabels.each((index, label) => {
    const labelText = $(label).text();
    if (labelText.includes('*')) {
        requiredFieldsWithAsterisk.push(labelText.trim());
    }
});

// Check if required field labels are styled in red
let redLabels = [];
requiredLabels.each((index, label) => {
    const color = $(label).css('color');
    if (color && color.toLowerCase().includes('red')) {
        redLabels.push($(label).text().trim());
    }
});

// Check if submit button is styled in green
const submitButton = $('input[type="submit"], button[type="submit"]');
const buttonColor = submitButton.css('background-color');

if (buttonColor && buttonColor.toLowerCase() === 'green') {
    console.log('Submit button is styled in green.');
} else {
    console.log('Submit button is not styled in green.');
}

// Output the results
if (requiredFieldsWithAsterisk.length > 0) {
    console.log('Required fields with asterisk:', requiredFieldsWithAsterisk);
} else {
    console.log('No required fields with asterisk found.');
}

if (redLabels.length > 0) {
    console.log('Required field labels styled in red:', redLabels);
} else {
    console.log('No required field labels styled in red found.');
}
