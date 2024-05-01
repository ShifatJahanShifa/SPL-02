const axios = require('axios');
const readline = require('readline');
const fs = require('fs');

async function checkLabel(url) 
{
    try 
    {
        const response = await axios.get(url);
        const htmlContent = response.data;
        fs.writeFileSync('tablecaption.html', htmlContent);
        const noTableCaption = [];

        const rl = readline.createInterface({
            input: fs.createReadStream('tablecaption.html'),
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
            if(check==1) 
            {
                if(lines[i].includes('<caption')) 
                {
                    check=0;
                }
                else if(lines[i].includes('<tbody') || lines[i].includes('<thead') || lines[i].includes('<tr')) 
                {
                    noTableCaption.push(lineNumber);
                    check=0;
                } 
            }
            if(lines[i].includes('<table')) 
            {
                check=1;
                if(lines[i].includes('<caption')) 
                {
                    check=0;
                }
                else lineNumber=i+1;
            }

        }

        console.log('table without caption:');
        console.log(noTableCaption);
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