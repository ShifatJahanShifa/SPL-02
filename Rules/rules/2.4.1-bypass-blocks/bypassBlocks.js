const axios = require('axios');
const readline = require('readline');
const fs = require('fs');

async function checkSkipLink(url) 
{
    try 
    {
        const response = await axios.get(url);
        const htmlContent = response.data;
        fs.writeFileSync('bypass.html', htmlContent);

        const rl = readline.createInterface({
            input: fs.createReadStream('bypass.html'),
            crlfDelay: Infinity
        });

        let lineNumber = 0;
        let check=0;
        let temp;
        const lines=[];
        for await(const line of rl) 
        {
            lines.push(line);
        }
        //console.log(lines.length);
        for(let i=0;i<lines.length;i++) 
        {
            if(lines[i].includes('<body')) 
            {
                check=1;
                temp=i+1;
            }
            if(check==1) 
            {
                if(lines[i].includes('<a')) 
                {
                    let hrefMatch=lines[i].match(/href="([^"]+)"/);
                    let value=hrefMatch[1];
                    if(value.length>0 && value[0]=='#') 
                    {
                        check=0;
                        break;
                    }
                    else 
                    {
                        lineNumber=temp;
                        break;
                    }
                }
                else if(!lines[i].includes('<header') && lines[i].includes('<')) 
                {
                    lineNumber=temp;
                    break;
                }
            }
        }

        if(lineNumber==0) console.log("skip link is provided");
        else 
        {
            console.log('skip link is not provided');
            console.log(lineNumber);
        }
    } 
    catch(error)
    {
        console.error("error downloading ...");
    }
} 

//const url='http://cocom/settings/social/';
const url1='http://www.iit.du.ac.bd/';
checkSkipLink(url1);

//https://codeforces.com/settings/social