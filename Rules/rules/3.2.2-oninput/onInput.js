const axios = require('axios');
const readline = require('readline');
const fs = require('fs');

async function checkInput(url) 
{
    try 
    {
        const response = await axios.get(url);
        const htmlContent = response.data;
        fs.writeFileSync('oninput.html', htmlContent);
        const oninput = [];

        const rl = readline.createInterface({
            input: fs.createReadStream('oninput.html'),
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
        let notHidden=0;
        for(let i=0;i<lines.length;i++) 
        {
            if(check==1) 
            {
                if(lines[i].includes('<button'))
                {
                    typeMatch=lines[i].match(/type="([^"]+)"/);
                    if(typeMatch)
                    {
                        let value=typeMatch[1];
                        if(value==='submit') 
                        {
                            check=0;
                            notHidden=0;
                        }
                    }
                }
                else if(lines[i].includes('<input')) 
                {
                    typeMatch=lines[i].match(/type="([^"]+)"/);
                    if(typeMatch)
                    {
                        let value=typeMatch[1];
                        //console.log(value);
                        if(value==='submit') 
                        {
                            check=0;
                            notHidden=0;
                        }
                        else if(value==='image')
                        {
                            check=0;
                            notHidden=0;
                        }
                        else if(value!=='hidden') 
                        {
                            //console.log(value, 'uff', i+1);
                            notHidden=1;
                        }
                    }
                }
                else if(lines[i].includes('</form>')) 
                {
                    check=0;
                    if(notHidden===1)
                    {
                        oninput.push(lineNumber);
                    }
                    notHidden=0;
                }
            }
            if(lines[i].includes('<form')) 
            {
                check=1;
                if(lines[i].includes('<button'))
                {
                    typeMatch=lines[i].match(/type="([^"]+)"/);
                    if(typeMatch)
                    {
                        let value=typeMatch[1];
                        if(value==='submit') 
                        {
                            check=0;
                            notHidden=0;
                        }
                    }
                }
                else if(lines[i].includes('<input')) 
                {
                    typeMatch=lines[i].match(/type="([^"]+)"/);
                    if(typeMatch)
                    {
                        let value=typeMatch[1];
                        // console.log(value);
                        if(value==='submit') 
                        {
                            check=0;
                            notHidden=0;
                        }
                        else if(value==='image')
                        {
                            check=0;
                            notHidden=0;
                        }
                        else if(value!=='hidden') 
                        {
                            notHidden=1;
                        }
                    }
                }
                lineNumber=i+1;
            }
        }

        console.log('form without submit option:');
        console.log(oninput);
    } 
    catch(error)
    {
        console.error("error downloading ...");
    }
} 

//const url='http://cocom/settings/social/';
const url1='https://codeforces.com/settings/social';
checkInput(url1);

//https://codeforces.com/settings/social