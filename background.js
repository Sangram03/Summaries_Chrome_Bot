// Add this file to your extension
chrome.runtime.onInstalled.addListener(() => {
  // This will prompt the user to enter their API key on first install
  chrome.storage.sync.get(["geminiApiKey"], (result) => {
    if (!result.geminiApiKey) {
      chrome.tabs.create({
        url: "options.html",
      });
    }
  });
});

// Download the pdf
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "downloadPDF") {
    chrome.downloads.download({
      url: message.url,
      filename: "summary.pdf",
      saveAs: true
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error("Download Error:", chrome.runtime.lastError.message);
        sendResponse({ status: "error", message: chrome.runtime.lastError.message });
      } else {
        sendResponse({ status: "ok", downloadId });
      }
    });
    return true; // keeps sendResponse async
  }
});







