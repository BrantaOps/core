# Releasing Steps

- Update `package.json` version
- `npm run build`
- `npm run package`
- Open `installers/windows/windows.sln` in Visual Studio
- Update `Package.wxs` version
- Update Solution Configruation option in toolbar from Debug to Release
- Build the solution
- MSI file can be found at `installers/windows/Branta.Wix/bin/x64/Release/en-US/Branta.Wix.msi`
- Update the name to match the version `branta-x.x.x.msi`
