---
title: Git Advanced Guide
description: Master Git submodules, rebasing, hooks, and advanced workflows for professional development
---


## Git Submodules

Git submodules allow you to keep a Git repository as a subdirectory of another Git repository. This is useful for managing dependencies or shared libraries.

### Why Use Submodules?

- **Manage external dependencies**: Include third-party libraries
- **Share code across projects**: Reuse common components
- **Version control dependencies**: Lock dependencies to specific versions
- **Separate concerns**: Keep related but independent codebases together

### Adding Submodules

```bash
# Add a submodule
git submodule add https://github.com/username/library.git libs/library

# Add submodule to specific path
git submodule add https://github.com/username/ui-components.git src/components/shared

# Commit the submodule
git add .gitmodules libs/library
git commit -m "Add library submodule"
git push origin main
```

**What happens:**
- Creates a `.gitmodules` file tracking submodule configuration
- Clones the submodule repository into specified path
- Records the specific commit SHA of the submodule

### Cloning a Repository with Submodules

```bash
# Clone and initialize submodules in one command
git clone --recursive https://github.com/username/project.git

# Or clone first, then initialize submodules
git clone https://github.com/username/project.git
cd project
git submodule init
git submodule update

# Shorthand for init + update
git submodule update --init --recursive
```

### Updating Submodules

```bash
# Update all submodules to latest commit
git submodule update --remote

# Update specific submodule
git submodule update --remote libs/library

# Pull latest changes in submodule
cd libs/library
git pull origin main
cd ../..
git add libs/library
git commit -m "Update library submodule to latest version"
```

### Working Inside Submodules

```bash
# Navigate to submodule
cd libs/library

# Check current commit
git log -1

# Switch to specific branch
git checkout main

# Make changes (if you have write access)
git add .
git commit -m "Fix bug in library"
git push origin main

# Return to parent repository
cd ../..

# Update parent to track new commit
git add libs/library
git commit -m "Update library submodule with bug fix"
git push origin main
```

### Removing Submodules

```bash
# 1. Deinitialize the submodule
git submodule deinit -f libs/library

# 2. Remove from .git/modules
rm -rf .git/modules/libs/library

# 3. Remove from working tree
git rm -f libs/library

# 4. Commit the removal
git commit -m "Remove library submodule"
```

### Submodule Best Practices

```bash
# Always specify branch to track
git submodule add -b main https://github.com/username/library.git libs/library

# Update to track branch automatically
git config -f .gitmodules submodule.libs/library.branch main

# Check submodule status
git submodule status

# View .gitmodules configuration
cat .gitmodules
```

### Common Submodule Issues

**Issue: Submodule is empty after clone**
```bash
git submodule update --init --recursive
```

**Issue: Submodule detached HEAD**
```bash
cd libs/library
git checkout main
cd ../..
```

**Issue: Update all submodules to latest**
```bash
git submodule update --remote --merge
```

## Interactive Rebase

Interactive rebase allows you to modify commit history before pushing.

### Basic Interactive Rebase

```bash
# Rebase last 3 commits
git rebase -i HEAD~3

# Rebase from specific commit
git rebase -i abc1234
```

**Interactive rebase editor opens:**
```
pick a1b2c3d Add login feature
pick e4f5g6h Fix typo in login
pick i7j8k9l Update documentation

# Commands:
# p, pick = use commit
# r, reword = use commit, but edit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like squash, but discard commit message
# d, drop = remove commit
```

### Squashing Commits

Combine multiple commits into one:

```bash
# Change to:
pick a1b2c3d Add login feature
squash e4f5g6h Fix typo in login
squash i7j8k9l Update documentation

# Save and exit, then edit the combined commit message
```

### Rewording Commits

```bash
# Change to:
reword a1b2c3d Add login feature
pick e4f5g6h Fix typo in login

# Save and exit, editor opens to change message
```

### Editing Commits

```bash
# Change to:
edit a1b2c3d Add login feature
pick e4f5g6h Fix typo in login

# Save and exit, make changes, then:
git add .
git rebase --continue
```

### Practical Rebase Example

```bash
# Clean up messy commit history before push
git log --oneline -5
# Output:
# a1b2c3d WIP
# e4f5g6h Fix bug
# i7j8k9l Add feature
# m0n1o2p Fix typo
# q3r4s5t Update feature

git rebase -i HEAD~5

# Squash all into one clean commit
pick i7j8k9l Add feature
squash q3r4s5t Update feature
squash e4f5g6h Fix bug
squash m0n1o2p Fix typo
squash a1b2c3d WIP

# Results in one commit: "Add feature with bug fixes"
```

