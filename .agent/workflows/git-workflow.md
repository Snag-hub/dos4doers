---
description: Git workflow for feature development
---

# Git Workflow

## Branch Strategy

**IMPORTANT**: Never push changes directly to `main` branch.

### For New Features or Fixes

1. **Create a new feature branch** from main:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/descriptive-name
   ```
   
   Branch naming conventions:
   - `feature/` - for new features (e.g., `feature/tag-color-picker`)
   - `fix/` - for bug fixes (e.g., `fix/checkbox-visibility`)
   - `refactor/` - for code refactoring (e.g., `refactor/sidebar-components`)
   - `chore/` - for maintenance tasks (e.g., `chore/update-dependencies`)

2. **Make changes and commit** on the feature branch:
   ```bash
   git add .
   git commit -m "descriptive commit message"
   ```

3. **Push the feature branch** to remote:
   ```bash
   git push origin feature/descriptive-name
   ```

4. **Create a Pull Request** to merge into main:
   ```bash
   gh pr create --base main --head feature/descriptive-name --title "PR Title" --body "PR Description"
   ```

5. **After PR is merged**, delete the feature branch:
   ```bash
   git checkout main
   git pull origin main
   git branch -d feature/descriptive-name
   ```

### Quick Commands

- Check current branch: `git branch --show-current`
- Switch branches: `git checkout branch-name`
- List all branches: `git branch -a`
- Delete local branch: `git branch -d branch-name`

### Emergency Hotfixes

For critical production issues:
1. Create a `hotfix/` branch from main
2. Make the fix
3. Create PR with high priority
4. Merge immediately after review
