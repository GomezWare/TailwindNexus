/**
 * This util is for create component thumnail
 */

import puppeteer from "puppeteer";

const renderThumbnail = async (id, tailwindCode) => {
  // Launch a Puppeteer browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Custom HTML as a string (includes tailwind cdn)
  const htmlContent = `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body>${tailwindCode}</body>/html>`;

  // Load the custom HTML
  await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

  // Set the viewport size to capture the entire page
  await page.setViewport({ width: 1280, height: 800 });

  // Take a screenshot of the page
  await page.screenshot({
    path: `/public/uploads/component-${id}.png`,
    fullPage: true,
  });

  // Close the browser
  await browser.close();
};

export { renderThumbnail };
