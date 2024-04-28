const axios = require('axios');
const readline = require('readline');
const fs = require('fs');

async function downloadAndParseWebpage(url) {
    try {
        const response = await axios.get(url);
        const htmlContent = response.data;

        fs.writeFileSync('downloaded.html', htmlContent);

        const problematicLinesMap = new Map();

        const rl = readline.createInterface({
            input: fs.createReadStream('downloaded.html'),
            crlfDelay: Infinity
        });

        let lineNumber = 0;

        // Process each line of the HTML content
        for await (const line of rl) {
            lineNumber++;

            if (line.includes('<audio')) {
                // Parse the line to extract attributes within the <audio> tag
                const audioAttributes = line.match(/<audio([^>]*)>/);
                if (audioAttributes) {
                    const attributesStr = audioAttributes[1];

                    if (attributesStr.includes('autoplay')) {
                        if (!attributesStr.includes('controls')) {
                            problematicLinesMap.set(lineNumber, line.trim());
                        }
                    }
                }
            }
        }

        // Output the map containing line numbers of problematic <audio> elements
        console.log('Problematic Audio Elements (autoplay without controls):');
        console.log(problematicLinesMap);
    } catch (error) {
        console.error('Error downloading or parsing the webpage:', error);
    }
}

// Replace 'url' with the URL of the webpage you want to analyze
//const url = 'https://www.youtube.com/';
const url='http://www.iit.du.ac.bd/';
downloadAndParseWebpage(url);
