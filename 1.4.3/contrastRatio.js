const { parse } = require('node-html-parser');
const fs = require('fs');
const cheerio = require('cheerio');
const convert = require('color-convert');

function getColorFormat(color) {
    // Regular expressions to match hexadecimal and RGB colors
    const hexRegex = /^#[0-9a-f]{3,6}$/i;
    const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;

    // Check if the color matches the hex or RGB color format
    if (hexRegex.test(color)) {
        return 'hex'; // Color is in hexadecimal format
    } else if (rgbRegex.test(color)) {
        return 'rgb'; // Color is in RGB format
    } else {
        return 'unknown'; // Unable to determine the color format
    }
}

// Read HTML file
const html = fs.readFileSync('1.4.3/contrast.html', 'utf8');

// Parse HTML using cheerio
const $ = cheerio.load(html);

// Retrieve link color from inline style
/*let linkColor = $('a').attr('style');
let textColor = $('body').css('color');

var checker=getColorFormat(textColor);
if (checker=="unknown") textColor= convert.keyword.rgb(textColor);


if (linkColor) {
    const colorIndex = linkColor.indexOf('color:');
    if (colorIndex !== -1) {
        // Extract the color value from the inline style
        linkColor = linkColor.slice(colorIndex + 6); // 6 is the length of 'color:'
        linkColor = linkColor.split(';')[0].trim(); // Extract the color value before the next ';'
    }
}

// Check for CSS rules
$('style').each((index, element) => {
    const cssContent = $(element).text();
    if (cssContent.includes('a {')) {
        const startIndex = cssContent.indexOf('color:');
        if (startIndex !== -1) {
            const endIndex = cssContent.indexOf(';', startIndex);
            if (endIndex !== -1) {
                // Extract the color value from the CSS rule
                linkColor = cssContent.slice(startIndex + 6, endIndex).trim(); // 6 is the length of 'color:'
            }
        }
    }
});

/* Fallback to browser default if no color is defined
if (!linkColor) {
    // Specify the default link color used by browsers
    const defaultLinkColor = '#0000ff'; // Example default color

    // Log that the default color is being used
    console.log('Link color not defined. Using browser default color:', defaultLinkColor);

    // Assign default color
    linkColor = defaultLinkColor;
}

if (!textColor) {
    // Specify the default link color used by browsers
    const defaultTextColor = '#ffffff'; // Example default color

    // Log that the default color is being used
    console.log('Text color not defined. Using browser default color:', defaultTextColor);

    // Assign default color
    textColor = defaultTextColor;
}

console.log('Link color:', linkColor);*/


function calculateRelativeLuminance(color) {
    const srgbAdjusted = color.map(value => {
        console.log("value: "+value);
        const srgbValue = value / 255;
        if (srgbValue <= 0.03928) {
            return srgbValue / 12.92;
        } else {
            return Math.pow((srgbValue + 0.055) / 1.055, 2.4);
        }
    });
    return 0.2126 * srgbAdjusted[0] + 0.7152 * srgbAdjusted[1] + 0.0722 * srgbAdjusted[2];
}

// Function to check if a color meets the 3:1 contrast ratio with black
function meetsContrastRatio(color1, color2) {
    const textLuminance = calculateRelativeLuminance(color2); // Black
    const colorLuminance = calculateRelativeLuminance(color1);
    console.log(colorLuminance);
    console.log(textLuminance);
    var L1=textLuminance, L2=colorLuminance;
    if(textLuminance<colorLuminance)
    {
        L1=colorLuminance;
        L2=textLuminance;
    }

    const contrastRatio = (L1 + 0.05) / (L2 + 0.05); // Adding 0.05 to prevent division by zero
    //console.log("color contrast:" + contrastRatio);
    return contrastRatio;
}

// Function to convert hex color to sRGB values
function hexToSrgb(hex) {
    // Check if hex is a string
    if (typeof hex === 'string') {
        return [
            parseInt(hex.slice(1, 3), 16), // Red component
            parseInt(hex.slice(3, 5), 16), // Green component
            parseInt(hex.slice(5, 7), 16)  // Blue component
        ];
    }
    else console.log("error");
    // If hex is not a string, return null or handle the error as appropriate
    return null;
}

function rgbToArray(rgbString) {
    // Remove the 'rgb(' and ')' parts and split the string by commas
    const rgbValues = rgbString.substring(4, rgbString.length - 1).split(',');

    // Convert the extracted RGB values to integers and return them in an array
    return [
        parseInt(rgbValues[0].trim()), // Red value
        parseInt(rgbValues[1].trim()), // Green value
        parseInt(rgbValues[2].trim())  // Blue value
    ];
}



/*Example usage
const linkColorHex = linkColor; // Color in #RRGGBB format
const linkColor1 = hexToSrgb(linkColorHex);

if(checker=="hex"){
const textColor1=hexToSrgb(textColor);}
else textColor1=rgbToArray(textColor);
*/

function checkContrast(html) {
    const root = parse(html);

    // Get all text elements
    const textElements = root.querySelectorAll('*:not(script):not(style)')
        .map(element => element.text.trim())
        .filter(text => text.length > 0); // Filter out empty texts

    // Check contrast for each text element
    textElements.forEach((text, index) => {
        // Example threshold values for AA compliance
        const fontSize = 16; // Font size in pixels
        const fontWeight = 'normal'; // Font weight
        const backgroundColor = '#ffffff'; // Background color in hex format
        const textColor = '#000000'; 
        // Text color in hex format

        let backgroundColor1=hexToSrgb(backgroundColor);
        let textColor1=hexToSrgb(textColor);

        const contrastRatio = meetsContrastRatio(textColor1, backgroundColor1);
        const isBold = root.querySelectorAll('*:not(script):not(style)')[index].rawTagName === 'b';

        // Determine the situation based on font size and weight
        let situation;
        if (fontSize < 18 && fontWeight !== 'bold') {
            situation = 'Situation A';
        } else if (fontSize >= 18 && fontWeight !== 'bold') {
            situation = 'Situation B';
        } else if (fontSize < 14 && fontWeight === 'bold') {
            situation = 'Situation A';
        } else {
            situation = 'Situation B';
        }

        // Determine if the contrast ratio meets the requirements
        let meetsRequirements;
        if (situation === 'Situation A') {
            meetsRequirements = contrastRatio >= 4.5;
        } else {
            meetsRequirements = contrastRatio >= 3;
        }

        // Output the result
        console.log(`Text: "${text}"`);
        console.log(`Contrast Ratio: ${contrastRatio}`);
        console.log(`Situation: ${situation}`);
        console.log(`Meets Requirements: ${meetsRequirements}`);
        console.log('---');
    });
}


checkContrast(html);
