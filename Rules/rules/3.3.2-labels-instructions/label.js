const axios = require('axios');
const readline = require('readline');
const fs = require('fs');

async function checkLabel(url) 
{
    try 
    {
        const response = await axios.get(url);
        const htmlContent = response.data;
        fs.writeFileSync('label1.html', htmlContent);
        const noLabel = [];

        const rl = readline.createInterface({
            input: fs.createReadStream('label1.html'),
            crlfDelay: Infinity
        });

        const lines=[];
        const emit=['button','hidden','image','reset','submit'];
        const after=['checkbox','radio'];
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
            if(lines[i].includes('<input')) 
            {
                typeMatch=lines[i].match(/type="([^"]+)"/);
                if(typeMatch) 
                {
                    let value=typeMatch[1];
                    if(emit.includes(value)) continue;
                    if(after.includes(value)) 
                    {
                        let idMatch=lines[i].match(/id="([^"]+)"/);
                        let id=idMatch[1];
                        if(lines[i+1].includes('<label')) 
                        {
                            let forMatch=lines[i+1].match(/for="([^"]+)"/);
                            let forValue=forMatch[1];
                            if(forValue!=id) 
                            {
                                noLabel.push(i+1);
                            }
                        }
                        else if(lines[i-1].includes('<label')) 
                        {
                            let forMatch=lines[i-1].match(/for="([^"]+)"/);
                            let forValue=forMatch[1];
                            if(forValue!=id) 
                            {
                                noLabel.push(i+1);
                            }
                        }
                        else 
                        {
                            noLabel.push(i+1);
                        }
                    }
                    else 
                    {
                        let idMatch=lines[i].match(/id="([^"]+)"/);
                        let id=idMatch[1];
                        if(lines[i-1].includes('<label')) 
                        {
                            let forMatch=lines[i-1].match(/for="([^"]+)"/);
                            let forValue=forMatch[1];
                            if(forValue!=id) 
                            {
                                noLabel.push(i+1);
                            }
                        }
                        else if(lines[i+1].includes('<label'))
                        {
                            let forMatch=lines[i+1].match(/for="([^"]+)"/);
                            let forValue=forMatch[1];
                            if(forValue!=id) 
                            {
                                noLabel.push(i+1);
                            }
                        }
                        else 
                        {
                            noLabel.push(i+1);
                        }
                    }
                }
            }
        }

        console.log('input without label:');
        console.log(noLabel);
    } 
    catch(error)
    {
        console.error("error downloading ...");
    }
} 

const url='https://codeforces.com/settings/social/';
const url1='https://www.amazon.com/';
checkLabel(url1);

//https://codeforces.com/settings/social