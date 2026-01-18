# GitHub User Activity

## 📌 Project Overview

Build a simple **Command Line Interface (CLI)** that uses the **GitHub API** to fetch and display a user’s recent public activity directly in the terminal. This project is designed to help you practice working with APIs, JSON data, and CLI application development. :contentReference[oaicite:0]{index=0}

---

## 🎯 Requirements

Your CLI should:

- Run from the terminal and accept a GitHub username as an argument.
- Fetch the user’s recent activity using the GitHub API.
- Display the activity in a human-readable format in the terminal.
- Handle errors gracefully (e.g., invalid username, API failures).
- Be implemented in any language of your choice.
- **Do not use external libraries/frameworks for the GitHub API fetch.** :contentReference[oaicite:1]{index=1}

---

## 🛠 Technical Details

### CLI Usage Example

```bash
github-activity <username>
```

Replace <username> with the GitHub username you want to inspect.

GitHub API Endpoint

To fetch events, use:

https://api.github.com/users/<username>/events

Example:

https://api.github.com/users/kamranahmedse/events

This returns a list of recent public events the user has performed on GitHub.

🧾 Output Expectations

Your CLI should parse the response and produce readable, informative messages like:

Pushed 3 commits to kamranahmedse/developer-roadmap
Opened a new issue in kamranahmedse/developer-roadmap
Starred kamranahmedse/developer-roadmap

The exact format is up to your implementation, so long as it’s clear and meaningful to the user.

💡 Bonus Enhancements (Optional)

Once the base functionality works, consider extending the tool with:

Filtering events by type (push, issue, star, etc.).

Display in structured formats (e.g., JSON, tables).

Caching responses to reduce API calls.

This isn’t required but can improve usability and performance.

🚀 Why This Project Matters

This CLI project is not only a practical way to get hands-on with:

HTTP requests and REST APIs

Terminal I/O

Parsing and formatting JSON

Error handling in real-world scenarios

…but also a solid portfolio piece showcasing backend and tooling skills.

📌 Notes

You can implement this in Node.js, Python, Go, Rust, Shell script, or any language that supports HTTP requests.

Keep the code clean, robust, and user-friendly.

Include example screenshots or sample outputs in your GitHub README for best presentation.
