# Branch Sync Automation

## Overview

Two safe, loop-free automations keep `preview` and `main` flowing the right way:

- main → preview: when `main` updates, `preview` is synced forward automatically
- preview → main: when `preview` updates, a PR to `main` is opened/updated and set to auto-merge (if enabled)

## How It Works

### Triggers

- main → preview: automatic on any push to `main`; also manual via Actions UI
- preview → main: automatic on any push to `preview`; also manual via Actions UI

### Processes

## 1. main → preview

1. Checkout `main`
2. Configure git
3. Merge `main` into `preview` (fast-forward if possible)
4. Push `preview`
5. Summarize

## 2. preview → main

1. Detect if `preview` is ahead of `main`
2. Open or update a PR `preview` → `main`
3. Try to enable auto-merge via GraphQL (if repo allows auto-merge)
4. Summarize

### Workflow File

`.github/workflows/sync-preview.yml` (main → preview)

`.github/workflows/publish-from-preview.yml` (preview → main)

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

### ✅ Intentional Promotion

- `preview` changes are promoted to `main` through a normal PR
- Auto-merge can be enabled so merges happen after checks pass
- Avoids infinite automation loops by only pushing `preview` on `main` updates and only opening a PR on `preview` updates

- When Dependabot PRs are merged to main, preview updates automatically
- Preview environment gets dependency updates immediately
- Testing new dependencies in preview before promoting

## Usage Examples

### After Merging a PR to Main

```text
1. PR merged to main →
2. Sync workflow triggers automatically →
3. Preview branch updated →
4. Netlify rebuilds preview site
```

### After Merging Dependabot Updates

```text
1. Dependabot PR merged to main →
2. Preview branch gets dependency updates →
3. Preview deployment uses new versions →
4. Validate updates in preview environment
```

### Manual Sync (if needed)

```text
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

### Auto-merge Not Enabling

- Ensure repository has Auto-merge enabled (Settings → General → Pull Requests → Enable auto-merge)
- Branch protection rules must allow the chosen merge method (workflow uses squash by default)
- GITHUB_TOKEN needs `pull-requests: write` permission (granted in workflow file)

## Recommended Settings

- Enable Auto-merge for PRs (optional but recommended)
- Protect `main` to require CI checks (type check, lint, build, tests)
- Optionally protect `preview` to require checks before push from humans; the automation merges `main` → `preview` directly

## Flow Summary

1. Push to `preview` → PR opens to `main` and auto-merge is enabled (if available)
2. Merge to `main` (manually or auto) → `preview` syncs forward automatically
3. No loops: we never push to `main` directly from automation; we use PRs only

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
