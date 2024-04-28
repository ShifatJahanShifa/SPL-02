const puppeteer = require('puppeteer');

async function checkAccessibility(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set HTML content
  await page.setContent(htmlContent);

  // Evaluate accessibility
  const accessibilityReport = await page.accessibility.snapshot();
  console.log("Accessibility Report:");
  console.log(accessibilityReport);

  // Check if animated GIF stops blinking within 5 seconds
  const gifDuration = await page.evaluate(() => {
    const gif = document.getElementById('animatedGif');
    const frames = gif.naturalHeight; // Number of frames in the animated GIF
    const frameRate = 0.1; // Example frame rate in seconds per frame
    const repetitions = 5 / (frames * frameRate); // Calculate repetitions to stop within 5 seconds
    return repetitions;
  });
  console.log(`Repetitions required for animated GIF to stop blinking within 5 seconds: ${gifDuration}`);

  // Close the browser
  await browser.close();
}

// HTML content to check for accessibility
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Accessibility Test Page</title>
</head>
<body>
<div id="movingContent">This is moving content from left to right.</div>
<div id="blinkingContent">This is blinking content.</div>
<img src="animated.gif" alt="Animated GIF" id="animatedGif">
</body>
</html>
`;

// Check accessibility
checkAccessibility(htmlContent);
