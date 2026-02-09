---
name: git-sync
description: Synchronize changes to GitHub repository with automatic commit and push. Use when: (1) User says "coding is done", (2) User says "sync git", (3) Significant coding work is completed and needs to be saved, (4) User explicitly requests to commit and push changes. Handles staging files, creating commits with descriptive messages, and pushing to remote.
---

# Git Sync Skill

Automatically synchronize local changes to GitHub repository with intelligent commit messages and safe push operations.

## When to Use

This skill triggers when:
- User says "coding is done" or "sync git"
- Significant coding work is completed
- User explicitly requests to commit and push changes

## Workflow

### 1. Check Repository Status

First, check what has changed:

```bash
git status
git diff --stat
```

Review the changes to understand what was modified.

### 2. Stage Changes

**Important:** Be selective about what to stage. Avoid staging:
- Sensitive files (.env, credentials, secrets)
- Large binary files unnecessarily
- Temporary or cache files

Stage specific files by name:

```bash
git add <file1> <file2> <file3>
```

For related groups of files, you may use:

```bash
git add <directory>/*.py
git add trackatool/app/
```

**Only use `git add -A` or `git add .` if you've verified all changes should be committed.**

### 3. Create Descriptive Commit Message

Generate a commit message that:
- Starts with a verb (Add, Update, Fix, Refactor, etc.)
- Summarizes the changes concisely
- Focuses on "why" rather than "what"
- Includes Co-Authored-By line

Example format:

```bash
git commit -m "$(cat <<'EOF'
Add Flask application structure for TIE tracker

- Implement authentication system with Flask-Login
- Create dashboard with job statistics
- Add job tracking and service history views
- Configure SQL Server 2019 connection

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

### 4. Push to Remote

**Safety check:** Before pushing, verify:
- You're on the correct branch
- The remote is correct
- No force push is needed

```bash
# Check current branch and remote
git branch --show-current
git remote -v

# Push changes
git push
```

If the branch doesn't track a remote yet:

```bash
git push -u origin <branch-name>
```

## Safety Guidelines

### Do NOT:
- Use `--force` or `--force-with-lease` unless explicitly requested
- Push to main/master branch without verification
- Skip hooks with `--no-verify` unless explicitly requested
- Commit sensitive files (.env, credentials, API keys)
- Create empty commits when there are no changes

### DO:
- Review `git status` and `git diff` before staging
- Stage files selectively by name when possible
- Write descriptive commit messages
- Include Co-Authored-By attribution
- Check for pre-commit hook failures and fix issues
- Create NEW commits after hook failures (not amend)

## Error Handling

### Pre-commit Hook Failure

If a pre-commit hook fails, the commit did NOT happen. Fix the issue and create a NEW commit:

```bash
# Fix the issues reported by the hook
# Then stage and commit again (do NOT use --amend)
git add <fixed-files>
git commit -m "message"
```

### Push Rejected (Non-fast-forward)

If push is rejected, pull first:

```bash
git pull --rebase
git push
```

### Authentication Issues

If authentication fails, verify credentials or SSH keys are configured correctly.

## Example Usage

**Scenario:** User completes Flask application implementation

```bash
# 1. Check status
git status
git diff --stat

# 2. Stage files
git add trackatool/app/*.py
git add trackatool/requirements.txt
git add trackatool/README.md

# 3. Commit with descriptive message
git commit -m "$(cat <<'EOF'
Implement complete Flask application for repair tracking

- Add SQLAlchemy models for 7 database tables
- Create authentication system with Flask-Login
- Build dashboard with job statistics
- Implement job tracking and service history views
- Add technical library search functionality
- Create repair request submission form

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"

# 4. Push to remote
git push
```

## Integration with Development Workflow

After using this skill:
- Verify the commit appears on GitHub
- Check that CI/CD pipelines pass (if configured)
- Inform the user of successful sync with commit SHA
