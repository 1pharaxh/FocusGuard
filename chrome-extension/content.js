// content.js
// Function to check if user is logged in
function checkLoginStatus() {
  // Get user_id from local storage
  const pageTitle = document.title;
  const pageUrl = window.location.href;
  const pageBody = document.body.innerText;

  const userId = localStorage.getItem("user_id");
  if (pageBody.includes("continue to FocusGuard")) {
    // delete the key from extension storage
    chrome.storage.sync.remove("extension_user_id");
    console.log("Deleted user_id from extension storage");
  } else {
    // try to read the key from extension storage
    chrome.storage.sync.get("extension_user_id", function (data) {
      console.log("extension_user_id: " + data.extension_user_id);
    });

    // IF WE ARE ON THE DASHBOARD PAGE AFTER LOGGING IN
    if (userId) {
      // read the key from local storage
      const value = localStorage.getItem("user_id");
      // put key in extension storage
      chrome.storage.sync.set({ extension_user_id: value });
    }
    // ELSE WE ARE ON A PAGE THAT IS SUPPOSED TO BE BLOCKED / ALLOWED
    else {
      // try to read the key from extension storage
      chrome.storage.sync.get("extension_user_id", function (data) {
        if (data.extension_user_id) {
          // alert("Sending page info to server");
          fetch("http://localhost:3000/api/WebExtensionApi", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              extension_user_id: data.extension_user_id,
              page_title: pageTitle,
              page_url: pageUrl,
              date: new Date().toLocaleString(),
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("GOT BACK DATA", data);
              if (data.hasCategory !== "Others") {
                // Hide all content on the current page
                document.body.style.display = "none";
                // Redirect to a link
                window.location.href = "http://localhost:3000/blocked";
              }
            });
        } else {
          // redirect to login page
          if (
            pageUrl.includes("http://localhost:3000") ||
            pageUrl.includes(
              "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount"
            )
          ) {
            return;
          } else {
            window.location.href = "http://localhost:3000/sign-in";
          }
        }
      });
    }
  }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "checkLoginStatus") {
    checkLoginStatus();
  }
});