## Cherry-Picking

Apply specific commits from one branch to another.

### Basic Cherry-Pick

```bash
# Switch to target branch
git checkout main

# Cherry-pick specific commit
git cherry-pick abc1234

# Cherry-pick multiple commits
git cherry-pick abc1234 def5678

# Cherry-pick range of commits
git cherry-pick abc1234..def5678
```

### Cherry-Pick with Edit

```bash
# Cherry-pick and edit commit message
git cherry-pick -e abc1234

# Cherry-pick without committing (stage changes only)
git cherry-pick -n abc1234
```

### Resolving Cherry-Pick Conflicts

```bash
# If conflicts occur
git cherry-pick abc1234

# Fix conflicts in files
git add .
git cherry-pick --continue

# Or abort
git cherry-pick --abort
```

### Practical Cherry-Pick Example

```bash
# Feature branch has a bug fix we need in main
git checkout feature/new-ui
git log --oneline
# def5678 Fix critical security vulnerability
# abc1234 Add new UI components

# Cherry-pick just the bug fix
git checkout main
git cherry-pick def5678
git push origin main
```

## Git Hooks

Automate tasks at specific points in Git workflow.

### Types of Hooks

**Client-side hooks:**
- `pre-commit`: Run before commit
- `prepare-commit-msg`: Edit default message
- `commit-msg`: Validate commit message
- `post-commit`: Run after commit
- `pre-push`: Run before push

**Server-side hooks:**
- `pre-receive`: Run before accepting push
- `update`: Run once per branch being pushed
- `post-receive`: Run after push completes

### Creating a Pre-Commit Hook

```bash
# Navigate to hooks directory
cd .git/hooks

# Create pre-commit hook
cat > pre-commit << 'EOF'
#!/bin/sh

# Run tests before commit
npm test

# Check for console.log statements
if git diff --cached | grep -i "console.log"; then
    echo "Error: Remove console.log statements before committing"
    exit 1
fi

echo "Pre-commit checks passed!"
exit 0
EOF

# Make executable
chmod +x pre-commit
```

### Commit Message Hook

```bash
# Create commit-msg hook
cat > .git/hooks/commit-msg << 'EOF'
#!/bin/sh

commit_msg_file=$1
commit_msg=$(cat "$commit_msg_file")

# Ensure commit message starts with capital letter
if ! echo "$commit_msg" | grep -q '^[A-Z]'; then
    echo "Error: Commit message must start with a capital letter"
    exit 1
fi

# Ensure commit message is at least 10 characters
if [ ${#commit_msg} -lt 10 ]; then
    echo "Error: Commit message too short (minimum 10 characters)"
    exit 1
fi

exit 0
EOF

chmod +x .git/hooks/commit-msg
```

### Pre-Push Hook

```bash
# Create pre-push hook
cat > .git/hooks/pre-push << 'EOF'
#!/bin/sh

protected_branch='main'
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ "$current_branch" = "$protected_branch" ]; then
    read -p "You're about to push to main. Are you sure? [y/n] " -n 1 -r < /dev/tty
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

exit 0
EOF

chmod +x .git/hooks/pre-push
```

### Bypassing Hooks

```bash
# Skip pre-commit hook
git commit --no-verify -m "Emergency fix"

# Skip pre-push hook
git push --no-verify origin main
```

## Advanced Workflows

### GitFlow Workflow

Popular branching model for larger projects.

```bash
# Main branches
# - main: Production code
# - develop: Integration branch

# Create develop branch
git checkout -b develop main

# Feature development
git checkout -b feature/user-auth develop
# ... work on feature ...
git checkout develop
git merge --no-ff feature/user-auth
git branch -d feature/user-auth
git push origin develop

# Release preparation
git checkout -b release/1.0.0 develop
# ... bug fixes, version bumps ...
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git checkout develop
git merge --no-ff release/1.0.0
git branch -d release/1.0.0

# Hotfix
git checkout -b hotfix/1.0.1 main
# ... fix critical bug ...
git checkout main
git merge --no-ff hotfix/1.0.1
git tag -a v1.0.1 -m "Hotfix version 1.0.1"
git checkout develop
git merge --no-ff hotfix/1.0.1
git branch -d hotfix/1.0.1
```

