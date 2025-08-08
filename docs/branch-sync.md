# Branch Sync Automation

## Overview

Automatic synchronization of the `preview` branch with `main` branch updates.

## How It Works

### Trigger

- **Automatic:** Runs whenever code is pushed to `main` branch
- **Manual:** Can be triggered via GitHub Actions "Run workflow" button

### Process

1. **Checkout main:** Gets the latest main branch code
2. **Configure Git:** Sets up GitHub Actions bot as committer
3. **Sync branches:** Merges main into preview (fast-forward when possible)
4. **Push updates:** Updates the remote preview branch
5. **Summary:** Reports success in GitHub Actions summary

### Workflow File

`.github/workflows/sync-preview.yml`

## Benefits

### ✅ Automatic Sync

- Preview branch stays current with main automatically
- No manual intervention required
- Runs immediately after main branch updates

### ✅ Netlify Integration

- Preview deployments update automatically
- Always have latest preview environment
- Stakeholders see current state without waiting

### ✅ Dependabot Friendly

- When Dependabot PRs are merged to main, preview updates automatically
- Preview environment gets dependency updates immediately
- Testing new dependencies in preview before promoting

## Usage Examples

### After Merging a PR to Main

```
1. PR merged to main →
2. Sync workflow triggers automatically →
3. Preview branch updated →
4. Netlify rebuilds preview site
```

### After Merging Dependabot Updates

```
1. Dependabot PR merged to main →
2. Preview branch gets dependency updates →
3. Preview deployment uses new versions →
4. Validate updates in preview environment
```

### Manual Sync (if needed)

```
1. Go to GitHub Actions tab
2. Select "Sync Preview Branch" workflow
3. Click "Run workflow" button
4. Select main branch and run
```

## Monitoring

### GitHub Actions

- Check workflow runs in Actions tab
- View logs if sync fails
- Monitor sync frequency and success rate

### Netlify Deployments

- Preview deployments should trigger after sync
- Check Netlify dashboard for build status
- Verify preview site reflects main branch changes

## Troubleshooting

### Sync Conflicts

If main and preview have diverged significantly:

```bash
# Manual resolution
git checkout preview
git reset --hard origin/main
git push --force-with-lease origin preview
```

### Failed Workflow

Common causes and solutions:

- **Merge conflicts:** Resolve manually via Git commands above
- **Protected branch:** Ensure GitHub Actions has push permissions
- **Token issues:** Check GITHUB_TOKEN permissions in repository settings

## Configuration

### Repository Settings

- Ensure preview branch exists
- GitHub Actions enabled
- GITHUB_TOKEN has appropriate permissions

### Branch Protection (Optional)

- Preview branch can be protected to require status checks
- Allows blocking deployments if builds fail
- Maintains quality gate for preview environment

---

**The preview branch will now automatically stay in sync with main!** 🚀
