#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

async function getLatestVersion(packageName) {
  try {
    const output = execSync(`npm view ${packageName} version`, { encoding: 'utf8' });
    return output.trim();
  } catch (error) {
    log(`Error fetching latest version for ${packageName}`, colors.red);
    return null;
  }
}

async function getCurrentVersion(packageName) {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const version = packageJson.dependencies[packageName];
  // Remove ^ or ~ if present
  return version.replace(/[\^~]/, '');
}

async function updatePackageJson(packageName, newVersion) {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageJson.dependencies[packageName] = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
}

async function checkAndUpdate() {
  log('\n🔍 Checking for Claude Code updates...', colors.cyan);

  const packageName = '@anthropic-ai/claude-code';

  // Get current and latest versions
  const currentVersion = await getCurrentVersion(packageName);
  const latestVersion = await getLatestVersion(packageName);

  if (!latestVersion) {
    log('Could not fetch latest version information', colors.red);
    process.exit(1);
  }

  log(`\nCurrent version: ${colors.yellow}${currentVersion}${colors.reset}`);
  log(`Latest version:  ${colors.green}${latestVersion}${colors.reset}`);

  if (currentVersion === latestVersion) {
    log('\n✅ You are already using the latest version!', colors.green);
    return false;
  }

  // Check if only checking for updates
  if (process.argv.includes('--check-update') || process.argv.includes('--check')) {
    log(`\n📦 Update available: ${currentVersion} → ${latestVersion}`, colors.bright);
    log('\nTo update, run: happy --update', colors.cyan);
    return true;
  }

  // Ask for confirmation
  log(`\n📦 Update available: ${currentVersion} → ${latestVersion}`, colors.bright);

  if (process.argv.includes('--auto') || process.argv.includes('-y')) {
    log('Auto-update enabled, proceeding...', colors.cyan);
  } else {
    log('\nWould you like to update? This will:', colors.yellow);
    log('  1. Update package.json');
    log('  2. Run npm install');
    log('  3. Rebuild the project');
    log('  4. Reinstall globally');

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const answer = await new Promise(resolve => {
      rl.question('\nProceed? (y/N): ', resolve);
    });
    rl.close();

    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      log('Update cancelled', colors.yellow);
      return false;
    }
  }

  // Update package.json
  log('\n📝 Updating package.json...', colors.cyan);
  await updatePackageJson(packageName, latestVersion);

  // Install dependencies
  log('📦 Installing dependencies...', colors.cyan);
  execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

  // Build project
  log('\n🔨 Building project...', colors.cyan);
  execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

  // Reinstall globally
  log('\n🌍 Reinstalling globally...', colors.cyan);
  execSync('npm link', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

  log('\n✅ Successfully updated Claude Code to version ' + latestVersion + '!', colors.green);
  log('\nYou can now run "happy" to use the latest version.', colors.cyan);

  return true;
}

// Check if running standalone
if (require.main === module) {
  checkAndUpdate().catch(error => {
    log('\n❌ Error during update:', colors.red);
    console.error(error);
    process.exit(1);
  });
}

module.exports = { checkAndUpdate };