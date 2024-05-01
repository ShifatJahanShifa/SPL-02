const axios = require('axios');
const readline = require('readline');
const fs = require('fs');

async function downloadAndParseWebpage(url) {
    try {
        const response = await axios.get(url);
        const htmlContent = response.data;

        fs.writeFileSync('downloaded.html', htmlContent);

        const noAuto = [];

        const rl = readline.createInterface({
            input: fs.createReadStream('downloaded.html'),
            crlfDelay: Infinity
        });

        let lineNumber = 0;
        let check = 0;
        let autoMatch;
        let temp;

        // Process each line of the HTML content
        for await (const line of rl)
        {
            lineNumber++;
            if (check == 1) 
            {
                if (line.includes('<form')) {
                    check = 0;
                    noAuto.push({temp});
                }
                else if (line.includes('autocomplete')) 
                {
                    check=0;
                    autoMatch = line.match(/autocomplete="([^"]+)"/);
                    if (autoMatch) 
                    {
                        const autoStr = autoMatch[1];
                        if(autoStr!=='on') 
                        {
                            noAuto.push({lineNumber});
                        }
                    }
                }
            }
            if (line.includes('<form')) 
            {
                autoMatch = line.match(/autocomplete="([^"]+)"/);
                if (autoMatch) 
                {
                    const autoStr = autoMatch[1];
                    if(autoStr!=='on') 
                    {
                        noAuto.push({lineNumber});
                    }
                }
                else 
                {
                    temp=lineNumber;
                    check=1;
                }
            }
        }
        if(check==1) 
        {
            noAuto.push({temp});
        }
        console.log('form without autocomplete:');
        console.log(noAuto);
    } 
    catch (error) {
        console.error('Error downloading or parsing the webpage:', error);
    }
}

const url = 'https://codeforces.com/settings/social';
downloadAndParseWebpage(url);
