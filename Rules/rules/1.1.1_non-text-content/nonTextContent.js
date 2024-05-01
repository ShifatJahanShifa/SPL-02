const fs = require('fs');
const http = require('http');
const readline = require('readline');

// Function to download HTML content from a URL and save it as a file locally
async function downloadHTML(url, filePath) {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(filePath);
        http.get(url, (response) => {
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => reject(err));
        });
    });
}

// Function to parse the downloaded HTML file and identify image tags
async function parseHTMLFile(filePath) {
    const imagesWithoutAlt = [];

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let lineNumber1 = 0; // Initialize line number counter
    let check=0;
    let srcMatch;
    let altMatch;
    let lineNumber;
    for await (const line of rl) {
        lineNumber1++; // Increment line number for each line read
        if(check==1) 
        {
            if(line.includes('<img')) 
            {
                check=0;
                const src=srcMatch[1];
                imagesWithoutAlt.push({ src, lineNumber });    
            }
            else if(line.includes('alt')) 
            {
                altMatch = line.match(/alt="([^"]+)"/);
                check=0;
                let altt=altMatch[1];
                if (altt==="") 
                {
                    const src=srcMatch[1];
                    imagesWithoutAlt.push({ src, lineNumber });  
                }
            }

        }
        if (line.includes('<img')) {
            // Extract src and alt attributes from the img tag
            srcMatch = line.match(/src="([^"]+)"/);
            altMatch = line.match(/alt="([^"]+)"/);

            if (srcMatch) {
                const src = srcMatch[1];
                lineNumber=lineNumber1;
                
                if (!line.includes('alt')) 
                {
                    check=1;
                }
                else 
                {
                    let alt = altMatch ? altMatch[1] : ""; // Get alt attribute or empty string if not found
                    check=0;
                    if (alt==="") 
                    {
                        imagesWithoutAlt.push({ src, lineNumber });  
                    }
                }
            }
        }
    }

    return imagesWithoutAlt;
}

// Example usage:
const url = 'http://www.iit.du.ac.bd/';
const htmlFilePath = 'SPL-02/Rules/rules/1.1.1_non-text-content/index.html';

downloadHTML(url, htmlFilePath)
    .then(() => {
        return parseHTMLFile(htmlFilePath);
    })
    .then((imagesWithoutAlt) => {
        console.log('Images without alt attribute:');
        console.log(imagesWithoutAlt);
    })
    .catch((err) => {
        console.error('Error:', err);
    });
