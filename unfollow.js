// This script is injected directly into the page.
// We attach functions to 'window' to prevent "already declared" errors on re-injection.

if (typeof window.getRandomDelay !== 'function') {
  window.getRandomDelay = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
}

if (typeof window.unfollowScrollDown !== 'function') {
  window.unfollowScrollDown = () => {
    window.scrollBy(0, window.getRandomDelay(500, 1000));
    console.log("Page scrolled down.");
    window.unfollowTimeoutId = setTimeout(
      window.unfollowUser, // Use window function
      window.getRandomDelay(1500, 3000)
    );
  };
}

if (typeof window.unfollowUser !== 'function') {
  window.unfollowUser = () => {
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
              }, window.getRandomDelay(500, 1000)); // Use window function
            }
          }
          window.unfollowTimeoutId = setTimeout(
            window.unfollowUser, // Use window function
            window.getRandomDelay(2000, 4000)
          );
        }, window.getRandomDelay(1000, 2000)); // Use window function
      }, window.getRandomDelay(1000, 2000)); // Use window function
    } else {
      console.log("No more 'Following' buttons found, scrolling down.");
      window.unfollowTimeoutId = setTimeout(
        window.unfollowScrollDown, // Use window function
        window.getRandomDelay(2000, 4000)
      );
    }
  };
}

// Start the script
window.unfollowScrollDown();
