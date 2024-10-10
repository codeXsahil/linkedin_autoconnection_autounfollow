let unfollowInterval;
let connectInterval;

// Start button functionality
document.getElementById("startButton").addEventListener("click", async () => {
  const unfollowEnabled = document.getElementById("toggleUnfollow").checked;
  const connectEnabled = document.getElementById("toggleConnect").checked;

  console.log(
    `Unfollow Enabled: ${unfollowEnabled}, Connect Enabled: ${connectEnabled}`
  );

  // Get the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Disable start button and enable stop button
  document.getElementById("startButton").disabled = true;
  document.getElementById("stopButton").disabled = false;

  console.log("Start button clicked, script execution started.");

  if (unfollowEnabled) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: runUnfollowScript,
    });
    console.log("Unfollow script started.");
  }

  if (connectEnabled) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: runConnectScript,
    });
    console.log("Connect script started.");
  }
});

// Stop button functionality
document.getElementById("stopButton").addEventListener("click", async () => {
  clearInterval(unfollowInterval);
  clearInterval(connectInterval);

  // Refresh the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.reload(tab.id);

  // Enable start button and disable stop button
  document.getElementById("startButton").disabled = false;
  document.getElementById("stopButton").disabled = true;

  console.log(
    "Stop button clicked, script execution stopped and tab reloaded."
  );
});

// Function to run the unfollow script
function runUnfollowScript() {
  const getRandomDelay = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const scrollDown = () => {
    window.scrollBy(0, getRandomDelay(500, 1000));
    console.log("Page scrolled down.");
    unfollowInterval = setTimeout(unfollowUser, getRandomDelay(1500, 3000));
  };

  const unfollowUser = () => {
    const followButtons = document.querySelectorAll(".artdeco-button__text");
    const followingButtons = Array.from(followButtons).filter(
      (button) => button.innerText.trim() === "Following"
    );

    if (followingButtons.length > 0) {
      const selectedButton = followingButtons[0];
      setTimeout(() => {
        selectedButton.click();
        console.log("Unfollow button clicked.");
        setTimeout(() => {
          const modal = document.querySelector(".artdeco-modal");
          if (modal) {
            const unfollowButton = modal.querySelector(
              ".artdeco-modal__actionbar .artdeco-button--primary"
            );
            if (unfollowButton) {
              unfollowButton.click();
              console.log("Unfollow confirmed.");
            }
            const closeButton = modal.querySelector(".artdeco-modal__dismiss");
            if (closeButton) {
              setTimeout(() => {
                closeButton.click();
                console.log("Modal closed.");
              }, getRandomDelay(500, 1000));
            }
          }
          unfollowInterval = setTimeout(
            unfollowUser,
            getRandomDelay(2000, 4000)
          );
        }, getRandomDelay(1000, 2000));
      }, getRandomDelay(1000, 2000));
    } else {
      console.log("No more 'Following' buttons found, scrolling down.");
      unfollowInterval = setTimeout(scrollDown, getRandomDelay(2000, 4000));
    }
  };

  scrollDown();
}

// Function to run the connection request script
function runConnectScript() {
  const getRandomDelay = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const scrollDown = () => {
    window.scrollBy(0, getRandomDelay(500, 1000));
    console.log("Page scrolled down.");
    connectInterval = setTimeout(connectToUsers, getRandomDelay(1500, 3000));
  };

  const connectToUsers = () => {
    const connectButtons = Array.from(
      document.querySelectorAll(".artdeco-button--secondary")
    ).filter((button) => button.innerText.trim() === "Connect");

    if (connectButtons.length === 0) {
      const nextButton = document.querySelector("button[aria-label*='Next']");
      if (nextButton) {
        console.log("Next button found, moving to the next page.");
        setTimeout(() => nextButton.click(), getRandomDelay(1000, 2000));
      } else {
        console.log("No more connection buttons or pages available.");
        return;
      }
    } else {
      const connectButton = connectButtons[0];
      setTimeout(() => {
        connectButton.click();
        console.log("Connect button clicked.");
        setTimeout(() => {
          const emailVerificationDialog = Array.from(
            document.querySelectorAll("input[type='email']")
          ).some(
            (input) =>
              input.parentElement &&
              input.parentElement.innerText.includes(
                "To verify this member knows you, please enter their email to connect."
              )
          );

          if (emailVerificationDialog) {
            console.log("Email verification required, dismissing the dialog.");
            document.body.click();
          } else {
            const withdrawButton = Array.from(
              document.querySelectorAll(".artdeco-button__text")
            ).find((button) => button.innerText.trim() === "Withdraw");

            if (withdrawButton) {
              console.log("Withdraw button encountered, skipping request.");
              const closeButton = document.querySelector(
                ".artdeco-modal__dismiss"
              );
              if (closeButton) {
                closeButton.click();
                console.log("Withdraw modal closed.");
              }
            } else {
              const sendButton = Array.from(
                document.querySelectorAll(".artdeco-button__text")
              ).find(
                (button) => button.innerText.trim() === "Send without a note"
              );
              if (sendButton) {
                setTimeout(() => {
                  sendButton.click();
                  console.log("Connection request sent.");
                }, getRandomDelay(1000, 2000));
              }
            }
          }
          connectInterval = setTimeout(
            connectToUsers,
            getRandomDelay(2000, 4000)
          );
        }, getRandomDelay(1000, 2000));
      }, getRandomDelay(1000, 2000));
    }
  };

  scrollDown();
}
