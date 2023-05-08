// import relevant modules;
const git = require('git-rev-sync');
const fs = require('fs');
const path = require("path")

// commit hash
const commitHash = git.short();

// write the commit hash to a file inside the dist folder
fs.writeFileSync(path.join(__dirname, "dist", 'commit-hash.txt'), commitHash);