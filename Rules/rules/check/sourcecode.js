const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

async function checkAccessibilityWithTabindex(filePath) 
{
    try {
        // const response = await axios.get(url);
        // const htmlContent = response.data;
        // const filePath = 'amazon.html';
        // fs.writeFileSync(filePath, htmlContent);

        const elementsWithTabIndexLessThanZero = [];

        const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity
        });

        // Define the element types to check for tabindex
        const elementTypesToCheck = [
            '<a', // Links
            '<button', // Buttons
            '<select', // Dropdown/select elements
            '<textarea', // Textareas
            '<input' // Telephone inputs
        ];

        // Process each line of the HTML content
       
        let lineNumber = 0;
        let check = 0;
        let temp;
        let tabIndexMatch;
        for await(const line of rl) 
        {
            lineNumber++;
            if(line.includes('<!--')) continue;
            //if(cnt==10) break;
            
            if (check == 1) 
            {
                if (line.includes('<a ')) {
                    check = 0;
                    elementsWithTabIndexLessThanZero.push({
                        errorline: '<a>',
                        lineNumber: temp    
                    });
                }
                else if (line.includes('tabindex')) 
                {
                    check=0;
                    tabIndexMatch = line.match(/tabindex="(-?\d+)"/);
                    if (tabIndexMatch) 
                    {
                        const tabIndexValue = parseInt(tabIndexMatch[1]);
                        if(tabIndexValue < 0)
                        {
                            elementsWithTabIndexLessThanZero.push({
                            errorline:  '<a>',
                            lineNumber: temp
                            });
                        }
                    }
                }
            }
            if (line.includes('<a ')) 
            {
                tabIndexMatch = line.match(/tabindex="(-?\d+)"/);
                //console.log(line);
                if (tabIndexMatch) 
                {
                    const tabIndexValue = parseInt(tabIndexMatch[1]);
                    if(tabIndexValue < 0)
                    {
                        elementsWithTabIndexLessThanZero.push({
                        errorline:  '<a>',
                        lineNumber: lineNumber
                        });
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
            elementsWithTabIndexLessThanZero.push({
                errorline: '<a>',
                lineNumber: temp    
            });
        }
        //console.log(lineNumber);
        lineNumber = 0;
        check = 0;
        // button 
        for await(const line of rl) 
        {
            lineNumber++;
            if(line.includes('<!--')) continue;
            //if(cnt==10) break;
            
            if (check == 1) 
            {
                if (line.includes('<button')) {
                    check = 0;
                    elementsWithTabIndexLessThanZero.push({
                        errorline: '<button',
                        lineNumber: temp    
                    });
                }
                else if (line.includes('tabindex')) 
                {
                    check=0;
                    tabIndexMatch = line.match(/tabindex="(-?\d+)"/);
                    if (tabIndexMatch) 
                    {
                        const tabIndexValue = parseInt(tabIndexMatch[1]);
                        if(tabIndexValue < 0)
                        {
                            elementsWithTabIndexLessThanZero.push({
                            errorline: '<button>',
                            lineNumber: temp
                            });
                        }
                    }
                }
            }
            if (line.includes('<button')) 
            {
                tabIndexMatch = line.match(/tabindex="(-?\d+)"/);
                if (tabIndexMatch) 
                {
                    const tabIndexValue = parseInt(tabIndexMatch[1]);
                    if(tabIndexValue < 0)
                    {
                        elementsWithTabIndexLessThanZero.push({
                        errorline: '<button>',
                        lineNumber: lineNumber
                        });
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
            elementsWithTabIndexLessThanZero.push({
                errorline: '<a>',
                lineNumber: temp    
            });
        }
        // select 
        lineNumber = 0;
        check = 0;
        for await(const line of rl) 
        {
            lineNumber++;
            if(line.includes('<!--')) continue;
            //if(cnt==10) break;
            
            if (check == 1) 
            {
                if (line.includes('<select')) {
                    check = 0;
                    elementsWithTabIndexLessThanZero.push({
                        errorline: '<select>',
                        lineNumber: temp    
                    });
                }
                else if (line.includes('tabindex')) 
                {
                    check=0;
                    tabIndexMatch = line.match(/tabindex="(-?\d+)"/);
                    if (tabIndexMatch) 
                    {
                        const tabIndexValue = parseInt(tabIndexMatch[1]);
                        if(tabIndexValue < 0)
                        {
                            elementsWithTabIndexLessThanZero.push({
                            errorline: '<select>',
                            lineNumber: temp
                            });
                        }
                    }
                }
            }
            if (line.includes('<select')) 
            {
                tabIndexMatch = line.match(/tabindex="(-?\d+)"/);
                if (tabIndexMatch) 
                {
                    const tabIndexValue = parseInt(tabIndexMatch[1]);
                    if(tabIndexValue < 0)
                    {
                        elementsWithTabIndexLessThanZero.push({
                        errorline: '<select>',
                        lineNumber: lineNumber
                        });
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
            elementsWithTabIndexLessThanZero.push({
                errorline: '<a>',
                lineNumber: temp    
            });
        }

        // textaria
        lineNumber = 0;
        check = 0;
        for await(const line of rl) 
        {
            lineNumber++;
            if(line.includes('<!--')) continue;
            //if(cnt==10) break;
            
            if (check == 1) 
            {
                if (line.includes('<textaria')) {
                    check = 0;
                    elementsWithTabIndexLessThanZero.push({
                        errorline: '<textaria>',
                        lineNumber: temp    
                    });
                }
                else if (line.includes('tabindex')) 
                {
                    check=0;
                    tabIndexMatch = line.match(/tabindex="(-?\d+)"/);
                    if (tabIndexMatch) 
                    {
                        const tabIndexValue = parseInt(tabIndexMatch[1]);
                        if(tabIndexValue < 0)
                        {
                            elementsWithTabIndexLessThanZero.push({
                            errorline: '<textaria>',
                            lineNumber: temp
                            });
                        }
                    }
                }
            }
            if (line.includes('<textaria')) 
            {
                tabIndexMatch = line.match(/tabindex="(-?\d+)"/);
                if (tabIndexMatch) 
                {
                    const tabIndexValue = parseInt(tabIndexMatch[1]);
                    if(tabIndexValue < 0)
                    {
                        elementsWithTabIndexLessThanZero.push({
                        errorline: '<textaria>',
                        lineNumber: lineNumber
                        });
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
            elementsWithTabIndexLessThanZero.push({
                errorline: '<a>',
                lineNumber: temp    
            });
        }
        
        // input
        lineNumber = 0;
        check = 0;
        for await(const line of rl) 
        {
            lineNumber++;
            if(line.includes('<!--')) continue;
            //if(cnt==10) break;
            
            if (check == 1) 
            {
                if (line.includes('<input')) {
                    check = 0;
                    elementsWithTabIndexLessThanZero.push({
                        errorline: '<input>',
                        lineNumber: temp    
                    });
                }
                else if (line.includes('tabindex')) 
                {
                    check=0;
                    tabIndexMatch = line.match(/tabindex="(-?\d+)"/);
                    if (tabIndexMatch) 
                    {
                        const tabIndexValue = parseInt(tabIndexMatch[1]);
                        if(tabIndexValue < 0)
                        {
                            elementsWithTabIndexLessThanZero.push({
                            errorline: '<input>',
                            lineNumber: temp
                            });
                        }
                    }
                }
            }
            if (line.includes('<input')) 
            {
                tabIndexMatch = line.match(/tabindex="(-?\d+)"/);
                if (tabIndexMatch) 
                {
                    const tabIndexValue = parseInt(tabIndexMatch[1]);
                    if(tabIndexValue < 0)
                    {
                        elementsWithTabIndexLessThanZero.push({
                        errorline: '<input>',
                        lineNumber: lineNumber
                        });
                    }
                }
                else 
                {
                    temp=lineNumber;
                    check=1;
                }
            }
        }

            
        if (elementsWithTabIndexLessThanZero.length > 0) 
        {
            console.log('Elements with tabindex < 0:');
            elementsWithTabIndexLessThanZero.forEach(element => {
                console.log(`Error: ${element.errorline}, Line Number: ${element.lineNumber}`);
            });
        } 
        else 
        {
            console.log('All elements have valid tabindex values!');
        }
    } 
    catch (error) 
    {
        console.error('Error:', error);
    }
}

// Usage example:
const url = 'SPL-02/Rules/rules/check/source.html'; // Replace with the URL of the webpage you want to check
checkAccessibilityWithTabindex(url);
