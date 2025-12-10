---
title: Git Intermediate Guide
description: Master branching, merging, remote repositories, and collaboration workflows
---



Remote repositories are versions of your project hosted on the internet or network. The most common platforms are GitHub, GitLab, and Bitbucket.

### Adding a Remote Repository

```bash
# Add a remote repository
git remote add origin https://github.com/username/repository.git

# View remote repositories
git remote -v

# Output:
# origin  https://github.com/username/repository.git (fetch)
# origin  https://github.com/username/repository.git (push)
```

### Pushing Changes

Upload your local commits to a remote repository.

```bash
# Push to remote repository
git push origin main

# Push and set upstream (first time)
git push -u origin main

# Push all branches
git push --all origin

# Force push (use with caution!)
git push --force origin main
```

### Fetching and Pulling Changes

Download changes from a remote repository.

```bash
# Fetch changes (doesn't merge)
git fetch origin

# Pull changes (fetch + merge)
git pull origin main

# Pull with rebase
git pull --rebase origin main
```

**Difference between Fetch and Pull:**
- `git fetch`: Downloads changes but doesn't merge them
- `git pull`: Downloads and automatically merges changes

## Branching Strategies

Branches allow you to develop features in isolation without affecting the main codebase.

### Creating and Switching Branches

```bash
# Create a new branch
git branch feature/user-authentication

# Switch to a branch
git checkout feature/user-authentication

# Create and switch (shorthand)
git checkout -b feature/user-authentication

# Modern way (Git 2.23+)
git switch -c feature/user-authentication

# List all branches
git branch

# List all branches including remote
git branch -a
```

### Branch Naming Conventions

Follow these best practices for naming branches:

```bash
# Feature branches
git checkout -b feature/add-login-page
git checkout -b feature/payment-integration

# Bug fix branches
git checkout -b fix/header-alignment
git checkout -b bugfix/memory-leak

# Hotfix branches
git checkout -b hotfix/security-patch

# Release branches
git checkout -b release/v1.2.0
```

### Working with Branches

```bash
# Create feature branch
git checkout -b feature/shopping-cart

# Make changes and commit
git add .
git commit -m "Add shopping cart functionality"

# Push branch to remote
git push -u origin feature/shopping-cart

# Switch back to main
git checkout main

# Delete local branch
git branch -d feature/shopping-cart

# Force delete (if not merged)
git branch -D feature/shopping-cart

# Delete remote branch
git push origin --delete feature/shopping-cart
```

## Merging Branches

Combine changes from different branches.

### Fast-Forward Merge

When there are no diverging commits:

```bash
# Switch to main branch
git checkout main

# Merge feature branch
git merge feature/shopping-cart

# Output: Fast-forward
```

### Three-Way Merge

When branches have diverged:

```bash
# Switch to main branch
git checkout main

# Merge feature branch
git merge feature/shopping-cart

# Git will create a merge commit
```

### Merge with No Fast-Forward

Always create a merge commit (preserves branch history):

```bash
git merge --no-ff feature/shopping-cart
```

## Resolving Merge Conflicts

Conflicts occur when the same lines are changed in different branches.

### Example Conflict

```bash
# Attempt to merge
git merge feature/new-feature

# Output:
# Auto-merging index.html
# CONFLICT (content): Merge conflict in index.html
# Automatic merge failed; fix conflicts and then commit the result.
```

### Resolving Conflicts

```bash
# 1. Check status
git status

# 2. Open conflicted file(s)
# You'll see conflict markers:
```

**Conflicted File:**
```html
<!DOCTYPE html>
<html>
<body>
<<<<<<< HEAD
    <h1>Welcome to My Site</h1>
=======
    <h1>Welcome to Our Website</h1>
>>>>>>> feature/new-feature
</body>
</html>
```

**Resolved File:**
```html
<!DOCTYPE html>
<html>
<body>
    <h1>Welcome to Our Website</h1>
</body>
</html>
```

```bash
# 3. Mark as resolved
git add index.html

# 4. Complete the merge
git commit -m "Merge feature/new-feature and resolve conflicts"

# Abort merge if needed
git merge --abort
```

## Stashing Changes

Temporarily save uncommitted changes.

### Basic Stashing

```bash
# Stash current changes
git stash

# Stash with a message
git stash save "Work in progress on login feature"

# List all stashes
git stash list

# Output:
# stash@{0}: On main: Work in progress on login feature
# stash@{1}: WIP on main: 1234567 Previous work

# Apply most recent stash
git stash apply

# Apply and remove stash
git stash pop

# Apply specific stash
git stash apply stash@{1}

# Remove a stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

### Stash Untracked Files

```bash
# Stash including untracked files
git stash -u

