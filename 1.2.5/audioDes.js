const fs = require('fs');
const cheerio = require('cheerio');

function checkExtendedAudioDescription(html) {
    try {
        // Load the HTML content into Cheerio for easy DOM manipulation
        const $ = cheerio.load(html);

        // Check if there is a version of the movie that includes extended audio descriptions
        const extendedAudioDescriptionVersion = $('[data-extended-audio-description-version]');
        if (extendedAudioDescriptionVersion.length === 0) {
            console.log('Error: No version found with extended audio descriptions.');
            return;
        }

        // Check if the video halts for extended audio description
        const videoHaltsForDescription = $('[data-video-halts]');
        if (videoHaltsForDescription.length === 0) {
            console.log('Error: Video does not halt for extended audio description.');
            return;
        }

        // Check that the necessary information is included in the audio description (not implemented in this code snippet)

        // Check for the availability of links to allow users to access alternate versions
        const alternateVersionLinks = $('[data-alternate-version-link]');
        if (alternateVersionLinks.length === 0) {
            console.log('Error: No links found to access alternate versions.');
            return;
        }

        // All checks passed
        console.log('Success: Version found with extended audio descriptions.');

    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Read HTML file
fs.readFile('1.2.5/audioDes.html', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }
    // Call the function with the HTML content
    checkExtendedAudioDescription(data);
});
