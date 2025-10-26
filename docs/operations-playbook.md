# Operations Playbook

Use this playbook to manage the assets day-to-day once they are part of your streaming workflow.

## Scene organization

- Create dedicated OBS scenes for **Starting Soon**, **Just Chatting**, **Gameplay**, **Intermission**, and **Ending Soon**.
- Group related Browser Sources using OBS’s **Group** feature (e.g., `Just Chatting Widgets`) so you can toggle everything with a single click.
- Name sources descriptively (`LT - Host Name`, `Widget - Progress Goal`) to quickly identify them during live production.

## Versioning and backups

- Keep this repository in cloud-synced storage (OneDrive, Dropbox, iCloud) so customized assets are backed up automatically.
- After making changes, commit to Git or archive the updated files with timestamps.
- Export your OBS scene collection (Profile → Export) whenever you add new assets. Store the `.json` in the same folder as your customized overlays.

## Collaboration tips

- When multiple producers work on the same show, maintain a shared changelog (e.g., `docs/changelog.md`) tracking who updated which asset.
- Use Git branches for experimental designs and merge only after assets are reviewed in OBS.
- Share preview screenshots or short clips so on-air talent knows what to expect.

## Automation ideas

- Trigger alerts using bot commands or streaming service webhooks that open the relevant HTML file in a docked browser source.
- Combine widgets with third-party tools like Streamer.bot or Touch Portal to update JSON data dynamically.
- Schedule Browser Source refreshes using OBS hotkeys to reset timers between segments.

## Troubleshooting workflow

1. **Identify the failing asset** – Determine which Browser Source is misbehaving and isolate it by hiding other sources.
2. **Refresh and reload** – Right-click the source → **Interact** → press `Ctrl+R` / `Cmd+R` to reload the page.
3. **Check the console** – Use OBS’s **Interact** window and open the developer tools (`Ctrl+Shift+I` / `Cmd+Option+I`) to inspect console errors.
4. **Compare against the repository** – Diff the customized file with the original to spot accidental edits.
5. **Escalate** – If a layout is broken, revert to the previous commit or swap in a backup while you debug offline.

## Deployment checklist for live events

- Test every scene with live audio/video sources at least an hour before going live.
- Confirm timers, progress goals, and now playing widgets pull the latest data.
- Verify the stream profile (FPS, resolution, bitrate) matches the design expectations of the overlays.
- Keep a fallback scene (simple camera and mic) without Browser Sources in case of emergency.

Following this playbook will keep your overlays reliable, easy to manage, and ready for live broadcasts.
