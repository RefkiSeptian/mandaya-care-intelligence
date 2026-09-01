# Mandaya Internal Prototype

Static HTML prototype for Mandaya's patient monitoring and follow-up command center.

## Pages

- `index.html` redirects to the main overview.
- `command_center_overview.html` shows the command center dashboard.
- `patient_360_profile.html` shows a Patient 360 profile.
- `ai_priority_next_best_action.html` shows AI-prioritized next-best actions.
- `follow_up_workspace.html` shows the care team follow-up workspace.

## Shared Assets

- `assets/images/mandaya_royal_hospital_PURI.png` contains the sidebar brand logo.
- `assets/images/avatar-nurse-maya.png` contains the dummy sidebar profile photo.
- `assets/css/base.css` contains shared fonts, page resets, and scrollbar styling.
- `assets/css/tailwind.css` contains the compiled Tailwind styles used by every page.
- `assets/js/pages.js` contains prebuilt page content for instant in-page navigation.
- `assets/js/app.js` wires the collapsible sidebar, instant navigation state, and small page interactions.

Open `index.html` or any page directly in a browser. The sidebar links move between pages without a full document reload.

Run `npm install` once, then `npm run build:css` after changing Tailwind classes or theme tokens.
Run `npm run build:pages` after changing the page HTML content.
