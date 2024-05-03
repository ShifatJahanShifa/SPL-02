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
<style>
  #movingContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: moveContent 5s infinite linear;
  }
  
  @keyframes moveContent {
    0% { left: 0; }
    100% { left: 100%; }
  }

  #blinkingContent {
    animation: blinkContent 1s infinite;
  }

  @keyframes blinkContent {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
</style>
</head>
<body>
<div id="movingContent">This is moving content from left to right.</div>
<div id="blinkingContent">This is blinking content.</div>
</body>
</html>
`;

// Check accessibility
checkAccessibility(htmlContent);
