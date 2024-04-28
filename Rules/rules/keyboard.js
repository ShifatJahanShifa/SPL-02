const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

async function checkAccessibilityWithTabindex(url) {
    try {
        const response = await axios.get(url);
        const htmlContent = response.data;
        const filePath = 'source.html';
        fs.writeFileSync(filePath, htmlContent);

        const elementsWithTabIndexLessThanZero = [];

        const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity
        });

        // Define the element types to check for tabindex
        const elementTypesToCheck = [
            'a', // Links
            'button', // Buttons
            'input[type="checkbox"]', // Checkboxes
            'input[type="radio"]', // Radio buttons
            'input[type="submit"]', // Submit buttons
            'input[type="reset"]', // Reset buttons
            'input[type="button"]', // Generic input buttons
            'select', // Dropdown/select elements
            'textarea', // Textareas
            'input[type="text"]', // Text inputs
            'input[type="password"]', // Password inputs
            'input[type="email"]', // Email inputs
            'input[type="tel"]' // Telephone inputs
        ];

        // Process each line of the HTML content
        let lineNumber = 0;
        let cnt=0
        for await (const line of rl) 
        {
            lineNumber++;
            if(line.includes('<!--')) continue;
            elementTypesToCheck.forEach(selector => 
            {
                const elements = line.matchAll(new RegExp(`<${selector}[^>]*>`, 'gi'));

                for (const match of elements) 
                {
                    //console.log(lineNumber, line);
                    const element = match[0];
                    const tabIndexMatch = element.match(/tabindex="(-?\d+)"/);

                    if (tabIndexMatch) 
                    {
                        if(parseInt(tabIndexMatch[1]) < 0)
                        {
                            elementsWithTabIndexLessThanZero.push({
                                errorline: selector,
                                lineNumber
                            });
                        }
                    }
                    else 
                    {
                        elementsWithTabIndexLessThanZero.push({
                            errorline: selector,
                            lineNumber
                        });
                    }
                }
            });
        }

        
        if (elementsWithTabIndexLessThanZero.length > 0) {
            console.log('Elements with tabindex < 0:');
            elementsWithTabIndexLessThanZero.forEach(element => {
                console.log(`Error: ${element.errorline}, Line Number: ${element.lineNumber}`);
            });
        } else {
            console.log('All elements have valid tabindex values!');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Usage example:
const url = 'https://www.amazon.com/'; // Replace with the URL of the webpage you want to check
checkAccessibilityWithTabindex(url);