### Trunk-Based Development

Simple workflow with short-lived branches.

```bash
# All work happens on main or short-lived branches
git checkout -b feature/quick-fix main

# Make small changes
git add .
git commit -m "Fix navigation bug"

# Merge quickly (within a day)
git checkout main
git merge feature/quick-fix
git push origin main
git branch -d feature/quick-fix
```

## Advanced Git Commands

### Bisect (Find Bug-Introducing Commit)

```bash
# Start bisecting
git bisect start

# Mark current commit as bad
git bisect bad

# Mark a known good commit
git bisect good abc1234

# Git checks out a commit in between
# Test it, then mark as good or bad
git bisect good  # or git bisect bad

# Repeat until bug is found
# Git will identify the problematic commit

# End bisecting
git bisect reset
```

### Reflog (Recover Lost Commits)

```bash
# View reference log
git reflog

# Output:
# abc1234 HEAD@{0}: commit: Add feature
# def5678 HEAD@{1}: commit: Fix bug
# ghi9012 HEAD@{2}: reset: moving to HEAD~1

# Recover lost commit
git reset --hard HEAD@{1}

# Or create branch from lost commit
git branch recovered-work HEAD@{2}
```

### Worktrees (Multiple Working Directories)

```bash
# List worktrees
git worktree list

# Create new worktree
git worktree add ../project-feature feature/new-feature

# Work in both simultaneously
cd ../project-feature
# ... make changes ...

# Remove worktree
git worktree remove ../project-feature
```

### Clean Up Repository

```bash
# Remove untracked files (dry run)
git clean -n

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Remove ignored files too
git clean -fdx

# Prune remote branches
git remote prune origin

# Optimize repository
git gc --aggressive
```

## Performance Optimization

### Shallow Clone (Faster for Large Repos)

```bash
# Clone only recent history
git clone --depth 1 https://github.com/username/large-repo.git

# Fetch full history later if needed
git fetch --unshallow
```

### Sparse Checkout (Clone Specific Directories)

```bash
# Initialize sparse checkout
git clone --no-checkout https://github.com/username/repo.git
cd repo
git sparse-checkout init --cone

# Checkout specific directories
git sparse-checkout set src/components src/utils

# Checkout files
git checkout main
```

### Partial Clone (Filter Objects)

```bash
# Clone without blobs (download on demand)
git clone --filter=blob:none https://github.com/username/repo.git

# Clone without large files
git clone --filter=blob:limit=1m https://github.com/username/repo.git
```

## Quick Reference

| Command | Description |
|---------|-------------|
| `git submodule add <url> <path>` | Add submodule |
| `git submodule update --init` | Initialize submodules |
| `git submodule update --remote` | Update all submodules |
| `git rebase -i HEAD~N` | Interactive rebase |
| `git cherry-pick <commit>` | Apply specific commit |
| `git bisect start` | Find bug-introducing commit |
| `git reflog` | View reference history |
| `git clean -fd` | Remove untracked files |
| `git worktree add <path> <branch>` | Create worktree |

## Best Practices

1. **Use Submodules Wisely**: Only when truly needed, consider alternatives like package managers
2. **Rebase Private Branches**: Keep feature branches clean before merging
3. **Never Rebase Public History**: Don't rebase commits already pushed to shared branches
4. **Write Custom Hooks**: Automate repetitive checks and tasks
5. **Use GitFlow for Releases**: Great for projects with scheduled releases
6. **Trunk-Based for CI/CD**: Better for continuous deployment workflows
7. **Regular Maintenance**: Clean up old branches, optimize repo periodically

## Troubleshooting

### Undo a Bad Rebase

```bash
git reflog
git reset --hard HEAD@{before-rebase}
```

### Fix Submodule Issues

```bash
git submodule deinit -f .
git submodule update --init --recursive
```

### Resolve Detached HEAD

```bash
git checkout -b temp-branch
git checkout main
git merge temp-branch
```

## Conclusion

You've now mastered advanced Git techniques! These tools will help you:

- Manage complex projects with submodules
- Maintain clean commit history
- Automate workflows with hooks
- Choose appropriate strategies for your team
- Recover from mistakes confidently

Keep practicing these techniques and adapt them to your specific workflow needs!
