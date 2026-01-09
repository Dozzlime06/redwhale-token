// GitHub integration for pushing code to repository
import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

export async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

export async function createRepoAndPush(repoName: string) {
  const octokit = await getUncachableGitHubClient();
  
  // Get authenticated user
  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}`);
  
  // Check if repo exists
  let repoExists = false;
  try {
    await octokit.repos.get({
      owner: user.login,
      repo: repoName,
    });
    repoExists = true;
    console.log(`Repository ${repoName} already exists`);
  } catch (error: any) {
    if (error.status !== 404) {
      throw error;
    }
  }
  
  // Create repo if it doesn't exist
  if (!repoExists) {
    await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: '$RedWhale - Crypto Token Landing Page',
      private: false,
      auto_init: false,
    });
    console.log(`Created repository: ${repoName}`);
  }
  
  return {
    success: true,
    repoUrl: `https://github.com/${user.login}/${repoName}`,
    owner: user.login,
    repo: repoName,
  };
}

// Push a single file to GitHub
async function pushSingleFile(octokit: any, owner: string, repo: string, filePath: string, content: string, message: string) {
  let sha: string | undefined;
  
  // Check if file exists to get its SHA
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
    });
    sha = (data as any).sha;
  } catch (error) {
    // File doesn't exist, that's fine
  }
  
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message,
    content: Buffer.from(content).toString('base64'),
    sha,
  });
  
  // Delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 500));
}

export async function pushAllFiles(owner: string, repo: string) {
  const octokit = await getUncachableGitHubClient();
  const projectRoot = process.cwd();
  
  // List of essential files to push for Vercel deployment
  const essentialFiles = [
    'script/build.ts',
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'tailwind.config.ts',
    'postcss.config.js',
    'vite.config.ts',
    'drizzle.config.ts',
    'components.json',
    'client/index.html',
    'client/src/main.tsx',
    'client/src/App.tsx',
    'client/src/index.css',
    'client/src/pages/Home.tsx',
    'client/src/pages/not-found.tsx',
    'client/src/components/Navigation.tsx',
    'client/src/components/SectionHeading.tsx',
    'client/src/components/SubscribeForm.tsx',
    'client/src/lib/queryClient.ts',
    'client/src/lib/utils.ts',
    'client/src/hooks/use-toast.ts',
    'client/src/hooks/use-mobile.tsx',
    'client/src/hooks/use-subscribers.ts',
    'shared/schema.ts',
    'shared/routes.ts',
    'server/index.ts',
    'server/routes.ts',
    'server/storage.ts',
    'server/db.ts',
    'server/static.ts',
    'server/vite.ts',
    'server/github.ts',
    'client/src/components/ui/button.tsx',
    'client/src/components/ui/card.tsx',
    'client/src/components/ui/badge.tsx',
    'client/src/components/ui/input.tsx',
    'client/src/components/ui/label.tsx',
    'client/src/components/ui/form.tsx',
    'client/src/components/ui/toast.tsx',
    'client/src/components/ui/toaster.tsx',
    'client/src/components/ui/tooltip.tsx',
    'client/src/components/ui/accordion.tsx',
    'client/src/components/ui/alert.tsx',
    'client/src/components/ui/avatar.tsx',
    'client/src/components/ui/separator.tsx',
    'client/src/components/ui/progress.tsx',
    'client/src/components/ui/scroll-area.tsx',
    'client/src/components/ui/select.tsx',
    'client/src/components/ui/dialog.tsx',
    'client/src/components/ui/dropdown-menu.tsx',
    'client/src/components/ui/popover.tsx',
    'client/src/components/ui/sheet.tsx',
    'client/src/components/ui/textarea.tsx',
    'client/src/components/ui/checkbox.tsx',
    'client/src/components/ui/switch.tsx',
    'client/src/components/ui/table.tsx',
    'client/src/components/ui/tabs.tsx',
    'client/src/components/ui/skeleton.tsx',
  ];
  
  // Binary files (images) to push
  const binaryFiles = [
    'attached_assets/IMG_0059_1767937498779.jpeg',
    'attached_assets/IMG_0060_1767937540024.jpeg',
  ];
  
  let pushedCount = 0;
  
  // First create README
  await pushSingleFile(octokit, owner, repo, 'README.md', 
    '# RedWhale Token\n\nCrypto token landing page for $RedWhale - Live on Pump.fun\n\n## Deploy on Vercel\n\n1. Import this repository in Vercel\n2. Set the build command to `npm run build`\n3. Set the output directory to `dist/public`\n4. Add your DATABASE_URL environment variable\n', 
    'Add README');
  pushedCount++;
  console.log('Pushed README.md');
  
  // Push text files
  for (const filePath of essentialFiles) {
    const fullPath = path.join(projectRoot, filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`Skipping ${filePath} - not found`);
      continue;
    }
    
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      await pushSingleFile(octokit, owner, repo, filePath, content, `Add ${filePath}`);
      pushedCount++;
      console.log(`Pushed ${filePath}`);
    } catch (err) {
      console.error(`Error pushing ${filePath}:`, err);
    }
  }
  
  // Push binary files (images)
  for (const filePath of binaryFiles) {
    const fullPath = path.join(projectRoot, filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`Skipping ${filePath} - not found`);
      continue;
    }
    
    try {
      // Check if file exists to get its SHA
      let sha: string | undefined;
      try {
        const { data } = await octokit.repos.getContent({
          owner,
          repo,
          path: filePath,
        });
        sha = (data as any).sha;
      } catch (error) {
        // File doesn't exist, that's fine
      }
      
      const content = fs.readFileSync(fullPath);
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: filePath,
        message: `Add ${filePath}`,
        content: content.toString('base64'),
        sha,
      });
      await new Promise(resolve => setTimeout(resolve, 500));
      pushedCount++;
      console.log(`Pushed binary ${filePath}`);
    } catch (err) {
      console.error(`Error pushing ${filePath}:`, err);
    }
  }
  
  return {
    success: true,
    filesCount: pushedCount,
    repoUrl: `https://github.com/${owner}/${repo}`,
  };
}
