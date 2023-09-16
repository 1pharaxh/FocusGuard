// background.js

// Listen for tab updates
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Check if the extension is enabled
  chrome.storage.sync.get("enabled", function (data) {
    if (data.enabled && changeInfo.url) {
      // Send a message to the content script to show the alert
      setTimeout(function () {
        chrome.tabs.sendMessage(tabId, { action: "onUpdated" });
        chrome.tabs.sendMessage(tabId, { action: "showAlert" });
        chrome.tabs.sendMessage(tabId, { action: "checkLoginStatus" });
      }, 2000); // Wait for 2 seconds
    }
  });
});

// Listen for tab activation
chrome.tabs.onActivated.addListener(function (activeInfo) {
  // Check if the extension is enabled
  chrome.storage.sync.get("enabled", function (data) {
    if (data.enabled) {
      // Send a message to the content script to show the alert
      setTimeout(function () {
        chrome.tabs.sendMessage(activeInfo.tabId, { action: "onActivated" });
        chrome.tabs.sendMessage(activeInfo.tabId, { action: "showAlert" });
        chrome.tabs.sendMessage(activeInfo.tabId, {
          action: "checkLoginStatus",
        });
      }, 2000); // Wait for 2 seconds
    }
  });
});
