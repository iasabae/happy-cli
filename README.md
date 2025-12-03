# Happy CLI (Updated Fork)

> 🚀 **This is a fork with Claude Code 2.0.56 and auto-update features**
>
> Original project: [slopus/happy-cli](https://github.com/slopus/happy-cli)

Code on the go controlling claude code from your mobile device.

Free. Open source. Code anywhere.

## ✨ What's New in This Fork

- ✅ **Claude Code 2.0.56** - Latest version with Opus 4.5 support
- ✅ **Auto-update feature** - `happy --update` to update Claude Code
- ✅ **Update checker** - `happy --check-update` to check for updates
- ✅ **Type compatibility fixes** - Improved stability

## Installation

### From GitHub (Recommended)
```bash
npm install -g github:iasabae/happy-cli
```

### From Source
```bash
git clone https://github.com/iasabae/happy-cli.git
cd happy-cli
npm install
npm run build
npm link
```

### From NPM (Original)
```bash
npm install -g happy-coder
```
**Note**: This installs the original version with older Claude Code

## Usage

```bash
happy
```

This will:
1. Start a Claude Code session
2. Display a QR code to connect from your mobile device
3. Allow real-time session sharing between Claude Code and your mobile app

## Commands

- `happy auth` – Manage authentication
- `happy codex` – Start Codex mode
- `happy connect` – Store AI vendor API keys in Happy cloud
- `happy notify` – Send a push notification to your devices
- `happy daemon` – Manage background service
- `happy doctor` – System diagnostics & troubleshooting

## Options

- `-h, --help` - Show help
- `-v, --version` - Show version
- `-m, --model <model>` - Claude model to use (default: sonnet)
- `-p, --permission-mode <mode>` - Permission mode: auto, default, or plan
- `--claude-env KEY=VALUE` - Set environment variable for Claude Code
- `--claude-arg ARG` - Pass additional argument to Claude CLI
- **`--update`** - Update Claude Code to latest version (new in this fork)
- **`--check-update`** - Check for Claude Code updates (new in this fork)

### Update Commands

```bash
# Check for Claude Code updates
happy --check-update

# Update Claude Code (interactive)
happy --update

# Update Claude Code (automatic, no confirmation)
happy --update -y
```

## Environment Variables

- `HAPPY_SERVER_URL` - Custom server URL (default: https://api.cluster-fluster.com)
- `HAPPY_WEBAPP_URL` - Custom web app URL (default: https://app.happy.engineering)
- `HAPPY_HOME_DIR` - Custom home directory for Happy data (default: ~/.happy)
- `HAPPY_DISABLE_CAFFEINATE` - Disable macOS sleep prevention (set to `true`, `1`, or `yes`)
- `HAPPY_EXPERIMENTAL` - Enable experimental features (set to `true`, `1`, or `yes`)

## Requirements

- Node.js >= 20.0.0
  - Required by `eventsource-parser@3.0.5`, which is required by
  `@modelcontextprotocol/sdk`, which we used to implement permission forwarding
  to mobile app
- Claude CLI installed & logged in (`claude` command available in PATH)

## License

MIT
