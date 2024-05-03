const fs = require('fs');
const readline = require('readline');

// Function to parse an HTML file and check for problematic audio elements
async function checkAudioElements(filePath) {
    const problematicLines = [];

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let lineNumber = 0;

    for await (const line of rl) {
        lineNumber++;
        //console.log(line);
        if(line.includes('<audio') && line.includes('autoplay') && !line.includes('controls'))
            problematicLines.push({ line: lineNumber, content: line.trim() });
    }

    return problematicLines;
}

const filePath = 'C:\\Users\\mdria\\OneDrive\\Desktop\\pakran\\rules\\audio.html';

checkAudioElements(filePath)
    .then(problematicLines => {
        console.log('Problematic Audio Elements:');
        console.log(problematicLines);
    })
    .catch(error => {
        console.error('Error:', error);
    });
