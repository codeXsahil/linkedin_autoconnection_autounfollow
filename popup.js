// Function to update the UI based on stored state
function updateUI(state) {
  if (state.isRunning) {
    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;
    document.getElementById("toggleUnfollow").checked = state.isUnfollowing;
    document.getElementById("toggleConnect").checked = state.isConnecting;
    document.getElementById("toggleUnfollow").disabled = true;
    document.getElementById("toggleConnect").disabled = true;
  } else {
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    document.getElementById("toggleUnfollow").disabled = false;
    document.getElementById("toggleConnect").disabled = false;
    document.getElementById("toggleUnfollow").checked = state.isUnfollowing || false;
    document.getElementById("toggleConnect").checked = state.isConnecting || false;
  }
}

// When the popup opens, get the current state and update the UI
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(
    ["isRunning", "isUnfollowing", "isConnecting"],
    (result) => {
      updateUI(result);
    }
  );
});

// Start button functionality
document.getElementById("startButton").addEventListener("click", () => {
  const isUnfollowing = document.getElementById("toggleUnfollow").checked;
  const isConnecting = document.getElementById("toggleConnect").checked;

  if (!isUnfollowing && !isConnecting) {
    alert("Please select at least one script to run.");
    return;
  }

  // Send "start" message to the service worker
  chrome.runtime.sendMessage(
    {
      action: "start",
      runUnfollow: isUnfollowing,
      runConnect: isConnecting,
    },
    () => {
      // Update UI optimistically
      updateUI({
        isRunning: true,
        isUnfollowing: isUnfollowing,
        isConnecting: isConnecting,
      });
    }
  );
});

// Stop button functionality
document.getElementById("stopButton").addEventListener("click", () => {
  // Send "stop" message to the service worker
  chrome.runtime.sendMessage({ action: "stop" }, () => {
    // Update UI optimistically
    updateUI({
      isRunning: false,
      isUnfollowing: false,
      isConnecting: false,
    });
  });
});
