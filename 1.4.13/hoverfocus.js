const puppeteer = require('puppeteer');

async function simulateHoverAndFocus(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set HTML content
  await page.setContent(htmlContent);

  // Evaluate JavaScript functions to simulate hover and focus behavior
  await page.evaluate(() => {
    const parent = document.getElementById("parent");
    const popup = document.getElementById("popup");

    // Function to show popup on hover
    const showPopup = () => {
      popup.style.display = "block";
    };

    // Function to hide popup on hover out
    const hidePopup = () => {
      popup.style.display = "none";
    };

    // Function to show popup on focus
    const showPopupOnFocus = () => {
      popup.style.display = "block";
    };

    // Function to hide popup on blur
    const hidePopupOnBlur = () => {
      popup.style.display = "none";
    };

    // Add event listeners for hover and focus
    parent.addEventListener("mouseover", showPopup);
    parent.addEventListener("mouseout", hidePopup);
    parent.addEventListener("focus", showPopupOnFocus);
    parent.addEventListener("blur", hidePopupOnBlur);

    // Function to hide popup when ESC key is pressed
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        popup.style.display = "none";
      }
    });
  });

  // Close the browser
  await browser.close();
}

// HTML content example
const htmlContent = `
  <p>This is the 
     <a class="a-and-tooltip" id="parent" href="index.html">trigger
     <span id="popup" role="tooltip">And this additional text 
      gives additional context on the trigger term
     </span>
    </a>.
     Text and popup are <strong>in one link (a)</strong> element.
  </p>
`;

// Run the function with HTML content
simulateHoverAndFocus(htmlContent);
