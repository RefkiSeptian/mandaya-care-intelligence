const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const pages = {
  overview: "command_center_overview.html",
  patients: "patient_360_profile.html",
  "ai-priority": "ai_priority_next_best_action.html",
  "follow-up": "follow_up_workspace.html",
};

const payload = {};

for (const [page, file] of Object.entries(pages)) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1] || "Mandaya";
  const mainHtml = html.match(/<main[\s\S]*<\/main>/i)?.[0];

  if (!mainHtml) {
    throw new Error(`Could not find <main> in ${file}`);
  }

  payload[page] = {
    file,
    title,
    mainHtml,
  };
}

const output = `window.MandayaPages = ${JSON.stringify(payload, null, 2)};\n`;
fs.writeFileSync(path.join(root, "assets", "js", "pages.js"), output);
