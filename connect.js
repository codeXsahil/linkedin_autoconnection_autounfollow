// This script is injected directly into the page.
// We attach functions to 'window' to prevent "already declared" errors on re-injection.

if (typeof window.getRandomDelay !== 'function') {
  window.getRandomDelay = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
}

if (typeof window.connectScrollDown !== 'function') {
  window.connectScrollDown = () => {
    window.scrollBy(0, window.getRandomDelay(500, 1000));
    console.log("Page scrolled down.");
    window.connectTimeoutId = setTimeout(
      window.connectToUsers, // Use window function
      window.getRandomDelay(1500, 3000)
    );
  };
}

if (typeof window.connectToUsers !== 'function') {
  window.connectToUsers = () => {
    const connectButtons = Array.from(
      document.querySelectorAll(".artdeco-button--secondary")
    ).filter((button) => button.innerText.trim() === "Connect");

    if (connectButtons.length === 0) {
      const nextButton = document.querySelector("button[aria-label*='Next']");
      if (nextButton) {
        console.log("Next button found, moving to the next page.");
        // !! THIS IS THE FIX !!
        // Just click the button. The script will die.
        // The service-worker will re-inject this script on the new page.
        setTimeout(() => nextButton.click(), window.getRandomDelay(1000, 2000)); // Use window function
      } else {
        console.log("No more connection buttons or pages available. Stopping.");
        return;
      }
    } else {
      const connectButton = connectButtons[0];
      setTimeout(() => {
        connectButton.click();
        console.log("Connect button clicked.");
        setTimeout(() => {
          // --- Your modal-handling logic ---
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
            document.body.click(); // Simple way to close
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
                }, window.getRandomDelay(1000, 2000)); // Use window function
              }
            }
          }
          // --- End of modal logic ---

          // Continue the loop ON THIS PAGE
          window.connectTimeoutId = setTimeout(
            window.connectToUsers, // Use window function
            window.getRandomDelay(2000, 4000)
          );
        }, window.getRandomDelay(1000, 2000)); // Use window function
      }, window.getRandomDelay(1000, 2000)); // Use window function
    }
  };
}

// Start the script
window.connectScrollDown();
