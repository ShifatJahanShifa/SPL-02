const axios = require('axios');
const readline = require('readline');
const fs = require('fs');

async function checkLabel(url) 
{
    try 
    {
        const response = await axios.get(url);
        const htmlContent = response.data;
        fs.writeFileSync('charKeyShortcut.html', htmlContent);
        const oneCharShortcut = [];

        const rl = readline.createInterface({
            input: fs.createReadStream('charKeyShortcut.html'),
            crlfDelay: Infinity
        });

        const lines=[];
        let lineNumber = 0;
        let check = 0;
        let typeMatch;
        let temp; 
        for await(const line of rl) 
        {
            lines.push(line);
        }
        //console.log(lines.length);
        for(let i=0;i<lines.length;i++) 
        {
            if(lines[i].includes('accesskey')) 
            {
                let keyMatch=lines[i].match(/accesskey="([^"]+)"/);
                let keyshortcut=keyMatch[1];
                if(keyshortcut.length==1) 
                {
                    oneCharShortcut.push(i+1);
                }
            }
        }

        console.log('one character shortcut:');
        console.log(oneCharShortcut);
    } 
    catch(error)
    {
        console.error("error downloading ...");
    }
} 

//const url='http://cocom/settings/social/';
const url1='https://codeforces.com/settings/social';
checkLabel(url1);

//https://codeforces.com/settings/social