<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/BrantaOps/Assets/blob/main/svg/logo-white.svg?raw=true">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/BrantaOps/Assets/blob/main/svg/logo-black.svg?raw=true">
    <img alt="Branta" src="Branta/Assets/goldblackcropped.jpg" width="500">
  </picture>
</p>

Branta Core is a cross-platform desktop application that helps prevent address swaps by knotifying you of Bitcoin/Nostr related content in your clipboard.

More information (and release binaries) can be found at https://branta.pro/core. Release binaries are also available directly from [GitHub](https://github.com/BrantaOps/core/releases).

<p style="color: #B15E4A">
Disclaimer: This is pre-release software and may contain bugs or incomplete features. Use at your own risk. Feedback and contributions are welcome!
</p>

Read more on our <a href="https://developer.branta.pro/branta-core" target="_blank">documentation site</a>.

<img width="500" src="https://github.com/user-attachments/assets/5029ec64-5ae6-4134-bbe4-25e53b5473c9" />
<img width="500" src="https://github.com/user-attachments/assets/4750bb8a-27da-4fbe-bb22-94ca1882036b" />

## Setup

### Prerequisites

1. Node (>=22)
2. Npm (>=10)

### Clone the Repository
```
git clone https://github.com/BrantaOps/core.git
```

### Install npm packages
```
npm install
```

## Running
Running the app requirees both the frontend and backend to be ran simultaneously 

Angular frontend
```
npm run ng:serve
```

Electron backend
```
npm start
```

## Packaging

- Update `package.json` version
- `npm run build`
- `npm run package`

### Windows

- Open `installers/windows/windows.sln` in Visual Studio
- Update `Package.wxs` version
- Update Solution Configruation option in toolbar from Debug to Release
- Build the solution
- MSI file can be found at `installers/windows/Branta.Wix/bin/x64/Release/en-US/Branta.Wix.msi`
- Update the name to match the version `branta-x.x.x.msi`

### Linux

TODO

### Mac

TODO

## Reporting Issues

Please use the [Issues](https://github.com/BrantaOps/core/issues) tab above to report an issue.