# Stash including ignored files
git stash -a
```

### Practical Stashing Example

```bash
# Working on a feature
git checkout feature/user-profile
# ... make changes ...

# Emergency bug fix needed!
git stash save "User profile work in progress"

# Switch to main and fix bug
git checkout main
git checkout -b hotfix/critical-bug
# ... fix bug, commit, merge ...

# Back to feature work
git checkout feature/user-profile
git stash pop
```

## Viewing History and Diffs

### Advanced Log Commands

```bash
# One line per commit
git log --oneline

# Graph view of branches
git log --oneline --graph --all

# Last 5 commits with stats
git log -5 --stat

# Commits by author
git log --author="John Doe"

# Commits in date range
git log --since="2 weeks ago" --until="yesterday"

# Commits affecting specific file
git log -- path/to/file.js

# Pretty format
git log --pretty=format:"%h - %an, %ar : %s"
```

### Viewing Differences

```bash
# Differences between working directory and staging
git diff

# Differences between staging and last commit
git diff --staged

# Differences between branches
git diff main feature/new-feature

# Differences for specific file
git diff main feature/new-feature -- index.html

# Word-level differences
git diff --word-diff

# Statistics only
git diff --stat
```

## Tagging Releases

Tags mark specific points in history, typically for releases.

### Creating Tags

```bash
# Lightweight tag
git tag v1.0.0

# Annotated tag (recommended)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag a specific commit
git tag -a v0.9.0 abc1234 -m "Beta release"

# List all tags
git tag

# Show tag information
git show v1.0.0
```

### Pushing Tags

```bash
# Push specific tag
git push origin v1.0.0

# Push all tags
git push origin --tags
```

### Deleting Tags

```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
```

## Undoing Changes

### Unstage Files

```bash
# Unstage a file
git reset HEAD index.html

# Unstage all files
git reset HEAD
```

### Discard Working Directory Changes

```bash
# Discard changes in a file
git checkout -- index.html

# Discard all changes
git checkout -- .

# Modern way (Git 2.23+)
git restore index.html
```

### Amend Last Commit

```bash
# Change last commit message
git commit --amend -m "New commit message"

# Add forgotten files to last commit
git add forgotten_file.js
git commit --amend --no-edit
```

### Reset Commits

```bash
# Soft reset (keep changes staged)
git reset --soft HEAD~1

# Mixed reset (keep changes unstaged) - default
git reset HEAD~1

# Hard reset (discard all changes)
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard abc1234
```

## Collaboration Workflow

### Feature Branch Workflow

```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/add-comments

# 3. Work on feature
git add .
git commit -m "Add comment system"

# 4. Push to remote
git push -u origin feature/add-comments

# 5. Create pull request on GitHub/GitLab
# (Done through web interface)

# 6. After approval, merge via web interface or:
git checkout main
git merge feature/add-comments
git push origin main

# 7. Delete feature branch
git branch -d feature/add-comments
git push origin --delete feature/add-comments
```

### Keeping Feature Branch Updated

```bash
# Update feature branch with latest main
git checkout feature/my-feature
git fetch origin
git rebase origin/main

# Or merge approach
git merge origin/main
```

## Quick Reference

| Command | Description |
|---------|-------------|
| `git remote add origin <url>` | Add remote repository |
| `git push origin <branch>` | Push branch to remote |
| `git pull origin <branch>` | Pull changes from remote |
| `git checkout -b <branch>` | Create and switch to branch |
| `git merge <branch>` | Merge branch into current |
| `git stash` | Save uncommitted changes |
| `git stash pop` | Apply and remove stash |
| `git tag -a <tag> -m "<msg>"` | Create annotated tag |
| `git log --oneline --graph` | View branch graph |
| `git reset --hard HEAD~1` | Undo last commit |

## Best Practices

1. **Commit Often**: Make small, focused commits
2. **Write Clear Messages**: Explain what and why, not how
3. **Pull Before Push**: Always sync before pushing
4. **Use Branches**: Don't work directly on main
5. **Review Before Merge**: Always review changes
6. **Tag Releases**: Mark important milestones
7. **Keep History Clean**: Use rebase when appropriate

## Next Steps

Ready for advanced Git techniques? Check out the **Git Advanced Guide** to learn about:

- Git submodules
- Interactive rebase
- Cherry-picking
- Git hooks
- Advanced workflows
