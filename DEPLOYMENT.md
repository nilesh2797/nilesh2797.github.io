# GitHub Pages Deployment Guide

This guide will help you deploy your portfolio website to GitHub Pages with automatic deployment.

## Setup Steps

### 1. Create GitHub Repository

For a **personal website** (recommended):
- Create a repository named `<username>.github.io` (replace `<username>` with your GitHub username)
- Example: If your username is `nilesh2797`, create `nilesh2797.github.io`
- Your site will be available at `https://<username>.github.io`

For a **project website**:
- Create a repository with any name (e.g., `portfolio`)
- Your site will be available at `https://<username>.github.io/<repo-name>`
- **Important**: If using a project site, update `base: '/'` to `base: '/<repo-name>/'` in [vite.config.js](vite.config.js#L14)

### 2. Initialize Git and Push to GitHub

If you haven't already initialized git:

```bash
cd /Users/nileshgupta/Downloads/work/experimental-webpage/nilesh-portfolio
git init
git add .
git commit -m "Initial commit: Portfolio website"
```

Add your GitHub repository as remote and push:

```bash
# Replace <username> with your GitHub username
git remote add origin https://github.com/<username>/<username>.github.io.git
git branch -M main
git push -u origin main
```

### 3. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
   - (This replaces the old "Deploy from a branch" method)

### 4. Automatic Deployment

Once you push to the `main` branch, GitHub Actions will automatically:
1. Install dependencies
2. Build your site
3. Deploy to GitHub Pages

You can monitor the deployment:
- Go to the **Actions** tab in your repository
- Click on the latest workflow run to see progress

### 5. Access Your Site

After successful deployment (usually takes 1-2 minutes):
- **Personal site**: Visit `https://<username>.github.io`
- **Project site**: Visit `https://<username>.github.io/<repo-name>`

## Manual Deployment Trigger

You can also manually trigger deployment:
1. Go to the **Actions** tab
2. Click on "Deploy to GitHub Pages" workflow
3. Click **Run workflow** button
4. Select the branch and click **Run workflow**

## Updating Your Site

To update your website:
1. Make changes to your code
2. Commit and push to the `main` branch:
   ```bash
   git add .
   git commit -m "Update website"
   git push
   ```
3. GitHub Actions will automatically rebuild and redeploy

## Troubleshooting

### Deployment fails
- Check the Actions tab for error messages
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

### Site shows 404 or blank page
- For project sites, ensure `base` in vite.config.js matches your repo name
- Wait a few minutes after deployment completes
- Check browser console for errors
- Clear browser cache

### Assets not loading
- Check that `base` path in vite.config.js is correct
- Verify all asset paths are relative (not absolute)
- Check GitHub Pages settings are correct

## Files Added for Deployment

- [.github/workflows/deploy.yml](.github/workflows/deploy.yml) - GitHub Actions workflow
- [vite.config.js](vite.config.js) - Updated with `base` configuration
