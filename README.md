# Chrome Extension for LinkedIn Automation

This Chrome extension automates two key tasks on LinkedIn:

1. **Unfollow** users you are following.
2. **Send connection requests** to people on LinkedIn.

It allows you to choose between these two tasks, runs them in the background, and stops with the click of a button. The page is refreshed automatically when you stop the process.

---

## Features

- **Unfollow Automation**: Automatically unfollows users you follow on LinkedIn.
- **Connect Automation**: Automatically sends connection requests to people on LinkedIn.
- **Start/Stop Control**: Start and stop the automation with one click. The page refreshes when the process is stopped..

---

## Getting Started

### Prerequisites

- **Google Chrome** installed on your computer.
- Basic understanding of how to load a Chrome extension.

### Installation

1. **Clone or Download this repository** to your local machine.

   ```bash
   git clone https://github.com/yourusername/linkedin-automation-extension.git
   ```

   Or download the ZIP file from GitHub.

2. **Unzip the folder** (if downloaded as ZIP).

3. **Load the extension in Chrome**:

   - Open **Google Chrome**.
   - Go to `chrome://extensions/` in the address bar.
   - Enable **Developer Mode** (toggle switch in the top-right corner).
   - Click on **"Load unpacked"**.
   - Select the folder where you downloaded or cloned this extension.

4. **Activate the Extension**:
   - Once the extension is loaded, you’ll see the LinkedIn Automation extension icon in your Chrome toolbar.

---

## Usage

1. **Go to LinkedIn**: Open LinkedIn in your browser and log in.
2. **Open the Extension**: Click the LinkedIn Automation extension icon in the toolbar.

3. **Select the Task**:
   - **Toggle** the switch for the task you want:
     - **Unfollow**: Automatically unfollows users.
     - **Connect**: Automatically sends connection requests.
4. **Start the Automation**:
   - Click the **Start** button to begin the process.
5. **Stop the Automation**:
   - Click the **Stop** button to stop the process. The page will automatically refresh when stopped.

---

## Files Overview

- `manifest.json`: The file that contains the extension’s metadata.
- `background.js`: Handles the background functionality and messaging between the content script and the Chrome extension.
- `content.js`: Contains the code that interacts with LinkedIn's interface to automate actions like unfollowing and connecting with users.
- `popup.html`: The simple interface for the extension with buttons to start/stop and toggles for tasks.
- `popup.js`: Contains the logic for controlling the start/stop buttons and toggling automation tasks.

---

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Disclaimer

This Chrome extension automates actions on LinkedIn. Use it responsibly and ensure it complies with LinkedIn's terms of service. Overuse or misuse of automation tools may result in penalties, including account suspension.
