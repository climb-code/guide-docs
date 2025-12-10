---
title: Git Beginner Guide
description: Learn the fundamentals of Git version control, from installation to basic commands
---


## What is Git?

Git is a **distributed version control system** that helps developers track changes in their code over time. It allows multiple developers to work on the same project simultaneously without conflicts and keeps a complete history of all changes.

### Key Benefits

- **Track Changes**: See what changed, when, and by whom
- **Collaboration**: Multiple developers can work together seamlessly
- **Branching**: Work on features independently without affecting the main code
- **Backup**: Your complete project history is stored safely
- **Revert Changes**: Undo mistakes easily

## Installing Git

### Windows
```bash
# Download from https://git-scm.com/download/win
# Or use package manager
winget install --id Git.Git -e --source winget
```

### macOS
```bash
# Using Homebrew
brew install git

# Or download from https://git-scm.com/download/mac
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install git
```

### Verify Installation
```bash
git --version
# Output: git version 2.x.x
```

## Basic Configuration

After installing Git, configure your identity. This information will be attached to your commits.

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Set default branch name to 'main'
git config --global init.defaultBranch main

# View your configuration
git config --list
```

## Essential Git Commands

### 1. Initialize a Repository

Create a new Git repository in your project folder.

```bash
# Navigate to your project folder
cd my-project

# Initialize Git repository
git init

# Output: Initialized empty Git repository in /path/to/my-project/.git/
```

### 2. Clone a Repository

Copy an existing repository from a remote server (like GitHub).

```bash
# Clone a repository
git clone https://github.com/username/repository-name.git

# Clone into a specific folder
git clone https://github.com/username/repository-name.git my-folder
```

### 3. Check Repository Status

View the current state of your repository.

```bash
git status
```

**Example Output:**
```
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html
        style.css

nothing added to commit but untracked files present
```

### 4. Add Files to Staging Area

Select which files you want to include in your next commit.

```bash
# Add a specific file
git add index.html

# Add multiple files
git add index.html style.css

# Add all files in current directory
git add .

# Add all files with a specific extension
git add *.js
```

### 5. Commit Changes

Save your staged changes with a descriptive message.

```bash
# Commit with a message
git commit -m "Add homepage and styling"

# Commit with a detailed message (opens editor)
git commit
```

**Best Practices for Commit Messages:**
- Use present tense ("Add feature" not "Added feature")
- Be clear and descriptive
- Keep the first line under 50 characters
- Add details in subsequent lines if needed

### 6. View Commit History

See all the commits made in your repository.

```bash
# View commit history
git log

# Compact view (one line per commit)
git log --oneline

# View last 5 commits
git log -5

# View commits with file changes
git log --stat
```

**Example Output:**
```
commit a1b2c3d4e5f6g7h8i9j0 (HEAD -> main)
Author: Your Name <your.email@example.com>
Date:   Mon Dec 9 21:00:00 2025 +0530

    Add homepage and styling
```

### 7. View Changes

Compare differences between versions.

```bash
# View unstaged changes
git diff

# View staged changes
git diff --staged

# View changes in a specific file
git diff index.html
```

## Basic Git Workflow

Here's a typical workflow for working with Git:

```bash
# 1. Check current status
git status

# 2. Make changes to your files
# (Edit index.html, add new features, etc.)

# 3. View what changed
git diff

# 4. Add files to staging area
git add index.html style.css

# 5. Commit your changes
git commit -m "Update homepage layout and add responsive styling"

# 6. View commit history
git log --oneline
```

## Practical Example: Creating Your First Repository

Let's create a simple website project and track it with Git:

```bash
# Step 1: Create project folder
mkdir my-website
cd my-website

# Step 2: Initialize Git
git init

# Step 3: Create some files
echo "<!DOCTYPE html><html><body><h1>My Website</h1></body></html>" > index.html
echo "body { font-family: Arial; }" > style.css

# Step 4: Check status
git status

# Step 5: Add files to staging
git add .

# Step 6: Create first commit
git commit -m "Initial commit: Add index and style files"

# Step 7: View history
git log
```

## Understanding Git States

Files in Git can be in three states:

1. **Modified**: Changed but not staged
2. **Staged**: Marked for next commit
3. **Committed**: Safely stored in repository

```bash
# Modified state
echo "New content" >> index.html

# Staged state
git add index.html

# Committed state
git commit -m "Update content"
```

## Common Beginner Mistakes

### 1. Forgetting to Add Files
```bash
# Wrong: Committing without adding
git commit -m "Update files"  # Nothing to commit!

# Right: Add first, then commit
git add .
git commit -m "Update files"
```

### 2. Unclear Commit Messages
```bash
# Bad commit messages
git commit -m "fix"
git commit -m "update"
git commit -m "changes"

# Good commit messages
git commit -m "Fix navigation menu alignment issue"
git commit -m "Update user authentication flow"
git commit -m "Add responsive design for mobile devices"
```

### 3. Not Checking Status
```bash
# Always check status before committing
git status
git add .
git commit -m "Your message"
```

## Quick Reference

| Command | Description |
|---------|-------------|
| `git init` | Initialize a new repository |
| `git clone <url>` | Clone a repository |
| `git status` | Check repository status |
| `git add <file>` | Add file to staging area |
| `git add .` | Add all files to staging |
| `git commit -m "message"` | Commit staged changes |
| `git log` | View commit history |
| `git log --oneline` | View compact history |
| `git diff` | View unstaged changes |

## Next Steps

Once you're comfortable with these basic commands, you're ready to move on to:

- Working with remote repositories (GitHub, GitLab)
- Creating and managing branches
- Collaborating with other developers
- Resolving conflicts

Check out the **Git Intermediate Guide** to learn these advanced topics!
