// Get the active tab (helper function)
async function getActiveTab() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tab;
}

// Injects the scripts into the page
async function runScripts(tabId, runUnfollow, runConnect) {
  if (runUnfollow) {
    console.log("Injecting unfollow script...");
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["unfollow.js"],
    });
  }
  if (runConnect) {
    console.log("Injecting connect script...");
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["connect.js"],
    });
  }
}

// Stops all running scripts on the page
async function stopScripts(tabId) {
  console.log("Stopping all scripts...");
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: () => {
      // Clear the specific timeouts we created in the content scripts
      clearTimeout(window.unfollowTimeoutId);
      clearTimeout(window.connectTimeoutId);
      console.log("Automation intervals/timeouts cleared.");
    },
  });
  // Reload the tab to be safe
  chrome.tabs.reload(tabId);
}

// Main message listener (from popup.js)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    if (request.action === "start") {
      const tab = await getActiveTab();
      if (tab.url.includes("linkedin.com")) {
        // Save state to storage
        await chrome.storage.local.set({
          isRunning: true,
          isUnfollowing: request.runUnfollow,
          isConnecting: request.runConnect,
          tabId: tab.id,
        });
        // Run scripts for the first time
        runScripts(tab.id, request.runUnfollow, request.runConnect);
        sendResponse({ success: true });
      } else {
        alert("This extension only works on linkedin.com");
        sendResponse({ success: false });
      }
    } else if (request.action === "stop") {
      const { tabId } = await chrome.storage.local.get("tabId");
      // Clear state
      await chrome.storage.local.set({
        isRunning: false,
        isUnfollowing: false,
        isConnecting: false,
        tabId: null,
      });
      if (tabId) {
        stopScripts(tabId);
      }
      sendResponse({ success: true });
    }
  })();
  return true; // Indicates async response
});

// THIS IS THE FIX FOR THE "NEXT PAGE" BUG
// Listens for page loads
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    const { isRunning, isUnfollowing, isConnecting, tabId: storedTabId } =
      await chrome.storage.local.get([
        "isRunning",
        "isUnfollowing",
        "isConnecting",
        "tabId",
      ]);

    // Check if automation is running and if this is the tab we were working on
    if (isRunning && tabId === storedTabId) {
      console.log("Page reloaded, re-injecting scripts.");
      // Re-run the scripts on the new page
      runScripts(tabId, isUnfollowing, isConnecting);
    }
  }
});
