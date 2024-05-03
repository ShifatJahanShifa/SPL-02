const axios = require('axios');
const readline = require('readline');
const fs = require('fs');

async function checkInput(url) {
    try {
        const response = await axios.get(url);
        const htmlContent = response.data;
        fs.writeFileSync('caption.html', htmlContent);
        const noCaption = [];

        const rl = readline.createInterface({
            input: fs.createReadStream('caption.html'),
            crlfDelay: Infinity
        });

        const lines = [];
        let lineNumber = 0;
        let check = 0;
        let srcMatch;
        let kindmatch;
        let temp;
        for await (const line of rl) {
            lines.push(line);
        }
        //console.log(lines.length);
        let notHidden = 0;
        for (let i = 0; i < lines.length; i++) 
        {
            if (check == 1) 
            {
                if (lines[i].includes('<track')) 
                {
                    srcMatch = lines[i].match(/src="([^"]+)"/);
                    kindmatch = lines[i].match(/kind="([^"]+)"/);
                    if (srcMatch) 
                    {
                        let value = kindmatch[1];
                        if (value === 'captions') 
                        {
                            check = 0;
                        }
                        else noCaption.push(lineNumber);
                    }
                }  
                else if (lines[i].includes('</video>')) 
                {
                    check = 0;
                    noCaption.push(lineNumber);
                }
            }
            if (lines[i].includes('<video')) 
            {
                check = 1;
                if (lines[i].includes('<track')) {
                    srcMatch = lines[i].match(/src="([^"]+)"/);
                    kindmatch = lines[i].match(/kind="([^"]+)"/);
                    if (srcMatch) {
                        let value = kindmatch[1];
                        if (value === 'captions') {
                            check = 0;
                        }
                        else noCaption.push(lineNumber);
                    }
                }
                lineNumber = i + 1;
            }
        }

        console.log('video without caption:');
        console.log(noCaption);
    }
    catch (error) 
    {
        console.error("error downloading ...");
    }
}

//const url='http://cocom/settings/social/';
const url1 = 'http://www.iit.du.ac.bd/';
checkInput(url1);

//https://codeforces.com/settings/social