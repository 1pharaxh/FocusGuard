document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleButton");

  // Toggle button change event
  toggleButton.addEventListener("change", function () {
    const enabled = toggleButton.checked;
    chrome.storage.sync.set({ enabled });
  });

  // Load the toggle state from storage and set the toggle button
  chrome.storage.sync.get("enabled", function (data) {
    toggleButton.checked = data.enabled || false;
  });
});
