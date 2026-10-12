# Sidebar Tab Colors

A Foundry VTT (v13) module that colorizes the sidebar tab buttons, with a color per tab.

## Install

In Foundry's **Install Module** dialog, paste this manifest URL:

```
https://github.com/digennarot/sidebar-tab-colors/releases/latest/download/module.json
```

## Usage

- **Game Settings → Configure Settings → Sidebar Tab Colors → Configure Colors** (GM only). Lists every tab currently in the sidebar, including tabs added by other modules.
- Pick a **preset** (Rainbow, Solarized, Nord, Dracula, Gruvbox, Monokai, Catppuccin, Tokyo Night, Pastel, Neon, Ocean, Sunset, Forest, Monochrome Gold/Silver) and click **Apply** to fill in all colors. Changes show on the sidebar and save immediately.
- Leave a color empty to keep the default look for that tab. **Reset defaults** restores the built-in palette.
- **Glow on active/hover tab** is a per-player setting.
- **Start with sidebar collapsed** (per-player) collapses the sidebar when the game loads.

## Beta channel

Testers can install with this manifest URL to also get pre-releases:

```
https://github.com/digennarot/sidebar-tab-colors/releases/download/beta/module.json
```

## Releasing

Push a version tag; the GitHub Action sets the version in `module.json`, builds `module.zip` and publishes the release:

```
git tag v1.0.1
git push origin v1.0.1
```

- `vX.Y.Z` is a stable release; `vX.Y.Z-suffix` (e.g. `v1.3.0-beta.1`) is a pre-release, offered only on the beta channel. Any other tag fails the workflow.
- A fix for a stable version is a new patch (`v1.0.2`), not `v1.0.1-hotfix`.
- Re-running the workflow replaces the files of an existing release.

The comments in [`.github/workflows/release.yml`](.github/workflows/release.yml) explain every option (English / Italiano).
