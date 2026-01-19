# GitHub User Activity CLI

https://roadmap.sh/projects/github-user-activity

A simple **Command Line Interface (CLI)** application that fetches and displays a GitHub user’s recent public activity using the **GitHub API**.

This project is designed to strengthen your understanding of:

- Working with public APIs
- Parsing JSON responses
- Building CLI tools
- Handling errors gracefully

Project reference:  
https://roadmap.sh/projects/github-user-activity

---

## 📌 Project Overview

The GitHub User Activity CLI allows you to retrieve and display a user’s **recent public GitHub activity** directly in your terminal by providing a GitHub username.

The application communicates with GitHub’s public REST API and presents the activity in a **human-readable format**, without relying on external API libraries.

---

## 🎯 Requirements

Your CLI **must**:

- Run from the terminal
- Accept a GitHub username as a command-line argument
- Fetch recent public activity from the GitHub API
- Display activity in a readable format
- Handle errors gracefully (invalid username, network issues, API failures)
- Be implemented in **any programming language**
- **Not use external libraries/frameworks** for the GitHub API request

---

## 🛠 Technical Details

### CLI Usage

```bash
github-activity <username>
```

# Exmple

```bash
github-activity octocat
```

---

# GitHub API Endpoint

The CLI should fetch data from the following endpoint:

```bash
https://api.github.com/users/<username>/events
```

Replace <username> with the GitHub username provided via the CLI argument.

---

# 📋 Expected Output

The output should summarize recent activity in a clear, readable format:

```text
Recent activity for GitHub user "octocat":

- Pushed 3 commits to octocat/Hello-World
- Opened a new issue in octocat/Hello-World
- Starred microsoft/vscode
- Created a new repository called "awesome-project"
```

Output formatting is flexible, but each event should clearly describe what happened and where.

---

# 🚦 Error Handling

Your CLI should handle the following cases:

Missing Username

```bash
Error: No username provided.
Usage: github-activity <username>
```

Invalid Username

```bash
Error: User "notarealuser123" not found.
```

API or Network Failure

```bash
Error: Unable to fetch data from GitHub API. Please try again later.
```

---

# 🏁 Example Workflow

```bash
$ github-activity octocat

Recent activity for GitHub user "octocat":
- Pushed 2 commits to octocat/Hello-World
- Created issue #42 in octocat/Hello-World
- Starred vercel/next.js

```
