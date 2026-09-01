const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const files = [
  "index.html",
  "command_center_overview.html",
  "patient_360_profile.html",
  "ai_priority_next_best_action.html",
  "follow_up_workspace.html",
];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}

fs.cpSync(path.join(root, "assets"), path.join(dist, "assets"), {
  recursive: true,
});

console.log(`Prepared Vercel static output in ${path.relative(root, dist)}`);
