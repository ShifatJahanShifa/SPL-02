const fs = require('fs');
const cheerio = require('cheerio');
const { SpeechClient } = require('@google-cloud/speech');

async function transcribeMedia(mediaFilePath) {
    try {
        // Create a SpeechClient
        const speechClient = new SpeechClient();

        // Read media file
        const mediaBytes = fs.readFileSync(mediaFilePath);

        // Determine media type based on file extension
        const isAudio = mediaFilePath.endsWith('.mp3') || mediaFilePath.endsWith('.wav');
        const isVideo = mediaFilePath.endsWith('.mp4') || mediaFilePath.endsWith('.avi');

        // Configure request
        const request = {
            audio: {
                content: mediaBytes.toString('base64'),
            },
            config: {
                encoding: isAudio ? 'LINEAR16' : 'LINEAR16', // Adjust encoding based on media type
                sampleRateHertz: isAudio ? 16000 : 44100, // Adjust sample rate based on media type
                languageCode: 'en-US',
            },
        };

        // Perform speech recognition
        const [response] = await speechClient.recognize(request);
        const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');

        return transcription;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function checkVideoAccessibility(html) {
    try {
        // Load the HTML content into Cheerio for easy DOM manipulation
        const $ = cheerio.load(html);

        // Check if there is a video element
        const videoElement = $('video');
        if (videoElement.length > 0) {
            // Fetch transcript content if link found
            const videoParent = videoElement.parent();
            const transcriptLink = videoParent.find('a[href*="transcript"]');
            if (transcriptLink.length === 0) {
                console.log('Error: No transcript link found for the video.');
                return;
            }
            const transcriptUrl = transcriptLink.attr('href');
            const transcriptContent = fs.readFileSync(transcriptUrl, 'utf8');

            // Transcribe video content
            const videoFilePath = videoElement.attr('src');
            const videoTranscription = await transcribeMedia(videoFilePath);

            // Check if transcript content matches video transcription
            if (transcriptContent.trim() === videoTranscription.trim()) {
                console.log('Success: Video accessibility checks passed.');

                // Check for audio elements inside the video
                const audioElements = videoElement.find('audio');
                if (audioElements.length > 0) {
                    audioElements.each(async (index, audioElement) => {
                        const audioParent = $(audioElement).parent();
                        const audioTranscriptLink = audioParent.find('a[href*="transcript"]');
                        if (audioTranscriptLink.length === 0) {
                            console.log(`Error: No transcript link found for the audio inside the video (${index}).`);
                            return;
                        }
                        const audioTranscriptUrl = audioTranscriptLink.attr('href');
                        const audioTranscriptContent = fs.readFileSync(audioTranscriptUrl, 'utf8');

                        // Transcribe audio content inside the video
                        const audioFilePath = $(audioElement).attr('src');
                        const audioTranscription = await transcribeMedia(audioFilePath);

                        // Check if transcript content matches audio transcription inside the video
                        if (audioTranscriptContent.trim() === audioTranscription.trim()) {
                            console.log(`Success: Audio content inside the video (${index}) matches its transcript.`);
                        } else {
                            console.log(`Error: Transcript for audio inside the video (${index}) does not match its transcription.`);
                        }
                    });
                }
            } else {
                console.log('Error: Transcript does not match video transcription.');
            }
        } else {
            console.log('Error: No video element found.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function checkAudioAccessibility(html) {
    try {
        // Load the HTML content into Cheerio for easy DOM manipulation
        const $ = cheerio.load(html);

        // Check if there is an audio element
        const audioElement = $('audio');
        if (audioElement.length > 0) {
            // Fetch transcript content if link found
            const audioParent = audioElement.parent();
            const transcriptLink = audioParent.find('a[href*="transcript"]');
            if (transcriptLink.length === 0) {
                console.log('Error: No transcript link found for the audio.');
                return;
            }
            const transcriptUrl = transcriptLink.attr('href');
            const transcriptContent = fs.readFileSync(transcriptUrl, 'utf8');

            // Transcribe audio content
            const audioFilePath = audioElement.attr('src');
            const audioTranscription = await transcribeMedia(audioFilePath);

            // Check if transcript content matches audio transcription
            if (transcriptContent.trim() === audioTranscription.trim()) {
                console.log('Success: Audio accessibility checks passed.');
            } else {
                console.log('Error: Transcript does not match audio transcription.');
            }
        } else {
            console.log('Error: No audio element found.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Read HTML file
fs.readFile('1.2.1_audioVideo/audioVideo.html', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }
    // Call the functions with the HTML content
    checkVideoAccessibility(data);
    checkAudioAccessibility(data);
});
