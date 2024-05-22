/**
 * This util is for create component thumnail
 */

// Imports
import { randomUUID } from "crypto";
import puppeteer from "puppeteer";
const renderThumbnail = async (tailwindCode) => {
  // Generate a UID for save the image
  const uid = randomUUID();

  // Launch a Puppeteer browser
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  // Custom HTML as a string (includes tailwind cdn)
  const htmlContent = `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body>${tailwindCode}</body></html>`;

  // Load the custom HTML
  await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

  // Set the viewport size to store the capture
  await page.setViewport({ width: 1200, height: 800 });

  // Take a screenshot of the page
  await page.screenshot({
    path: `upload/component-${uid}.png`,
    fullPage: false,
  });

  // Close the browser
  await browser.close();

  // Return the path of the humbnail
  return `component-${uid}.png`;
};

export { renderThumbnail };
